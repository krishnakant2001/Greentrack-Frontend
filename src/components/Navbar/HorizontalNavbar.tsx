"use client";
import React, { useState } from "react";
import {
  Container,
  DropdownIndicator,
  LogoSection,
  ProfileSection,
  Username,
} from "./navbar.style";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserMenu from "../featureComponents/userMenu";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const HorizontalNavbar = ({username = "Krishnakant"}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClicked = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <LogoSection href={"/"}>🌱 GreenTrack</LogoSection>

      <ProfileSection onClick={handleClicked}>
        <AccountCircleOutlinedIcon style={{ fontSize: 32, color: "#143d60" }} />

        <Username>{username}</Username>

        {isOpen && <UserMenu />}

        <DropdownIndicator $isOpen={isOpen}>
          <ArrowDropDownOutlinedIcon />
        </DropdownIndicator>

      </ProfileSection>
      
    </Container>
  );
};

export default HorizontalNavbar;
