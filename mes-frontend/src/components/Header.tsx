"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import * as S from "@/assets/css/NavButton.styles";

export const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    document.cookie = "login_token=true; path=/; max-age=0;";
    alert("로그아웃 되었습니다.");
    router.push("/")
  };

  return (
    <S.HeaderContainer>
      <S.HeaderLogo onClick={() => router.push("/admin")}>
         Apple iPhone Smart MES
      </S.HeaderLogo>

      {/* 데스크탑 네비게이션 */}
      <S.HeaderDesktopNav>
        <S.HeaderNavLink href="/admin/process">라인 공정 제어</S.HeaderNavLink>
        <S.HeaderNavLink href="/admin/components">핵심 부품 SCM</S.HeaderNavLink>
        <S.HeaderNavLink href="/admin/quality">비전 품질 검사</S.HeaderNavLink>
        <S.HeaderNavLink href="/admin/cleanroom">클린룸 & 설비</S.HeaderNavLink>
        <S.HeaderNavLink href="/admin/analytics">실시간 통합 관제</S.HeaderNavLink>
      </S.HeaderDesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.HeaderUserSection>
        <span>
          <Link href="/admin/mypage">관리자님</Link> 환영합니다
        </span>
        <S.HeaderLogoutButton onClick={handleLogout}>
          로그아웃
        </S.HeaderLogoutButton>
      </S.HeaderUserSection>

      {/* 모바일 햄버거 버튼 */}
      <S.HeaderMobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </S.HeaderMobileMenuToggle>

      {/* 모바일 드롭다운 메뉴 */}
      <S.HeaderMobileNav $isOpen={isMobileMenuOpen}>
        <Link href="/admin/process">라인 공정 제어</Link>
        <Link href="/admin/components">핵심 부품 SCM</Link>
        <Link href="/admin/quality">비전 품질 검사</Link>
        <Link href="/admin/cleanroom">클린룸 & 설비</Link>
        <Link href="/admin/analytics">실시간 통합 관제</Link>
        <Link href="/admin/mypage">내 정보</Link>
        <Link href="/">로그아웃</Link>
      </S.HeaderMobileNav>
    </S.HeaderContainer>
  );
};