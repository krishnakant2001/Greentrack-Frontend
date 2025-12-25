"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { EmailEnvelopeIllustration } from "@/components/illustrations";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "" || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccessMessage("OTP sent to your email!");
      console.log("Form submitted with email:", email);
      
      setTimeout(() => {
        router.push("/auth/otp");
      }, 1500);
    }
  };

  return (
    <>
      <AuthPageLayout
        title="Forgot Password"
        subtitle="Enter your email address and we'll send you a verification code"
        illustration={<EmailEnvelopeIllustration />}
        illustrationTitle="Check Your Email"
        illustrationSubtitle="We'll send you a verification code to reset your password"
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
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '56px',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 3,
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
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Remember your password?{" "}
              <Link
                href="/auth/login"
                sx={{ textDecoration: "none", fontWeight: 600, color: "secondary.main" }}
              >
                Sign In
              </Link>
            </Typography>

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
      <LoadingBackdrop open={isLoading} message="Sending OTP..." />
    </>
  );
};

export default ForgotPassword;
