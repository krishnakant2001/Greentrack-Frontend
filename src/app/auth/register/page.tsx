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
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { EarthIllustration } from "@/components/illustrations";
import { AuthPageLayout, LoadingBackdrop } from "@/components/auth";
import { validateEmail, validatePswd } from "@/utils/validations";
import { registerUser } from "@/services/authService";
import { regionDataConstants } from "@/constants/regionDataConstants";

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pswd: "",
    confirmPswd: "",
    region: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");
  const [regionError, setRegionError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, firstName: event.target.value });
    if (event.target.value !== "") {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, lastName: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, email: event.target.value });
    if (validateEmail(event.target.value)) {
      setEmailError("");
    }
  };

  const handlePswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, pswd: event.target.value });
    if (validatePswd(event.target.value)) {
      setPswdError("");
    }
    if (fields.confirmPswd === event.target.value) {
      setConfirmPswdError("");
    }
  };

  const handleConfirmPswdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, confirmPswd: event.target.value });
    if (event.target.value === fields.pswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRegion = event.target.value;
    setFields({ ...fields, region: selectedRegion });
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    let hasError = false;

    if (!fields.firstName) {
      setFirstNameError("Please enter your first name.");
      hasError = true;
    }
    if (!fields.email) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else if (!validateEmail(fields.email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }
    if (!fields.pswd) {
      setPswdError("Password must have 6 characters.");
      hasError = true;
    } else if (!validatePswd(fields.pswd)) {
      setPswdError("Password must have 6 characters.");
      hasError = true;
    }
    if (fields.confirmPswd === "" || fields.confirmPswd !== fields.pswd) {
      setConfirmPswdError("Passwords do not match.");
      hasError = true;
    }
    if (!fields.region) {
      setRegionError("Please select a region.");
      hasError = true;
    }

    if (hasError) return;

    // Start Loading
    setIsLoading(true);

    try {
      // Call register API
      const response = await registerUser(
        fields.firstName,
        fields.lastName,
        fields.email,
        fields.pswd,
        fields.region
      );

      console.log("Initiate registration response:", response);

      // Success handling
      setSuccessMessage("OTP sent, Please check once");
      setSnackbarOpen(true);

      if (response.data?.email) {
        localStorage.setItem("Email", response.data.email);
        setTimeout(() => {
          router.push("/auth/otp");
        }, 1500);
      } else {
        console.error("Email not found in response:", response.data);
      }
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

  const handleCancelClicked = () => {
    router.push("/");
  };

  return (
    <>
      <AuthPageLayout
        title="Join GreenTrack"
        subtitle="Create your account and start making a difference"
        illustration={<EarthIllustration />}
        illustrationTitle="Make Earth Greener"
        illustrationSubtitle="Start your journey towards a carbon-neutral lifestyle today"
        gradientReverse={true}
        logoSize={55}
      >
        {/* Error Message - Keep at top for errors */}
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", gap: 1.5, mb: 1 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={fields.firstName}
              onChange={handleFirstNameChange}
              required
              autoComplete="given-name"
              autoFocus
              error={!!firstNameError}
              helperText={firstNameError}
              sx={{
                "& .MuiInputBase-root": {
                  height: "56px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={fields.lastName}
              onChange={handleLastNameChange}
              autoComplete="family-name"
              sx={{
                "& .MuiInputBase-root": {
                  height: "56px",
                },
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
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
            value={fields.pswd}
            onChange={handlePswdChange}
            required
            autoComplete="new-password"
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

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={fields.confirmPswd}
            onChange={handleConfirmPswdChange}
            required
            autoComplete="new-password"
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
              "& .MuiInputBase-root": {
                height: "56px",
              },
              mt: 1,
              mb: 1,
            }}
          />

          <TextField
            fullWidth
            select
            label="Region"
            name="region"
            required
            error={!!regionError}
            helperText={regionError}
            value={fields.region}
            onChange={handleRegionChange}
            SelectProps={{
              native: false,
              MenuProps: {
                PaperProps: {
                  sx: {
                    bgcolor: "background.paper",
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      mx: 0.5,
                      "&:hover": {
                        bgcolor: "background.hover",
                      },
                      "&.Mui-selected": {
                        bgcolor: "success.light",
                        "&:hover": {
                          bgcolor: "background.hover",
                        },
                      },
                    },
                  },
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: "56px",
              },
              mt: 1,
              mb: 1,
            }}
          >
            <MenuItem value="">
              <em>Select your region</em>
            </MenuItem>
            {regionDataConstants.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleCancelClicked}
              sx={{ py: 0.75 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "#FFFFFF",
                py: 0.75,
                "&:hover": {
                  bgcolor: "primary.dark",
                  color: "#FFFFFF",
                },
              }}
            >
              Register
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1.5, color: "text.secondary", fontSize: "0.75rem" }}
          >
            By creating an account, you agree to our{" "}
            <Link
              href="/auth/terms-and-conditions"
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              Terms and Conditions
            </Link>
          </Typography>

          <Divider sx={{ my: 1.5 }}>OR</Divider>

          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: "0.875rem" }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              sx={{
                textDecoration: "none",
                fontWeight: 600,
                color: "secondary.main",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </AuthPageLayout>
      <LoadingBackdrop open={isLoading} message="Creating your account..." />

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

export default Register;
