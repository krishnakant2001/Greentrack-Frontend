"use client";
import React, { useState } from "react";
import {
  ButtonSection,
  Container,
  Disclaimer,
  FormSection,
  Section,
  StyledLink,
  TextSection,
  Title,
  Wrapper,
} from "../auth.styles";
import {
  Alert,
  Button,
  Link,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import { useRouter } from "next/navigation";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { validateEmail, validatePswd } from "@/utils/validations";
import { regionData } from "@/data/regionData";
import { registerUser } from "@/services/authService";

const Register = () => {

  const router = useRouter();

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

  const handleConfirmPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, confirmPswd: event.target.value });
    if (event.target.value === fields.pswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const selectedRegion = event.target.value;
    setFields({ ...fields, region: selectedRegion });
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
  };

  const checkValidCredentials = () => {
    let valid = true;

    if (!validateEmail(fields.email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePswd(fields.pswd)) {
      setPswdError("Password must have 6 characters.");
      valid = false;
    }

    return valid;
  };

  const checkInputFields = () => {
    if(!fields.firstName || !fields.email || !fields.pswd || !fields.confirmPswd || !fields.region) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fields.firstName) {
      setFirstNameError("Please enter your first name.");
    }
    if (!fields.email) {
      setEmailError("Please enter a valid email address.");
    }
    if (!fields.pswd) {
      setPswdError("Password must have 6 characters.");
    }
    if (fields.confirmPswd === "" || fields.confirmPswd !== fields.pswd) {
      setConfirmPswdError("Passwords do not match.");
    }
    if (!fields.region) {
      setRegionError("Please select a region.");
    }

    if (checkValidCredentials() && checkInputFields() && fields.confirmPswd === fields.pswd) {
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

        if (response.data?.email) {
          localStorage.setItem("Email", response.data.email);
          router.push("/auth/otp");
        } else {
          console.error("Email not found in response:", response.data);
        }
        
        // Optionally, redirect to login page after a delay
        // setTimeout(() => {
        //   router.push("/auth/login");
        // }, 3000);

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

      // handle form submission logic here
      console.log("First Name:", fields.firstName);
      console.log("Last Name:", fields.lastName);
      console.log("Email:", fields.email);
      console.log("Password:", fields.pswd);
      console.log("Region:", fields.region);
    }
  };

  const handleCancelClicked = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Section>
          Already have an account?{" "}
          <StyledLink href="/auth/login">Login</StyledLink>
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
          <TextSection>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              value={fields.firstName}
              onChange={handleFirstNameChange}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={fields.lastName}
              onChange={handleLastNameChange}
            />
          </TextSection>
          <TextField
            fullWidth
            required
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={fields.email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <PasswordField
            id="password"
            value={fields.pswd}
            onChange={handlePswdChange}
            error={pswdError}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            value={fields.confirmPswd}
            onChange={handleConfirmPswdChange}
            error={confirmPswdError}
          />
          <InputSelectField
            required
            id="region"
            label="Region"
            value={fields.region}
            onChange={handleRegionChange}
            error={regionError}
            options={regionData}
          />
          <ButtonSection>
            <Button variant="outlined" onClick={handleCancelClicked}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </ButtonSection>
        </FormSection>

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

export default Register;
