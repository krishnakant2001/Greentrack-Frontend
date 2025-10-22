"use client";
import { setJwtToken } from "@/store/features/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(setJwtToken(token));
      router.replace("/dashboard");
    }
  }, [searchParams, router, dispatch]);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;
