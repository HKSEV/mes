import express = require("express");
import cors = require("cors");
const oracledb = require("oracledb");
import bcrypt  = require("bcryptjs");
const nodemailer = require("nodemailer");
import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "crypto";
import dotenv = require("dotenv");

import { AppDataSource } from "./config/db";
import { Member } from "./entities/Member";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
// 미들웨어
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// 오라클 db 연결 설정
const JWT_SECRET = process.env.SECRET || "aB3$fG9!zXqW#mK7*vL2@pN5$sD8%yH1";
if (!JWT_SECRET)
  throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");

// JWT 인증 미들웨어
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      success: false,
      message: "인증 토큰이 제공되지 않았습니다."
    });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "인증 토큰이 올바르지 않습니다."
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.member = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      success: false,
      message: "유효하지 않거나 만료된 토큰입니다."
    });
  };
};

// 인증된 사용자 정보를 Express Request에 추가
declare global {
  namespace Express {
    interface Request {
      member?: string | JwtPayload;
    }
  }
};

// 회원가입 API
app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      position,
      tel,
      address,
      detailAddress,
      gender,
    } = req.body;
    // 이메일 비밀번호 누락 확인
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "이메일과 비밀번호를 입력해주세요."
      });

    const memberRepo = AppDataSource.getRepository(Member);
    const existingMember = await memberRepo.findOne({where: {email}});
    if (existingMember) 
      return res.status(409).json({
        success: false,
        message: "이미 등록된 이메일입니다."
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const member = memberRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      companyName,
      position,
      tel,
      address,
      detailAddress,
      gender
    });

    await memberRepo.save(member);
    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다."
    });
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({
      success: false,
      message: "회원가입 처리 중 오류가 발생했습니다."
    });
  };
});

// 로그인 API
app.post("/api/auth/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "이메일과 비밀번호를 입력해주세요."
      });

    const memberRepo = AppDataSource.getRepository(Member);
    const member = await memberRepo.findOne({where: {email}});
    if (!member || !(await bcrypt.compare(password, member.password)))
      return res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다."
      });

    const token = jwt.sign(
      { id: member.id, email: member.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(200).json({
      success: true,
      message: "로그인 성공",
      token,
      member: {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email
      }
    });
  } catch (err) {
    console.error("로그인 오류:", err);
    res.status(500).json({
      success: false,
      message: "로그인 처리 중 오류가 발생했습니다."
    });
  };
});

// 비밀번호 찾기 API
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    // 메일 발송 설정
    const mailSender = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const {email} = req.body;
    if (!email)
      return res.status(400).json({
        success: false,
        message: "이메일을 입력해 주세요.",
      });
    // 1. 임시 비밀번호 생성 (영문 소문자와 숫자로 구성된 8자리)
    const tempPassword = randomUUID().replace(/-/g, "").slice(0, 8);

    // 2. DB 트랜잭션으로 사용자 조회 및 비밀번호 변경
    await AppDataSource.transaction(async () => {
      const memberRepo = AppDataSource.getRepository(Member);
      const member = await memberRepo.findOne({where: {email}});
      if (!member)
        return res.status(401).json({
          success: false,
          message: "가입되지 않은 이메일입니다."
        });

      const salt = await bcrypt.genSalt(10);
      member.password = await bcrypt.hash(tempPassword, salt);
      await memberRepo.save(member);
    });

    // 3. 임시 비밀번호 메일 발송
    await mailSender.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "[MES 시스템] 임시 비밀번호 발급 안내",
      text:
        `요청하신 임시 비밀번호는 [${tempPassword}] 입니다.\n` +
        "로그인 후 마이페이지에서 반드시 비밀번호를 변경해 주세요.",
    });

    res.status(200).json({
      success: true,
      message: "임시 비밀번호를 이메일로 발송했습니다.",
    });
  } catch (err) {
    console.error("임시 비밀번호 발급 오류: ", err);
    res.status(500).json({
      success: false,
      message: "임시 비밀번호 발급 중 오류가 발생했습니다."
    });
  };
});

app.get("/api/member/profile", verifyToken, async (req, res) => {
  return res.status(200).json({
    success: true,
    member: req.member
  });
});

AppDataSource.initialize()
.then(() => {
  console.log("데이터베이스가 성공적으로 연결되었습니다.");
  app.listen(PORT, () => {
    // 설정된 포트(4000번)에서 서버를 구동하고, 클라이언트의 요청을 기다리기 시작합니다. (이 코드가 실행되어야 비로소 서버가 켜집니다.)
    console.log(`🚀 MES Server running on http://localhost:${PORT}`);
    // 터미널에 서버가 정상적으로 실행되었음을 알리는 메시지를 출력합니다.
  });
}).catch((err) => {
  console.error(`http://localhost:${PORT} 연결실패: ${err}`);
  process.exit(1);
});
