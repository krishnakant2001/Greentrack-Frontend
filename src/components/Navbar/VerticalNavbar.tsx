import React, { memo } from "react";
import { usePathname } from "next/navigation";
import {
  CollapseButton,
  CollapseIcon,
  IconWrapper,
  NAV_ITEMS,
  NavigationItem,
  NavigationLink,
  NavigationWrapper,
  NavLabel,
  SidebarContainer,
  ICON_SIZES,
} from "./navbar.style";

interface VerticalNavbarProps {
  onCollapse: () => void;
  expanded?: boolean;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = memo(({ onCollapse, expanded = false }) => {
  const pathname = usePathname();

  return (
    <SidebarContainer role="navigation">
      <NavigationWrapper $expanded={expanded}>

        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;

          return (
            <NavigationItem key={item.href}>
              <NavigationLink href={item.href} title={item.label} $isActive={isActive}>
                <IconWrapper>
                  <IconComponent style={{ fontSize: ICON_SIZES.medium }} />
                </IconWrapper>
                {expanded && <NavLabel>{item.label}</NavLabel>}
              </NavigationLink>
            </NavigationItem>
          );
        })}

      </NavigationWrapper>

      <CollapseButton onClick={onCollapse} title={expanded ? "Collapse sidebar" : "Expand sidebar"}>
        <CollapseIcon $expanded={expanded} />
      </CollapseButton>

    </SidebarContainer>
  );
});

VerticalNavbar.displayName = "VerticalNavbar";

export default VerticalNavbar;
