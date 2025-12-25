"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LockSecurityIllustration } from "@/components/illustrations";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";

const ResetPassword = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPswd, setNewPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [newPswdError, setPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validatePswd = (value: string) => {
    return value.length >= 6;
  };

  const handleNewPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPswd(event.target.value);
    if (validatePswd(event.target.value)) {
      setPswdError("");
    }
    if (confirmPswd === event.target.value) {
      setConfirmPswdError("");
    }
  };

  const handleConfirmPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPswd(event.target.value);
    if (event.target.value === newPswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPswd === "" || !validatePswd(newPswd)) {
      setPswdError("Password must have 6 characters.");
      return;
    }
    if (confirmPswd === "" || confirmPswd !== newPswd) {
      setConfirmPswdError("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSuccessMessage("Password reset successful!");
    console.log("Form submitted with new password:", newPswd);
    
    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  const handleClearClicked = () => {
    setNewPswd("");
    setConfirmPswd("");
    setPswdError("");
    setConfirmPswdError("");
  };

  return (
    <>
      <AuthPageLayout
        title="Reset Password"
        subtitle="Create a strong password to secure your account"
        illustration={<LockSecurityIllustration />}
        illustrationTitle="Secure Your Account"
        illustrationSubtitle="Create a strong password to protect your GreenTrack account"
        logoSize={70}
        formPadding={{ xs: 2, md: 4 }}
      >
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPswd}
              onChange={handleNewPswdChange}
              required
              autoFocus
              error={!!newPswdError}
              helperText={newPswdError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '56px',
                },
                mt: 1,
                mb: 1,
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPswd}
              onChange={handleConfirmPswdChange}
              required
              error={!!confirmPswdError}
              helperText={confirmPswdError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '56px',
                },
                mt: 1,
                mb: 1,
              }}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearClicked}
              >
                Clear
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  bgcolor: "primary.main",
                  color: "#FFFFFF",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    color: "#FFFFFF",
                  },
                }}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              For more information, please review our{" "}
              <Link
                href="/auth/terms-and-conditions"
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
      </AuthPageLayout>
      <LoadingBackdrop open={isLoading} message="Resetting password..." />
    </>
  );
};

export default ResetPassword;
