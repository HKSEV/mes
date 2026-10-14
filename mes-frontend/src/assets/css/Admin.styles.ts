import styled, { css } from "styled-components";
import * as C from "./common/Common.styles";

// 마이페이지
export const AdminWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;
export const AdminGridWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;
export const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const AdminGridColumn = styled.div`
  ${C.FlexColumn}
  gap: 2rem;
`;
export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
`;
export const AdminTitle = styled.h1`
  color: #0F172A;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
`;
export const AdminSubtitle = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  line-height: 1.5;
`;
export const AdminCard = styled.section`
  background-color: #FFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  overflow: hidden;
`;
export const AdminCardHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E2E8F0;
  background-color: #F8FAFC;
`;
export const AdminCardTitle = styled.h2`
  color: #1E293B;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 4px;
`;
export const AdminCardDescription = styled.p`
  color: #64748B;
  font-size: 0.85rem;
  line-height: 1.5;
`;
export const AdminCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;
export const AdminFormGroup = styled.div`
  ${C.FlexColumn}
  gap: 8px;
  flex: 1;
`;
export const AdminLabel = styled.label`
  color: #334155;
  font-size: 0.875rem;
  font-weight: 600;
`;
export const AdminInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  outline: none;
  background-color: #FFF;
  color: #1E293B;
  font-family: inherit;
  font-size: 0.9rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: #94A3B8;
  }

  &:hover {
    border-color: #94A3B8;
  }

  &:focus {
    border-color: #4E73DF;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.15);
  }

  &:disabled {
    background-color: #F1F5F9;
    color: #94A3B8;
    border-color: #E2E8F0;
    box-shadow: none;
    opacity: 1;
  }
`;
export const AdminHint = styled.p`
  color: #94A3B8;
  font-size: 0.78rem;
  line-height: 1.45;
`;
export const AdminButton = styled.button`
  width: auto;
  padding: 0.8rem;
  background-color: #4E73DF;
  color: white;
  align-self: flex-end;
  min-width: 150px;
  padding: 10px 18px;
  border: none;
  border-radius: 10rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #2E59D9;
  }

  @media (max-width: 480px) {
    width: 100%;
    align-self: stretch;
  }
`;
export const AdminLine = styled.div<{
  $isWarning?: boolean, $isPass?: boolean
}>`
  padding: 0.9rem;
  margin: 0.3rem;
  border: 1px solid #DDD;
  border-radius: 0.5rem;
  background-color: ${(props) => {
    if (props.$isPass !== undefined)
      return props.$isPass ? "#F0FFF4" : "#FFF5F5"
    if (props.$isWarning)
      return "#FFF5F5";
    return "#F9F9F9";
  }};
`;
export const StatusBadge = styled.span<{
  $isRunning?: boolean, $isWarning?: boolean, $isPass?: boolean
}>`
  color: ${(props) => {
    if (props.$isPass !== undefined)
      return props.$isPass ? "#0F0" : "#F00"
    if (props.$isWarning)
      return "#F00";
    if (props.$isRunning !== undefined)
      return props.$isRunning ? "#617A9C" : "#F00";
    return "#617A9C";
  }};
  font-weight: bold;
`;
export const AdminSelectGroup = styled.div`
  ${C.FlexBetween}
  gap: 10px;
`;