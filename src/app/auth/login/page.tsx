"use client";
import { Alert, Button, Divider, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Container,
  Disclaimer,
  FormSection,
  LinkSection,
  OAuth,
  Section,
  Separator,
  StyledLink,
  Title,
  Wrapper,
} from "../auth.styles";
import PasswordField from "@/components/reusableComponents/PasswordField";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { validateEmail, validatePswd } from "@/utils/validations";

const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

        // Store token in localStorage (or use a more secure method)
        if (response.token) {
          localStorage.setItem("authToken", response.token);
          // Store user data if needed
          if (response.user) {
            localStorage.setItem("user", JSON.stringify(response.user));
          }
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

  const handleClearClicked = () => {
    setEmail("");
    setPswd("");
    setEmailError("");
    setPswdError("");
    setApiError("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Section>
          Don&apos;t have an account?{" "}
          <StyledLink href="/auth/register">Register</StyledLink>
        </Section>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}
        <FormSection onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            required
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <PasswordField
            id="password"
            value={pswd}
            onChange={handlePswdChange}
            error={pswdError}
          />

          <LinkSection>
            <StyledLink href="/auth/forgot-password">
              Forgot password?
            </StyledLink>
          </LinkSection>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleClearClicked}>
            Clear
          </Button>
        </FormSection>

        <Separator>
          <Divider>or</Divider>
        </Separator>

        <OAuth>
          <Button variant="outlined">
            <FcGoogle size={"32px"} /> &nbsp; Continue with Google
          </Button>
        </OAuth>

        <Disclaimer>
          <Typography variant="body2">
            By creating this account, you agree to our{" "}
            <Link
              component={StyledLink}
              href={"/auth/terms-and-conditions"}
              target="_blank"
            >
              Terms and Conditions
            </Link>{" "}
          </Typography>
        </Disclaimer>
      </Wrapper>
    </Container>
  );
};

export default Login;
