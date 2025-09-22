"use client";
import { useState } from "react";
import {
  AuthSection,
  Container,
  CustomDivider,
  DropdownIndicator,
  LogoSection,
  MenuItem,
  MenuSection,
  ProfileSection,
  StyledLink,
  Username,
} from "./navbar.style";
import UserMenu from "../featureComponents/userMenu";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";

// Menu items array for better maintainability
const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = ({ username = "Krishnakant" }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClicked = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <LogoSection href="/">🌱 GreenTrack</LogoSection>

      <MenuSection>
        <MenuItem key={isLoggedIn ? "Dashboard" : "Home"}>
          {isLoggedIn ? (
            <Link href={"/dashboard"}>Dashboard</Link>
          ) : (
            <Link href={"/"}>Home</Link>
          )}
        </MenuItem>
        {MENU_ITEMS.slice(2).map((item) => (
          <MenuItem key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </MenuItem>
        ))}
      </MenuSection>

      {isLoggedIn ? (
        <ProfileSection onClick={handleClicked}>
          <AccountCircleOutlinedIcon
            style={{ fontSize: 32, color: "#143d60" }}
          />

          <Username>{username}</Username>

          {isOpen && <UserMenu />}

          <DropdownIndicator $isOpen={isOpen}>
            <ArrowDropDownOutlinedIcon />
          </DropdownIndicator>
        </ProfileSection>
      ) : (
        <AuthSection>
          <StyledLink href="/auth/login">Login</StyledLink>

          <CustomDivider orientation="vertical" flexItem />

          <StyledLink href="/auth/register">Register</StyledLink>
        </AuthSection>
      )}
    </Container>
  );
};

export default Navbar;
