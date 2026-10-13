"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    router.replace("/");
  }, [router]);

  return (
    <p>로그아웃 중입니다...</p>
  );
};
