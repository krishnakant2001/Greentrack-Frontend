import { Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

// Main container with improved gradient and responsive design
const Container = styled.nav`
  width: 100%;
  height: 60px;
  background: linear-gradient(135deg, #143d60 0%, #2a5f87 50%, #a0c878 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-shadow: 0 2px 8px rgba(20, 61, 96, 0.15);
  position: relative;
  z-index: 1000;
`;

// Logo with enhanced styling and hover effects
const LogoSection = styled(Link)`
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  display: flex;
  color: #fff8de;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-1px);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #ffffff;
  }

  &:active {
    transform: translateY(0);
  }
`;

// Menu section with better spacing and responsive behavior
const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  color: #fff8de;
  font-weight: 400;
  font-size: 17px;
`;

// Enhanced menu items with better hover effects
const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: translateY(-1px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #a0c878;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }
`;

// Profile section with improved styling
const AuthSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #143d60;
  font-weight: 600;
  font-size: 14px;
  background-color: rgba(255, 248, 222, 0.6);
  padding: 8px 16px;
  border-radius: 25px;
  box-shadow: 0 2px 6px rgba(20, 61, 96, 0.2);
  backdrop-filter: blur(5px);
`;

// Enhanced styled link with better animations
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #143d60;
  transition: all 0.2s ease;
  padding: 4px 8px;

  &:hover {
    color: #0d2539;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Custom divider component for better control
const CustomDivider = styled(Divider)`
  && {
    background-color: #143d60;
    opacity: 0.6;
    height: 30px;
    margin: 0 4px;
  }
`;

// Menu items array for better maintainability
const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <Container role="navigation">
      <LogoSection href="/">🌱 GreenTrack</LogoSection>

      <MenuSection>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.label}>{item.label}</MenuItem>
        ))}
      </MenuSection>

      <AuthSection>
        <StyledLink href="/auth/login">Login</StyledLink>

        <CustomDivider orientation="vertical" flexItem />

        <StyledLink href="/auth/register">Register</StyledLink>
      </AuthSection>
    </Container>
  );
};

export default Navbar;
