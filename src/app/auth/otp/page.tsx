"use client";

import React, { useEffect, useState } from "react";
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
import { SuccessCheckmarkIllustration } from "@/components/illustrations";
import { verifyOtpAndRegisterUser } from "@/services/verifyOtpService";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";

const OtpValidation = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setIsResendEnabled(false);
    } else {
      setIsResendEnabled(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const validateOtp = (value: string) => {
    const otpRegex = /^\d{6}$/; // Assuming OTP is a 6-digit number
    return otpRegex.test(value);
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
    if (validateOtp(event.target.value)) {
      setOtpError("");
    }
    if (event.target.value.length > 6) {
      setOtpError("OTP must be 6 digits.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp === "" || !validateOtp(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    const email = localStorage.getItem("Email");

    if (!email) {
      console.error("Email not found");
      router.push("/auth/register");
      return;
    }

    // Start Loading
    setIsLoading(true);
    
    try {
      // Call register API
      const response = await verifyOtpAndRegisterUser(
        email,
        otp
      );

      console.log("Verification and Registration Done:", response);

      // Success handling
      setSuccessMessage("User registration successfull");

      // Optionally, redirect to login page after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

    } catch (error) {
      // Error handling
      console.error("Registration error:", error);

      let errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      if (errorMessage.includes("500")) {
        errorMessage = "Server error. Please try again later.";
      } else if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your internet connection.";
      }
      setApiError(errorMessage);
    } finally {
      // Stop Loading
      setIsLoading(false);
    }
  };

  const handleResendClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isResendEnabled) return;
    // Trigger your resend OTP logic here
    console.log("Resending OTP...");

    setTimer(60);
    setIsResendEnabled(false);
  };

  return (
    <>
      <AuthPageLayout
        title="OTP Verification"
        subtitle="Enter the verification code sent to your email"
        illustration={<SuccessCheckmarkIllustration />}
        illustrationTitle="Verify Your Account"
        illustrationSubtitle="Enter the verification code sent to your email"
        gradientReverse={true}
        logoSize={70}
        formPadding={{ xs: 2, md: 4 }}
      >
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="One-Time Password (OTP)"
              name="otp"
              type={showOtp ? "text" : "password"}
              value={otp}
              onChange={handleOtpChange}
              margin="normal"
              required
              autoFocus
              error={!!otpError}
              helperText={otpError}
              inputProps={{ maxLength: 6 }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle otp visibility"
                      onClick={() => setShowOtp(!showOtp)}
                      edge="end"
                    >
                      {showOtp ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '56px',
                },
              }}
            />

            <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
              {isResendEnabled ? (
                <Link
                  href="#"
                  onClick={handleResendClicked}
                  sx={{ textDecoration: "none", fontWeight: 600, color: "secondary.main" }}
                >
                  Resend OTP
                </Link>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  You can resend OTP in {timer} second{timer !== 1 ? "s" : ""}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                bgcolor: "primary.main",
                color: "#FFFFFF",
                "&:hover": {
                  bgcolor: "primary.dark",
                  color: "#FFFFFF",
                },
              }}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

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
      <LoadingBackdrop open={isLoading} message="Verifying OTP..." />
    </>
  );
};

export default OtpValidation;
