import React, { ReactNode } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { GreenTrackLogo } from "@/components/illustrations";

interface AuthPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  illustration?: ReactNode;
  illustrationTitle?: string;
  illustrationSubtitle?: string;
  gradientReverse?: boolean;
  logoSize?: number;
  formPadding?: number | { xs: number; md: number };
  titleSize?: string;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  children,
  title,
  subtitle,
  illustration,
  illustrationTitle,
  illustrationSubtitle,
  gradientReverse = false,
  logoSize = 60,
  formPadding = { xs: 2, md: 3 },
  titleSize = "1.75rem",
}) => {
  const gradient = gradientReverse
    ? "linear-gradient(135deg, #D0E8C5 0%, #F5F5F5 100%)"
    : "linear-gradient(135deg, #F5F5F5 0%, #D0E8C5 100%)";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: gradient,
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Illustration Side - Hidden on mobile */}
        {illustration && (
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {illustration}
            {illustrationTitle && (
              <Typography
                variant="h5"
                sx={{
                  mt: 3,
                  color: "primary.main",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {illustrationTitle}
              </Typography>
            )}
            {illustrationSubtitle && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "text.secondary",
                  textAlign: "center",
                  maxWidth: 300,
                }}
              >
                {illustrationSubtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Form Side */}
        <Paper
          elevation={6}
          sx={{
            p: formPadding,
            flex: 1,
            maxWidth: { xs: "100%", md: 450 },
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
            <GreenTrackLogo size={logoSize} />
          </Box>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            fontWeight="bold"
            sx={{ color: "primary.main", mb: 1.5, fontSize: titleSize }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3, fontSize: "0.875rem" }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthPageLayout;
