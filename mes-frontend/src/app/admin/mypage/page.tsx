"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as S from "@/assets/css/Style.styles";

export default function MyPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/");
      return;
    };

    try {
      await axios.post("/api/members/change-password", {
        oldPassword, newPassword
      }, {headers: {Authorization: `Bearer ${token}`}});

      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.")
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      router.push("/");
    } catch (err: any) {
      console.error("에러: ", err);
      alert(err.response?.data || "비밀번호 변경에 실패했습니다.");
    };
  };

  return (
    <S.AdminWrapper>
      <S.AdminHeader>
        <div>
          <S.AdminTitle>마이페이지</S.AdminTitle>
          <S.AdminSubtitle>
            계정 정보를 관리하고 비밀번호를 변경할 수 있습니다.
          </S.AdminSubtitle>
        </div>
      </S.AdminHeader>
      <S.AdminCard>
        <S.AdminCardHeader>
          <S.AdminCardTitle>비밀번호 변경</S.AdminCardTitle>
          <S.AdminCardDescription>
            현재 비밀번호를 확인한 후 새로운 비밀번호로 변경합니다.
          </S.AdminCardDescription>
        </S.AdminCardHeader>
        <S.AdminForm onSubmit={handleChangePassword}>
          <S.AdminFormGroup>
            <S.AdminLabel htmlFor="oldPassword">
              기존(또는 임시) 비밀번호
            </S.AdminLabel>
            <S.AdminInput
            id="oldPassword"
            type="password"
            placeholder="기존 비밀번호를 입력하세요."
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
            required/>
          </S.AdminFormGroup>
          <S.AdminFormGroup>
            <S.AdminLabel htmlFor="newPassword">
              새 비밀번호
            </S.AdminLabel>
            <S.AdminInput
            id="newPassword"
            type="password"
            placeholder="새 비밀번호를 입력하세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required/>
            <S.AdminHint>
              보안을 위해 기존 비밀번호와 다른 비밀번호를 사용해주세요.
            </S.AdminHint>
          </S.AdminFormGroup>
          <S.AdminButton type="submit">
            비밀번호 변경
          </S.AdminButton>
        </S.AdminForm>
      </S.AdminCard>
    </S.AdminWrapper>
  );
};