"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LandingNavbar = () => {
  const router = useRouter();

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        bgcolor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(12, 43, 78, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 3, md: 6 },
        zIndex: 1000,
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: "2rem",
            }}
          >
            🌱
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "primary.main",
              fontFamily: "'Nunito', sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            GreenTrack
          </Box>
        </Box>
      </Link>

      {/* Auth Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="text"
          onClick={() => router.push("/auth/login")}
          sx={{
            px: 3,
            py: 1,
            color: "primary.main",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(12, 43, 78, 0.05)",
            },
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/auth/register")}
          sx={{
            px: 3,
            py: 1,
            bgcolor: "primary.main",
            color: "#FFFFFF",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(12, 43, 78, 0.2)",
            "&:hover": {
              bgcolor: "primary.dark",
              boxShadow: "0 4px 12px rgba(12, 43, 78, 0.3)",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingNavbar;
