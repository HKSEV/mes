"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import useModal from "@/components/contexts/ModalContext";
import * as S from "@/assets/css/Style.styles";

interface ComponentItem {
  id: number;
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
  status: string;
};

export default function ScmPage() {
  const {openAlertModal} = useModal();
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [formData, setFormData] = useState({
    componentName: "",
    category: "",
    stockQuantity: 0,
    minThreshold: 100,
    supplier: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/scm/components", {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success)
        setComponents(response.data.data);
    } catch (err) {
      console.error("SCM 조회 실패: ", err);
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
      const response = await axios.post("/api/scm/components", formData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success) {
        openAlertModal("자재 정보가 등록되었습니다.");
        setFormData({
          componentName: "",
          category: "",
          stockQuantity: 0,
          minThreshold: 100,
          supplier: ""
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
        <S.AdminTitle>핵심 부품 SCM</S.AdminTitle>
      </S.AdminHeader>

      <S.AdminGrid>
        <S.AdminGridColumn>
          {/* 좌측 패널: 신규 공정 라인을 입력하고 등록하는 폼 영역 */}
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>부품 SCM 등록</S.AdminCardTitle>
              <S.AdminCardDescription>
                신규 자재 정보를 입력하고 등록합니다.
              </S.AdminCardDescription>
            </S.AdminCardHeader>
            <S.AdminForm onSubmit={handleSubmit}>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="componentName">
                  부품명
                </S.AdminLabel>
                <S.AdminInput
                id="componentName"
                type="text"
                placeholder="예: A19 Pro AP Chip"
                name="componentName"
                value={formData.componentName}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="category">
                  카테고리
                </S.AdminLabel>
                <S.AdminInput
                id="category"
                type="text"
                placeholder="예: CHIP, CAMERA 등"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminSelectGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="stockQuantity">
                    현재 재고 수량
                  </S.AdminLabel>
                  <S.AdminInput
                  id="stockQuantity"
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="minThreshold">
                    안전 재고 임계값
                  </S.AdminLabel>
                  <S.AdminInput
                  id="minThreshold"
                  type="number"
                  name="minThreshold"
                  value={formData.minThreshold}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
              </S.AdminSelectGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="supplier">
                  협력사 (Supplier)
                </S.AdminLabel>
                <S.AdminInput
                id="supplier"
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminButton type="submit">등록하기</S.AdminButton>
            </S.AdminForm>
          </S.AdminCard>
        </S.AdminGridColumn>

        {/* 우측 패널:  */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>핵심 부품 공급망(SCM) 현황</S.AdminCardTitle>
            </S.AdminCardHeader>
            <S.AdminCardGrid>
              {components.map((component) => {
                const isWarning = component.status === "WARNING";
                return (
                <S.AdminLine key={component.id} $isWarning={isWarning}>
                  <strong>{component.componentName}</strong><br/>
                  [{component.category}] - 공급사: {component.supplier}
                  <p>
                    재고: {component.stockQuantity}개 
                    (안전기준: {component.minThreshold})<br/>상태: {" "}
                    <S.StatusBadge $isWarning={isWarning}>
                      {component.status}
                    </S.StatusBadge>
                  </p>
                </S.AdminLine>
              )})}
            </S.AdminCardGrid>
          </S.AdminCard>
        </S.AdminGridColumn>
      </S.AdminGrid>
    </S.AdminGridWrapper>
  );
};
