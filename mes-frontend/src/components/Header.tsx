"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      <S.HeaderLogo onClick={() => router.push("/dashboard")}>
        Smart MES
      </S.HeaderLogo>

      {/* 데스크탑 네비게이션 */}
      <S.HeaderDesktopNav>
        <S.HeaderNavLink href="/process">라인 공정 제어</S.HeaderNavLink>
        <S.HeaderNavLink href="/components">핵심 부품 SCM</S.HeaderNavLink>
        <S.HeaderNavLink href="/quality">비전 품질 검사</S.HeaderNavLink>
        <S.HeaderNavLink href="/cleanroom">클린룸 & 설비</S.HeaderNavLink>
        <S.HeaderNavLink href="/analytics">실시간 통합 관제</S.HeaderNavLink>
      </S.HeaderDesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.HeaderUserSection>
        <span>관리자님 환영합니다</span>
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
        <a href="/process">라인 공정 제어</a>
        <a href="/components">핵심 부품 SCM</a>
        <a href="/quality">비전 품질 검사</a>
        <a href="/cleanroom">클린룸 & 설비</a>
        <a href="/analytics">실시간 통합 관제</a>
        <a href="/profile">내 정보</a>
        <a href="/">로그아웃</a>
      </S.HeaderMobileNav>
    </S.HeaderContainer>
  );
};