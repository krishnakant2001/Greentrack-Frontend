import React from "react";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

interface LoadingBackdropProps {
  open: boolean;
  message?: string;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  open,
  message = "Loading...",
}) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "secondary.main",
          }}
        />
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 500 }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingBackdrop;
