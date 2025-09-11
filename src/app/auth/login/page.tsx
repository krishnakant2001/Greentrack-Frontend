"use client";
import { Button, Divider, Link, TextField, Typography } from "@mui/material";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePswd = (value: string) => {
    return value.length >= 6;
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

    if (email === "") {
      setEmailError("Please enter a valid email address.");
    }
    if (pswd === "") {
      setPswdError("Password must have 6 characters.");
    }

    if (checkValidCredentials()) {
      // handle form submission logic here
      console.log("Email:", email);
      console.log("Password:", pswd);
    }
  };

  const handleClearClicked = () => {
    setEmail("");
    setPswd("");
    setEmailError("");
    setPswdError("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Section>
          Don&apos;t have an account?{" "}
          <StyledLink href="/auth/register">Register</StyledLink>
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

          <Button type="submit" fullWidth variant="contained">
            Login
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
