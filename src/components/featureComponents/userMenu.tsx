import React from "react";
import styled from "styled-components";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

// Main dropdown container with improved styling
const DropdownContainer = styled.div`
  width: 220px;
  position: absolute;
  top: 56px;
  right: 0;
  background: #fffcf1;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #a0c878;
  padding: 8px 0;
  z-index: 1000;
  animation: dropdownSlideIn 0.2s ease;

  @keyframes dropdownSlideIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -6.7px;
    right: 16px;
    width: 12px;
    height: 12px;
    background: #fffcf1;
    border: 1px solid #a0c878;
    border-top-left-radius: 2px;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
`;

// Navigation wrapper - more semantic than generic wrapper
const MenuNavigation = styled.nav`
  padding: 2px 8px;
`;

// Enhanced menu item with better interactions
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease-in-out;
  position: relative;

  &:hover {
    background: #a0c8783a;
    color: #1e293b;
    transform: translateX(2px);
  }
`;

// Menu text with better typography
const MenuText = styled.span`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.025em;
`;

const UserMenu = () => {

  const router = useRouter();
  

  const handleClickedProfile = () => {

    //call to the api to get user details
    router.push("/settings/user-details");
  };
  
  const handleClickedLogout = () => {
    
    //call to the api to logout user
    router.push("/logout");
  };

  return (
    <DropdownContainer>
      <MenuNavigation>

        <MenuItem onClick={handleClickedProfile}>
          <SettingsOutlinedIcon style={{ fontSize: 18 }} />
          <MenuText>Profile Settings</MenuText>
        </MenuItem>

        <Divider style={{ margin: "2px 16px", borderColor: "#a0c8783a" }} />

        <MenuItem onClick={handleClickedLogout}>
          <PowerSettingsNewOutlinedIcon
            style={{ fontSize: 18, color: "#dc2626" }}
          />
          <MenuText>Logout</MenuText>
        </MenuItem>

      </MenuNavigation>
    </DropdownContainer>
  );
};

export default UserMenu;
