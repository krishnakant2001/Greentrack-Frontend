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

const Register = () => {
  
  const router = useRouter();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [region, setRegion] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");
  const [regionError, setRegionError] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    if (event.target.value !== "") {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailError("");
    }
  };

  const handlePswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPswd(event.target.value);
    if (validatePswd(event.target.value)) {
      setPswdError("");
    }
    if (confirmPswd === event.target.value) {
      setConfirmPswdError("");
    }
  };

  const handleConfirmPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPswd(event.target.value);
    if (event.target.value === pswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (firstName === "") {
      setFirstNameError("Please enter your first name.");
    }
    if (email === "") {
      setEmailError("Please enter a valid email address.");
    }
    if (pswd === "") {
      setPswdError("Password must have 6 characters.");
    }
    if (confirmPswd === "" || confirmPswd !== pswd) {
      setConfirmPswdError("Passwords do not match.");
    }
    if (region === "") {
      setRegionError("Please select a region.");
    }

    if (checkValidCredentials() && confirmPswd === pswd) {
      // handle form submission logic here
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Password:", pswd);
      console.log("Region:", region);
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
        <FormSection onSubmit={handleSubmit} noValidate>
          <TextSection>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={handleFirstNameChange}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={lastName}
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
          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            value={confirmPswd}
            onChange={handleConfirmPswdChange}
            error={confirmPswdError}
          />
          <InputSelectField
            required
            id="region"
            label="Region"
            value={region}
            onChange={handleRegionChange}
            error={regionError}
            options={regionData}
          />
          <ButtonSection>
            <Button variant="outlined" onClick={handleCancelClicked}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Register
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
