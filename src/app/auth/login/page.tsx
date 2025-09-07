'use client'
import {
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Container,
  Disclaimer,
  ForgotPassword,
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

  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPswd(event.target.value);
  };

  const handleClearClicked = () => {
    setEmail('');
    setPswd('');
  }

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Section>
          Don&apos;t have an account?{" "}
          <StyledLink href="/auth/register">Register</StyledLink>
        </Section>

        <TextField
          fullWidth
          required
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <PasswordField value={pswd} onChange={handlePswdChange} />

        <ForgotPassword>
          <StyledLink href="/auth/forgot-password">Forgot password?</StyledLink>
        </ForgotPassword>

        <Button fullWidth variant="contained">
          Login
        </Button>

        <Button fullWidth variant="outlined" onClick={handleClearClicked}>
          Clear
        </Button>

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