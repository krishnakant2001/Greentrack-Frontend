"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Container,
  LogoSection,
  ProfileSection,
  NotificationButton,
  NotificationBadge,
  ActionGroup,
  ICON_SIZES,
  COLORS,
} from "./navbar.style";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import UserMenu from "../featureComponents/userMenu";
import { GreenTrackLogo } from "../illustrations";

interface HorizontalNavbarProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
}

const HorizontalNavbar: React.FC<HorizontalNavbarProps> = ({
  notificationCount = 3,
  onNotificationClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClicked = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <Container>
      <LogoSection href={"/"}>
        <GreenTrackLogo size={60} /> GreenTrack
      </LogoSection>

      <ActionGroup>
        <NotificationButton
          onClick={onNotificationClick}
          title="View notifications"
        >
          <NotificationsOutlinedIcon
            style={{ fontSize: ICON_SIZES.small, color: COLORS.primary }}
          />
          {notificationCount > 0 && (
            <NotificationBadge>{notificationCount}</NotificationBadge>
          )}
        </NotificationButton>

        <ProfileSection
          ref={dropdownRef}
          onClick={handleClicked}
          title="Profile menu"
        >
          <AccountCircleOutlinedIcon
            style={{ fontSize: ICON_SIZES.large, color: COLORS.primary }}
          />
          {isOpen && <UserMenu />}
        </ProfileSection>
      </ActionGroup>
    </Container>
  );
};

export default HorizontalNavbar;
