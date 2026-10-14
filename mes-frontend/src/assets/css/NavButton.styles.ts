import styled, { css } from "styled-components";
import Link from "next/link";
import * as C from "./common/Common.styles";

// 헤더
export const HeaderContainer = styled.header`
  ${C.FlexBetween}
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
  height: 4rem;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
  box-sizing: border-box;
  background-color: #1E293B;
  color: #FFF;
  ${C.BoxShadow}
  position: relative;
  z-index: 1000;
`;
export const HeaderLogo = styled.nav`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: clamp(1rem, 1.35vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    letter-spacing: 0;
  }
`;
export const HeaderDesktopNav = styled.nav`
  ${C.FlexCenter}
  gap: clamp(0.5rem, 1.2vw, 1.25rem);
  flex: 1;
  min-width: 0;

  @media (max-width: 1100px) {
    display: none;
  }
`;
export const HeaderNavLink = styled(Link)`
${C.InlineFlexCenter}
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0.5rem 0;
  color: #CBD5E1;
  font-size: clamp(0.75rem, 0.85vw, 0.875rem);
  font-weight: 500;
  text-decoration: none;
  ${C.TransitionAll}
  &:hover { color: #FFF; }
`;
export const HeaderUserSection = styled.div`
  ${C.FlexRight}
  gap: 0.75rem;
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 0.875rem;

  a {
    color: #FFF;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;
export const HeaderLogoutButton = styled.button`
${C.InlineFlexCenter}
  flex-shrink: 0;
  white-space: nowrap;
  background-color: #EF4444;
  color: #FFF;
  border: none;
  padding: 0.45rem 0.875rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: bold;
  cursor: pointer;
  ${C.TransitionAll}
  
  &:hover {
    background-color: #DC2626;
  }

  &:focus-visible {
    outline: 2px solid #FFF;
    outline-offset: 2px;
  }
`;
export const HeaderMobileMenuToggle = styled.button`
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  color: #FFF;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  ${C.TransitionAll}

  &:hover {
    background-color: #334155;
  }

  &:focus-visible {
    outline: 2px solid #93C5FD;
    outline-offset: 2px;
  }

  @media (max-width: 1100px) {
    display: inline-flex;
  }
`;
export const HeaderMobileNav = styled.nav<{$isOpen: boolean}>`
  ${C.FlexColumn}
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #334155;
  padding: ${({$isOpen}) => ($isOpen ? "0.5rem 1.25rem 1rem" : "0 1.25rem")};
  max-height: ${({$isOpen}) => ($isOpen ? "400px" : "0")};
  opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
  visibility: ${({$isOpen}) => ($isOpen ? "visible" : "hidden")};
  overflow: hidden;
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease,
    padding 0.25s ease,
    visibility 0.25s ease;
  ${C.BoxShadow}
  z-index: 9999999;

  & > a {
    ${C.FlexCenter}
    min-height: 2.75rem;
    box-sizing: border-box;
    padding: 0.75rem 0;
    border-bottom: 1px solid #475569;
    color: #CBD5E1;
    text-decoration: none;
    white-space: nowrap;
    font-size: 0.9375rem;
    font-weight: 500;
    ${C.TransitionAll}
  }

  & > a:hover {
    color: #FFF;
  }

  & > a:nth-child(6) {
    color: #93C5FD
  }

  & > a:nth-child(6):hover {
    color: #BFDBFE;
  }

  & > a:last-child {
    border-bottom: none;
    color: #FCA5A5
  }

  & > a:last-child:hover {
    color: #FEE2E2;
  }

  @media (min-width: 1101px) {
    display: none;
  }
}
`;
export const HeaderStyledLink = styled(Link)`
  
`;

// 푸터
export const FooterContainer = styled.footer`
  background-color: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  padding: 1.5rem 2.285rem;
  color: #64748B;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.143rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const FooterInfo = styled.div`
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    text-align: left;
  }
`;
export const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.875rem;
  
  a {
    color: #475569;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #0F172A;
      text-decoration: underline;
    }
  }
`;

// sidebar
export const AsideContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`;
export const MenuSection = styled.div`
  margin-bottom: 24px;
`;
export const SectionTitle = styled.h3`
  padding: 0 24px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94A3B8;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;
export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
export const MenuItem = styled(Link)`
  display: block;
  padding: 10px 24px;
  color: #475569;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #F1F5F9;
    color: #2563EB;
    border-right: 3px solid #2563EB;
  }
`;

// 버튼
interface ButtonProps {
  $variant?: "primary" | "danger" | "grey" | "ghost" | "insta" | "kakao" | "white";
  $size?: "small" | "medium" | "large";
  $fullWidth?: boolean;
  $width?: string;
};
export const Button = styled.button<ButtonProps>`
  ${C.InlineFlexCenter}
  border-radius: 2.5rem;
  cursor: pointer;
  ${C.TransitionAll}
  font-weight: 900;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: max-content;

  //크기 사이즈 설정
  ${({ $size }) =>{
    switch($size) {
      case "small":
        return css`
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        `;
      case "medium":
        return css`
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        `; 
      case "large":
        return css`
          padding: 0.625rem 1.25rem;
          font-size: 1.125rem;
        `;
    };  
  }}

  // 가로길이 설정
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  ${({ $width }) => $width && css`width: ${$width};`}

  //색상
  ${({ $variant }) => {
    switch ($variant) {
      case "danger":
        return css`
          background-color: #EF4444;
          color: white;
          border: none;
          padding:  0.7rem 1rem;
          &:hover { background-color: #DC2626; }
        `; 

      case "grey":
        return css`
          background-color: #858796;
          color: white;
          border: none;
          padding:  0.7rem 1rem;
          &:hover { background-color: #717384; }
        `;

      case "primary":
        return css`
          background-color: #2563EB;
          color: white;
          border: none;
          padding:  0.7rem 1rem;
          &:hover { background-color: #1D4ED8; }
        `; 

      case "ghost":
        return css`
          background-color: transparent;
          border: none;
          color: inherit;
          padding: 0;
          &:hover { opacity: 0.7; }
        `; 

      case "insta":
        return css`
          background-color: #E1306C;
          color: white;
          border: none;
          padding:  0.7rem 1rem;
          &:hover { background-color: #C13584; }
        `;
      
      case "kakao":
        return css`
          background-color: #FEE500;
          color: #3C1E1E;
          border: none;
          padding:  0.7rem 1rem;
          &:hover { background-color: #F4DC00; }
        `; 

      case "white":
        return css`
          background-color: transparent;
          color: #FFF;
          border: 1px solid #D1D3E2;
          padding:  0.7rem 1rem;
          &:hover { background-color: #F8F9FA; }
        `;
    };
  }}
`;