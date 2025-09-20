import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LuActivity } from "react-icons/lu";
import { GoGoal } from "react-icons/go";
import SupportIcon from "@mui/icons-material/Support";
import FeedbackIcon from "@mui/icons-material/Feedback";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";

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
    transition: transform 0.3s ease;
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
export const CollapseIcon = styled(KeyboardDoubleArrowRightIcon)<{
  $expanded: boolean;
}>`
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
