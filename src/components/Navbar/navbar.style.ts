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

// --------- Horizontal navbar styles ---------

// Main container with improved gradient and responsive design
export const Container = styled.nav`
  width: 100%;
  height: 60px;
  background: linear-gradient(125deg, #143d60 0%, #2a5f87 40%, #a0c878 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-shadow: 0 2px 8px rgba(20, 61, 96, 0.15);
  position: fixed;
  z-index: 2000;
`;

// Logo with enhanced styling and hover effects
export const LogoSection = styled(Link)`
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

// Profile section with improved styling
export const AuthSection = styled.div`
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

export const ProfileSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 4px 16px;
  border-radius: 25px;
  background-color: rgba(255, 248, 222, 0.6);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 248, 222, 0.8);
    transition: all 0.2s ease;
  }
`;

// Username with better typography
export const Username = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #143d60;
  letter-spacing: 0.025em;

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

// Main container with improved layout
export const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(180deg, #143d60 0%, #2a5f87 100%);
  padding: 24px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  position: relative;
  z-index: 100;
`;

// Navigation wrapper with better spacing
export const NavigationWrapper = styled.nav<{ $expanded: boolean }>`
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: ${({ $expanded }) => ($expanded ? "0px 18px" : "0px 10px")};
  transition: all 0.3s ease;
`;

// Enhanced navigation item with better interaction
export const NavigationItem = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -16px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #a0c878;
    border-radius: 0 4px 4px 0;
    transform: scaleY(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform: scaleY(1);
  }

  &:hover {
    transform: translateX(4px);
  }
`;

// Improved styled link with better visual feedback
export const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #fff8de;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(160, 200, 120, 0.1);
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    transform: none; /* Override parent transform */

    &::before {
      transform: translateX(0);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    background: rgba(160, 200, 120, 0.4);
  }
`;

// Icon wrapper for consistent sizing
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
`;

// Text label with smooth animation
export const NavLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
`;

// Enhanced collapse button
export const CollapseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(160, 200, 120, 0.3);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(160, 200, 120, 0.2);
    border-color: rgba(160, 200, 120, 0.6);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Rotating icon with smooth animation
export const CollapseIcon = styled(KeyboardDoubleArrowRightIcon)<{$expanded: boolean}>`
  font-size: 20px !important;
  color: #fff8de;
  transition: transform 0.3s ease, color 0.2s ease;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(180deg)" : "rotate(0deg)"};

  ${CollapseButton}:hover & {
    color: #ffffff;
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
