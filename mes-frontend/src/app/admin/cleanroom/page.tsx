"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useModal from "@/components/contexts/ModalContext";
import * as S from "@/assets/css/Style.styles";

interface EquipmentItem {
  id: number;
  equipmentName: string;
  cleanroomZone: string;
  temperature: number;
  humidity: number;
  status: string;
};

export default function CleanroomPage() {
  const {openAlertModal} = useModal();
  const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
  const [formData, setFormData] = useState({
    equipmentName: "",
    cleanroomZone: "Zone A (Class 100)",
    temperature: 22.5,
    humidity: 45.0,
    status: "NORMAL"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/equipment/status", {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success)
        setEquipments(response.data.data);
    } catch (err) {
      console.error("품질 검사 이력 조회 실패: ", err);
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
      const response = await axios.post("/api/equipment/status", formData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success) {
        openAlertModal("설비 정보가 등록되었습니다.");
        setFormData({
          equipmentName: "",
          cleanroomZone: "Zone A (Class 100)",
          temperature: 22.5,
          humidity: 45.0,
          status: "NORMAL"
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
        <S.AdminTitle>클린룸 & 설비</S.AdminTitle>
      </S.AdminHeader>

      <S.AdminGrid>
        <S.AdminGridColumn>
          {/* 좌측 패널: AI 비전 품질 검사 결과를 입력하고 전송하는 폼 영역 */}
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>클린룸 및 설비 등록</S.AdminCardTitle>
              <S.AdminCardDescription>
                클린룸 및 설비 정보를 등록합니다.
              </S.AdminCardDescription>
            </S.AdminCardHeader>
            <S.AdminForm onSubmit={handleSubmit}>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="equipmentName">
                  설비명
                </S.AdminLabel>
                <S.AdminInput
                id="equipmentName"
                type="text"
                placeholder="예: CNC Machine #3"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="cleanroomZone">
                  클린룸 구역
                </S.AdminLabel>
                <S.AdminInput
                id="cleanroomZone"
                type="text"
                name="cleanroomZone"
                value={formData.cleanroomZone}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminSelectGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="temperature">
                    온도 (℃)
                  </S.AdminLabel>
                  <S.AdminInput
                  id="temperature"
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="humidity">
                    습도 (%)
                  </S.AdminLabel>
                  <S.AdminInput
                  id="humidity"
                  type="number"
                  step="0.1"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
              </S.AdminSelectGroup>
              <S.AdminButton type="submit">상태 전송</S.AdminButton>
            </S.AdminForm>
          </S.AdminCard>
        </S.AdminGridColumn>

        {/* 우측 패널: 누적된 비전 검사 이력 로그를 모니터링하는 영역 */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>클린룸 환경 및 설비 관제</S.AdminCardTitle>
            </S.AdminCardHeader>
            <S.AdminCardGrid>
              {equipments.map((item) => (
                <S.AdminLine key={item.id}>
                  <strong>{item.equipmentName}</strong><br/>
                  [{item.cleanroomZone}]
                  <p>
                    온도: {item.temperature}℃<br/>
                    습도: {item.humidity}%<br/>
                    상태: <S.StatusBadge>{item.status}</S.StatusBadge>
                  </p>
                </S.AdminLine>
              ))}
            </S.AdminCardGrid>
          </S.AdminCard>
        </S.AdminGridColumn>
      </S.AdminGrid>
    </S.AdminGridWrapper>
  );
};
