'use client';
import React from "react";
import authBackground from "@/assets/ClearEnv.jpg";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>{children}</div>
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${authBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default authLayout;
