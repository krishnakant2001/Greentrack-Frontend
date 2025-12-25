import React from "react";
import styled from "styled-components";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

// Animation keyframes extracted for better performance
const slideIn = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-12px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// Main dropdown container with modern styling
const DropdownContainer = styled.div`
  ${slideIn}
  width: 260px;
  position: absolute;
  top: 58px;
  right: -7px;
  background: linear-gradient(
    135deg,
    rgb(255, 255, 255) 0%,
    rgb(240, 250, 235) 50%,
    rgb(235, 245, 255) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(20, 61, 96, 0.15), 0 2px 8px rgba(20, 61, 96, 0.08);
  border: 2px solid rgba(160, 200, 120, 0.3);
  padding: 12px;
  z-index: 1000;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: linear-gradient(
      135deg,
      rgb(255, 255, 255) 0%,
      rgb(240, 250, 235) 100%
    );
    border-left: 2px solid rgba(160, 200, 120, 0.3);
    border-top: 2px solid rgba(160, 200, 120, 0.3);
    border-top-left-radius: 3px;
    transform: rotate(45deg);
  }
`;

// User info section at the top
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(160, 200, 120, 0.08) 0%, rgba(160, 200, 120, 0.04) 100%);
  border: 2px solid rgba(160, 200, 120, 0.2);
`;

const AvatarCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #143d60 0%, #2a5f87 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(20, 61, 96, 0.2);
`;

const UserDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #143d60;
  letter-spacing: -0.2px;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: #64748b;
  letter-spacing: 0.01em;
`;

// Navigation wrapper
const MenuNavigation = styled.nav`
  padding: 4px 0;
`;

// Enhanced menu item with icon background
const MenuItem = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $danger }) => ($danger ? "#dc2626" : "#334155")};
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: ${({ $danger }) =>
      $danger
        ? "rgba(220, 38, 38, 0.08)"
        : "linear-gradient(135deg, rgba(160, 200, 120, 0.12) 0%, rgba(160, 200, 120, 0.06) 100%)"};
    color: ${({ $danger }) => ($danger ? "#b91c1c" : "#143d60")};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px) scale(0.98);
  }
`;

const IconWrapper = styled.div<{ $danger?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ $danger }) =>
    $danger ? "rgba(220, 38, 38, 0.08)" : "rgba(160, 200, 120, 0.12)"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${MenuItem}:hover & {
    background: ${({ $danger }) =>
      $danger ? "rgba(220, 38, 38, 0.15)" : "rgba(160, 200, 120, 0.2)"};
    transform: scale(1.05);
  }
`;

// Menu text with better typography
const MenuText = styled.span`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.01em;
  flex: 1;
`;

const StyledDivider = styled(Divider)`
  && {
    margin: 8px 0;
    border-color: rgba(160, 200, 120, 0.2);
  }
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
      <UserInfo>
        <AvatarCircle>
          <PersonOutlineIcon style={{ fontSize: 22 }} />
        </AvatarCircle>
        <UserDetails>
          <UserName>Krishnakant</UserName>
          <UserEmail>user@greentrack.com</UserEmail>
        </UserDetails>
      </UserInfo>

      <MenuNavigation>
        <MenuItem onClick={handleClickedProfile}>
          <IconWrapper>
            <SettingsOutlinedIcon style={{ fontSize: 20, color: "#143d60" }} />
          </IconWrapper>
          <MenuText>Profile Settings</MenuText>
        </MenuItem>

        <StyledDivider />

        <MenuItem onClick={handleClickedLogout} $danger>
          <IconWrapper $danger>
            <PowerSettingsNewOutlinedIcon
              style={{ fontSize: 20, color: "#dc2626" }}
            />
          </IconWrapper>
          <MenuText>Logout</MenuText>
        </MenuItem>
      </MenuNavigation>
    </DropdownContainer>
  );
};

export default UserMenu;
