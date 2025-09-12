"use client";
import React, { useState } from "react";
import {
  Container,
  Disclaimer,
  FormSection,
  Section,
  StyledLink,
  Title,
  Wrapper,
} from "../auth.styles";
import PasswordField from "@/components/reusableComponents/PasswordField";
import { Button, Link, Typography } from "@mui/material";

const ResetPassword = () => {
  const [newPswd, setNewPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [newPswdError, setPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPswd === "" || !validatePswd(newPswd)) {
      setPswdError("Password must have 6 characters.");
    }
    if (confirmPswd === "" || confirmPswd !== newPswd) {
      setConfirmPswdError("Passwords do not match.");
    }
    if (confirmPswd === newPswd) {
      // Proceed with form submission
      console.log("Form submitted with new password:", newPswd);
    }
  };

  const handleClearClicked = () => {
    setNewPswd("");
    setConfirmPswd("");
    setPswdError("");
    setConfirmPswdError("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Reset Password</Title>
        <Section>Please enter your new password below.</Section>
        <FormSection onSubmit={handleSubmit} noValidate>
          <PasswordField
            id="new-password"
            label="New Password"
            value={newPswd}
            onChange={handleNewPswdChange}
            error={newPswdError}
          />
          <PasswordField
            id="confirm-new-password"
            label="Confirm New Password"
            value={confirmPswd}
            onChange={handleConfirmPswdChange}
            error={confirmPswdError}
          />
          <br />
          <Button type="submit" variant="contained">
            Reset Password
          </Button>
          <Button variant="outlined" onClick={handleClearClicked}>
            Clear
          </Button>
        </FormSection>
        <Disclaimer>
          <Typography variant="body2">
            For more information, please review our{" "}
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

export default ResetPassword;
