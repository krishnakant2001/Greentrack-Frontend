import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LuActivity } from "react-icons/lu";
import { GoGoal } from "react-icons/go";
import { Divider } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import FeedbackIcon from "@mui/icons-material/Feedback";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";

// --------- Theme Constants ---------
export const COLORS = {
  primary: "#143d60",
  primaryDark: "#0c2b4e",
  secondary: "#2a5f87",
  accent: "#a0c878",
  white: "#ffffff",
  danger: "#dc2626",
} as const;

export const ICON_SIZES = {
  small: 24,
  medium: 28,
  large: 32,
} as const;

// --------- Horizontal navbar styles ---------

// Main container with clean gradient and glass effect
export const Container = styled.nav`
  width: 100%;
  height: 64px;
  background: linear-gradient(
    90deg,
    rgb(255, 255, 255) 0%,
    rgb(240, 250, 235) 30%,
    rgb(235, 245, 255) 70%,
    rgb(255, 255, 255) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 2px 12px rgba(20, 61, 96, 0.08), 0 4px 24px rgba(160, 200, 120, 0.06);
  border-bottom: 3px solid;
  border-image: linear-gradient(90deg, #143d60 0%, #2a5f87 30%, #a0c878 70%, #2a5f87 100%) 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  transition: all 0.3s ease;
`;

// Logo with enhanced styling and hover effects
export const LogoSection = styled(Link)`
  font-size: clamp(22px, 3vw, 24px);
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #143d60;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: -0.3px;

  &:hover {
    color: #0c2b4e;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Menu section with better spacing and responsive behavior
export const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  color: #fff8de;
  font-weight: 400;
  font-size: 17px;
`;

// Enhanced menu items with better hover effects
export const MenuItem = styled.div`
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

  &:active {
    transform: translateY(0);
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

// Profile section with subtle improvements
export const AuthSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #143d60;
  font-weight: 600;
  font-size: 15px;
  background-color: rgba(255, 248, 222, 0.75);
  padding: 10px 20px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(20, 61, 96, 0.15);
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(255, 248, 222, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(20, 61, 96, 0.25);
  }
`;

// Action group container for icons (notifications, profile)
export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProfileSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(160, 200, 120, 0.15) 0%, rgba(160, 200, 120, 0.25) 100%);
  border: 2px solid rgba(160, 200, 120, 0.4);
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(20, 61, 96, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(160, 200, 120, 0.25) 0%, rgba(160, 200, 120, 0.35) 100%);
    border-color: rgba(160, 200, 120, 0.6);
    box-shadow: 0 4px 16px rgba(160, 200, 120, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Notification button with badge support
export const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(160, 200, 120, 0.15) 0%, rgba(160, 200, 120, 0.25) 100%);
  border: 2px solid rgba(160, 200, 120, 0.4);
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(20, 61, 96, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(160, 200, 120, 0.25) 0%, rgba(160, 200, 120, 0.35) 100%);
    border-color: rgba(160, 200, 120, 0.6);
    box-shadow: 0 4px 16px rgba(160, 200, 120, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Notification badge for count
export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

// Username with better typography
export const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #143d60;
  letter-spacing: 0.01em;
`;

// Dropdown indicator (optional chevron)
export const DropdownIndicator = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #143d60;
  transition: all 0.3s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

// Enhanced styled link with better animations
export const StyledLink = styled(Link)`
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
export const CustomDivider = styled(Divider)`
  && {
    background-color: #143d60;
    opacity: 0.6;
    height: 30px;
    margin: 0 4px;
  }
`;




// ----- Vertical sidebar with collapse functionality -----

// Main container with refined gradient
export const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(180deg, #143d60 0%, #1a4a6d 50%, #143d60 100%);
  padding: 88px 0 28px 0;
  box-shadow: 4px 0 16px rgba(20, 61, 96, 0.25);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
`;

// Navigation wrapper with better spacing
export const NavigationWrapper = styled.nav<{ $expanded: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: ${({ $expanded }) => ($expanded ? "0px 16px" : "0px 10px")};
  transition: all 0.3s ease;
`;

// Enhanced navigation item with better interaction
export const NavigationItem = styled.div`
  position: relative;
  transition: all 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 0;
    background: linear-gradient(180deg, #a0c878 0%, #7ea35c 100%);
    border-radius: 0 6px 6px 0;
    box-shadow: 0 0 8px rgba(160, 200, 120, 0.4);
    transition: height 0.25s ease;
  }

  &:has(a[data-active="true"]) {
    &::before {
      height: 70%;
    }
  }

  &:hover::before {
    height: 70%;
  }
`;

// Improved styled link with better visual feedback
export const NavigationLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#fff8de")};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  background: ${({ $isActive }) =>
    $isActive ? "rgba(160, 200, 120, 0.2)" : "transparent"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(160, 200, 120, 0.18) 0%, rgba(160, 200, 120, 0.1) 100%);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(6px);

    &::before {
      transform: translateX(0);
    }
  }

  &:active {
    transform: translateX(3px) scale(0.98);
  }
`;

// Icon wrapper for consistent sizing
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: transform 0.25s ease;
  
  ${NavigationLink}:hover & {
    transform: scale(1.15);
  }
`;

// Text label with smooth animation
export const NavLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  white-space: nowrap;
`;

// Enhanced collapse button
export const CollapseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(160, 200, 120, 0.35);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(160, 200, 120, 0.2);
    border-color: rgba(160, 200, 120, 0.6);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(160, 200, 120, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// Rotating icon with smooth animation
export const CollapseIcon = styled(KeyboardDoubleArrowRightIcon)<{$expanded: boolean}>`
  font-size: 24px !important;
  color: #fff8de;
  transition: all 0.3s ease;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(180deg)" : "rotate(0deg)"};

  ${CollapseButton}:hover & {
    color: #ffffff;
    transform: ${({ $expanded }) =>
      $expanded ? "rotate(180deg) scale(1.15)" : "rotate(0deg) scale(1.15)"};
  }
`;

// Navigation items configuration
export const NAV_ITEMS = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/dashboard",
    icon: DashboardIcon,
    label: "Dashboard",
  },
  {
    href: "/activity",
    icon: LuActivity,
    label: "Activity",
  },
  {
    href: "/goals",
    icon: GoGoal,
    label: "Goals",
  },
  {
    href: "/recommendations",
    icon: SupportIcon,
    label: "Recommendations",
  },
  {
    href: "/feedback",
    icon: FeedbackIcon,
    label: "Feedback",
  },
];
