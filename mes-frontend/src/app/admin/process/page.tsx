"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import useModal from "@/components/contexts/ModalContext";
import * as S from "@/assets/css/Style.styles";

interface ProcessLine {
  id: number;
  lineName: string;
  processType: string;
  status: string;
  currentProduct: string;
  operator: string;
};

export default function ProcessPage() {
  const {openAlertModal} = useModal();
  const [lines, setLines] = useState<ProcessLine[]>([]);
  const [formData, setFormData] = useState({
    lineName: "",
    processType: "",
    currentProduct: "",
    operator: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/process/lines", {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success)
        setLines(response.data.data);
    } catch (err) {
      console.error("라인 조회 실패: ", err);
    } finally {
      setIsLoading(false);
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/process/lines", formData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success) {
        openAlertModal("공정 라인이 등록되었습니다.");
        setFormData({
          lineName: "",
          processType: "",
          currentProduct: "",
          operator: ""
        });
        fetchData();
      };
    } catch (err) {
      openAlertModal("등록 실패");
    };
  };

  if (isLoading)
    return null;

  return (
    <S.AdminGridWrapper>
      <S.AdminHeader>
        <S.AdminTitle>라인 공정 제어</S.AdminTitle>
      </S.AdminHeader>

      <S.AdminGrid>
        {/* 좌측 패널: 신규 공정 라인을 입력하고 등록하는 폼 영역 */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>라인 공정 등록</S.AdminCardTitle>
              <S.AdminCardDescription>
                신규 공정 라인을 입력하고 등록합니다.
              </S.AdminCardDescription>
            </S.AdminCardHeader>
            <S.AdminForm onSubmit={handleSubmit}>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="lineName">
                  라인명
                </S.AdminLabel>
                <S.AdminInput
                id="lineName"
                type="text"
                placeholder="예: AP SMT Line 1"
                name="lineName"
                value={formData.lineName}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="processType">
                  공정 타입
                </S.AdminLabel>
                <S.AdminInput
                id="processType"
                type="text"
                placeholder="예: SMT, CNC"
                name="processType"
                value={formData.processType}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="currentProduct">
                  생산 모델
                </S.AdminLabel>
                <S.AdminInput
                id="currentProduct"
                type="text"
                placeholder="예: iPhone Duo"
                name="currentProduct"
                value={formData.currentProduct}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="operator">
                  담당 오퍼레이터
                </S.AdminLabel>
                <S.AdminInput
                id="operator"
                type="text"
                placeholder=""
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminButton type="submit">등록하기</S.AdminButton>
            </S.AdminForm>
          </S.AdminCard>
        </S.AdminGridColumn>

        {/* 우측 패널: 등록된 공정 라인들의 실시간 가동 상태를 보여주는 모니터링 영역 */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>iPhone Duo 라인 가동 현황</S.AdminCardTitle>
            </S.AdminCardHeader>
            {lines.map((line) => (
              <S.AdminLine key={line.id}>
                <strong>{line.lineName}</strong>
                [{line.processType}] - 상태:{" "}
                <S.StatusBadge $isRunning={line.status === "RUNNING"}>
                  {line.status}
                </S.StatusBadge>
              </S.AdminLine>
            ))}
          </S.AdminCard>
        </S.AdminGridColumn>
      </S.AdminGrid>
    </S.AdminGridWrapper>
  );
};
