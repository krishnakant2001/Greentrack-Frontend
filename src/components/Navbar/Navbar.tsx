"use client";
import {
  AuthSection,
  Container,
  CustomDivider,
  LogoSection,
  MenuItem,
  MenuSection,
  StyledLink,
} from "./navbar.style";

// Menu items array for better maintainability
const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <Container>
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
