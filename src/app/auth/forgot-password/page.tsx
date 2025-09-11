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
import { Button, Link, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "" || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      // Proceed with form submission
      console.log("Form submitted with email:", email);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forgot Password</Title>
        <Section>
          Please enter your email address to reset your password.
        </Section>
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
          <br />
          <Button type="submit" fullWidth variant="contained">
            Send OTP
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

export default ForgotPassword;
