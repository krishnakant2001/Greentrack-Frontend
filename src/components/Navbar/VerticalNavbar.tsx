import React from "react";
import { CollapseButton, CollapseIcon, IconWrapper, NAV_ITEMS, NavigationItem, NavigationLink, NavigationWrapper, NavLabel, SidebarContainer } from "./navbar.style";

interface VerticalNavbarProps {
  onCollapse: () => void;
  expanded?: boolean;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({onCollapse, expanded = false}) => {
  return (
    <SidebarContainer role="navigation">
      <NavigationWrapper $expanded={expanded}>

        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;

          return (
            <NavigationItem key={item.href}>
              <NavigationLink href={item.href} title={item.label}>
                <IconWrapper>
                  <IconComponent style={{ fontSize: 28 }} />
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
};

export default VerticalNavbar;
