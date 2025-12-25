"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, TextField, Button, Typography, Link, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { SuccessCheckmarkIllustration } from "@/components/illustrations";
import { verifyOtpAndRegisterUser } from "@/services/verifyOtpService";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";

const OtpValidation = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      setOtpError("");

      // Focus the next empty field or the last field
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }

    const email = localStorage.getItem("Email");

    if (!email) {
      console.error("Email not found");
      router.push("/auth/register");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtpAndRegisterUser(email, otpValue);
      console.log("Verification and Registration Done:", response);
      setSuccessMessage("User registration successfull");

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
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
      setIsLoading(false);
    }
  };

  const handleResendClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isResendEnabled) return;
    console.log("Resending OTP...");

    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setIsResendEnabled(false);
    inputRefs.current[0]?.focus();
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
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Enter 6-digit OTP
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 2 },
                justifyContent: "center",
                mb: 1,
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) =>
                    handleKeyDown(
                      index,
                      e as React.KeyboardEvent<HTMLInputElement>
                    )
                  }
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: 600,
                    },
                  }}
                  sx={{
                    width: { xs: "45px", sm: "56px" },
                    "& .MuiInputBase-root": {
                      height: { xs: "45px", sm: "56px" },
                      borderRadius: 2,
                    },
                    "& input": {
                      padding: 0,
                    },
                  }}
                  error={!!otpError}
                  autoFocus={index === 0}
                />
              ))}
            </Box>

            {otpError && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", textAlign: "center", mt: 1 }}
              >
                {otpError}
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
            {isResendEnabled ? (
              <Link
                href="#"
                onClick={handleResendClicked}
                sx={{
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "secondary.main",
                }}
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

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
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
