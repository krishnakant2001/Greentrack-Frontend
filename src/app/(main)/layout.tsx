"use client";
import VerticalNavbar from "@/components/Navbar/VerticalNavbar";
import Navbar from "@/components/reusableComponents/Navbar";
import React, { useState } from "react";
import styled from "styled-components";

// Sidebar container with improved styling
const SidebarContainer = styled.div<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? "280px" : "80px")};
  height: 100vh;
  background: linear-gradient(180deg, #143d60 0%, #1a4b73 100%);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 12px rgba(20, 61, 96, 0.2);
  overflow: hidden;
`;
const MainContent = styled.div<{ $expanded: boolean }>`
  margin-left: ${({ $expanded }) => ($expanded ? "280px" : "80px")};
  padding: 24px;
  transition: margin-left 0.3s ease;
`;
const Container = styled.div`
  margin-top: 60px; /* Adjust based on Navbar height */
`;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  return (
    <div>
      <Navbar />
      <SidebarContainer $expanded={sidebarExpanded}>
        <VerticalNavbar
          expanded={sidebarExpanded}
          onCollapse={handleSidebarToggle}
        />
      </SidebarContainer>
      <MainContent $expanded={sidebarExpanded}>
        <Container>{children}</Container>
      </MainContent>
    </div>
  );
};

export default MainLayout;
