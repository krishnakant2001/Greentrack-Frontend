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
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { TreeIllustration } from "@/components/illustrations";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";
import { loginUser } from "@/services/authService";
import { validateEmail, validatePswd } from "@/utils/validations";
import { setJwtToken, setUserInfo } from "@/store/features/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { getUserProfileDetails } from "@/services/userDetailsService";
import { API_BASE_URL, API_ENDPOINTS } from "@/configs/apiConfig";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.OAUTH.GOOGLE_LOGIN}`;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailError("");
    }
    if (apiError) setApiError("");
  };

  const handlePswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPswd(event.target.value);
    if (validatePswd(event.target.value)) {
      setPswdError("");
    }
    if (apiError) setApiError("");
  };

  const checkValidCredentials = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePswd(pswd)) {
      setPswdError("Password must have 6 characters.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      setEmailError("Please enter a valid email address.");
    }
    if (pswd === "") {
      setPswdError("Password must have 6 characters.");
    }

    if (checkValidCredentials()) {
      // Start loading
      setIsLoading(true);

      try {
        // Call login API
        const response = await loginUser(email, pswd);
        console.log("Login response:", response);

        // Success handling
        setSuccessMessage("Login successful! Redirecting...");
        setSnackbarOpen(true);

        // Store token and user info in Redux
        if (response.data) {
          dispatch(setJwtToken(response.data.token));
          getUserProfileDetails(response.data.token).then((userData) => {
            dispatch(setUserInfo(userData.data));
          });
        }
        // Redirect to dashboard or home page after a short delay
        setTimeout(() => {
          router.push("/dashboard"); // Adjust the route as needed
        }, 1500);
      } catch (error: unknown) {
        // Error handling
        console.error("Login error:", error);

        let errorMessage = "An unexpected error occurred. Please try again.";
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: string }).message === "string"
        ) {
          const message = (error as { message: string }).message;
          if (message.includes("401")) {
            errorMessage = "Invalid email or password. Please try again.";
          } else if (message.includes("404")) {
            errorMessage = "User not found. Please check your email address.";
          } else if (message.includes("500")) {
            errorMessage = "Server error. Please try again later.";
          } else if (message.includes("Failed to fetch")) {
            errorMessage =
              "Network error. Please check your internet connection.";
          } else {
            errorMessage = message;
          }
        }
        setApiError(errorMessage);
      } finally {
        // Stop loading
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <AuthPageLayout
        title="Welcome Back"
        subtitle="Sign in to GreenTrack and continue your sustainability journey"
        illustration={<TreeIllustration />}
        illustrationTitle="Track Your Carbon Footprint"
        illustrationSubtitle="Join us in making a sustainable difference for our planet"
      >
        {/* Error Message - Keep at top for errors */}
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
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
            required
            autoComplete="email"
            autoFocus
            error={!!emailError}
            helperText={emailError}
            sx={{
              "& .MuiInputBase-root": {
                height: "56px",
              },
              mt: 1,
              mb: 1,
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={pswd}
            onChange={handlePswdChange}
            required
            autoComplete="current-password"
            error={!!pswdError}
            helperText={pswdError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: "56px",
              },
              mt: 1,
              mb: 1,
            }}
          />

          <Box sx={{ textAlign: "right", mt: 1.5 }}>
            <Link
              href="/auth/forgot-password"
              variant="body2"
              sx={{ textDecoration: "none", fontSize: "0.875rem" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2.5,
              mb: 1.5,
              py: 1,
              bgcolor: "primary.main",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: "primary.dark",
                color: "#FFFFFF",
              },
            }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{ mb: 2, py: 1 }}
          >
            <FcGoogle size={"20px"} /> &nbsp; Continue with Google
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: "0.875rem", mt: 2 }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              sx={{
                textDecoration: "none",
                fontWeight: 600,
                color: "secondary.main",
              }}
            >
              Sign Up
            </Link>
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1.5, color: "text.secondary", fontSize: "0.75rem" }}
          >
            By signing in, you agree to our{" "}
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

      <LoadingBackdrop open={isLoading} message="Logging in..." />

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
