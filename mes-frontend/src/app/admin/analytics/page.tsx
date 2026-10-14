"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useModal from "@/components/contexts/ModalContext";
import * as S from "@/assets/css/Style.styles";

interface AnalyticsRecord {
  id: number;
  lineName: string;
  targetCount: number;
  actualCount: number;
  defectCount: number;
  yieldRate: number;
}

export default function AnalyticsPage() {
  const {openAlertModal} = useModal();
  const [records, setRecords] = useState<AnalyticsRecord[]>([]);
  const [formData, setFormData] = useState({
    lineName: "",
    targetCount: 1000,
    actualCount: 980,
    defectCount: 20
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/analytics/records", {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success)
        setRecords(response.data.data);
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
      const response = await axios.post("/api/analytics/records", formData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success) {
        openAlertModal("설비 정보가 등록되었습니다.");
        setFormData({
          lineName: "",
          targetCount: 1000,
          actualCount: 980,
          defectCount: 20
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
        <S.AdminTitle>실시간 통합 관제</S.AdminTitle>
      </S.AdminHeader>

      <S.AdminGrid>
        <S.AdminGridColumn>
          {/* 좌측 패널: AI 비전 품질 검사 결과를 입력하고 전송하는 폼 영역 */}
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>생산 실적 및 수율 입력</S.AdminCardTitle>
              <S.AdminCardDescription>
                생산 실적 및 수율을 입력하여 등록합니다.
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
              <S.AdminSelectGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="targetCount">
                    목표 생산량
                  </S.AdminLabel>
                  <S.AdminInput
                  id="targetCount"
                  type="number"
                  name="targetCount"
                  value={formData.targetCount}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="actualCount">
                    실제 양품 생산량
                  </S.AdminLabel>
                  <S.AdminInput
                  id="actualCount"
                  type="number"
                  name="actualCount"
                  value={formData.actualCount}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="defectCount">
                    불량 대수
                  </S.AdminLabel>
                  <S.AdminInput
                  id="defectCount"
                  type="number"
                  name="defectCount"
                  value={formData.defectCount}
                  onChange={handleChange}
                  required/>
                </S.AdminFormGroup>
              </S.AdminSelectGroup>
              <S.AdminButton type="submit">실적 등록</S.AdminButton>
            </S.AdminForm>
          </S.AdminCard>
        </S.AdminGridColumn>

        {/* 우측 패널: 누적된 비전 검사 이력 로그를 모니터링하는 영역 */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>
                실시간 통합 관제 대시보드 (수율 분석)
              </S.AdminCardTitle>
            </S.AdminCardHeader>
            <S.AdminCardGrid>
              {records.map((item) => (
                <S.AdminLine key={item.id} $isPass>
                  <strong>{item.lineName}</strong>
                  <p>
                    목표: {item.targetCount}<br/>
                    양품: {item.actualCount}<br/>
                    불량: {item.defectCount}<br/>
                    공정 수율:&nbsp;
                    <S.StatusBadge $isPass>
                      {item.yieldRate}%
                    </S.StatusBadge>
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
