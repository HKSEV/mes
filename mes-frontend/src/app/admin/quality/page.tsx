"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useModal from "@/components/contexts/ModalContext";
import * as S from "@/assets/css/Style.styles";

interface Inspection {
  id: number;
  serialNumber: string;
  inspectionType: string;
  result: string;
  defectReason: number;
  inspector: string
};

export default function QualityPage() {
  const {openAlertModal} = useModal();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [formData, setFormData] = useState({
    serialNumber: "",
    inspectionType: "VISION_SCRATCH",
    result: "PASS",
    defectReason: "",
    inspector: "AI-Vision-Unit-01"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/quality/inspections", {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success)
        setInspections(response.data.data);
    } catch (err) {
      console.error("품질 검사 이력 조회 실패: ", err);
    } finally {
      setIsLoading(false);
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/quality/inspections", formData, {
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.data.success) {
        openAlertModal("검사 결과가 등록되었습니다.");
        setFormData({
          serialNumber: "",
          inspectionType: "VISION_SCRATCH",
          result: "PASS",
          defectReason: "",
          inspector: "AI-Vision-Unit-01"
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
        <S.AdminTitle>비전 품질 검사</S.AdminTitle>
      </S.AdminHeader>

      <S.AdminGrid>
        <S.AdminGridColumn>
          {/* 좌측 패널: AI 비전 품질 검사 결과를 입력하고 전송하는 폼 영역 */}
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>AI 비전 품질 검사 입력</S.AdminCardTitle>
              <S.AdminCardDescription>
                AI 비전 품질 검사 결과를 입력하고 전송합니다.
              </S.AdminCardDescription>
            </S.AdminCardHeader>
            <S.AdminForm onSubmit={handleSubmit}>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="serialNumber">
                  기기 시리얼 번호 (S/N)
                </S.AdminLabel>
                <S.AdminInput
                id="serialNumber"
                type="text"
                placeholder="예: CNU1234567"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required/>
              </S.AdminFormGroup>
              <S.AdminSelectGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="inspectionType">
                    검사 타입
                  </S.AdminLabel>
                  <S.Select
                  id="inspectionType"
                  name="inspectionType"
                  value={formData.inspectionType}
                  onChange={handleChange}>
                    <option value="VISION_SCRATCH">
                      미세 스크래치 비전 검사
                    </option>
                    <option value="WATERPROOF_TEST">
                      방수 씰링 기밀 검사
                    </option>
                  </S.Select>
                </S.AdminFormGroup>
                <S.AdminFormGroup>
                  <S.AdminLabel htmlFor="result">
                    검사 판정 결과
                  </S.AdminLabel>
                  <S.Select
                  id="result"
                  name="result"
                  value={formData.result}
                  onChange={handleChange}>
                    <option value="PASS">
                      PASS (양품)
                    </option>
                    <option value="FAIL">
                      FAIL (불량)
                    </option>
                  </S.Select>
                </S.AdminFormGroup>
              </S.AdminSelectGroup>
              <S.AdminFormGroup>
                <S.AdminLabel htmlFor="defectReason">
                  불량 사유 (불량일 경우 입력)
                </S.AdminLabel>
                <S.AdminInput
                id="defectReason"
                type="text"
                name="defectReason"
                value={formData.defectReason}
                onChange={handleChange}
                disabled={formData.result !== "FAIL"}/>
              </S.AdminFormGroup>
              <S.AdminButton type="submit">검사 결과 전송</S.AdminButton>
            </S.AdminForm>
          </S.AdminCard>
        </S.AdminGridColumn>

        {/* 우측 패널: 누적된 비전 검사 이력 로그를 모니터링하는 영역 */}
        <S.AdminGridColumn>
          <S.AdminCard>
            <S.AdminCardHeader>
              <S.AdminCardTitle>비전 검사 이력 로그</S.AdminCardTitle>
            </S.AdminCardHeader>
            <S.AdminCardGrid>
              {inspections.map((item) => {
                const isPass = item.result === "PASS";
                return (
                <S.AdminLine key={item.id} $isPass={isPass}>
                  <strong>S/N: {item.serialNumber}</strong><br/>
                  [{item.inspectionType}]
                  <p>
                    판정:&nbsp;
                    <S.StatusBadge $isPass={isPass}>
                      {item.result}
                    </S.StatusBadge>&nbsp;
                    {item.defectReason && `(사유: ${item.defectReason})`}
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
