import { Button, Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import React from 'react'
import { Container, ForgotPassword, OAuth, Separator, Title, Wrapper } from '../auth.styles';
import Link from 'next/link';
import PasswordField from '@/components/reusableComponents/PasswordField';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <div>
          Don&apos;t have an account? <Link href="/auth/register">Register</Link>
        </div>
        <TextField
          fullWidth
          required
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <PasswordField />
        <ForgotPassword>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </ForgotPassword>
        <FormControlLabel
          required
          control={<Checkbox />}
          label="Accept our Terms and conditions"
        />

        <Button fullWidth variant="contained">
          Login
        </Button>
        <Button fullWidth variant="outlined">
          Reset
        </Button>
        <Separator>
          <Divider>or</Divider>
        </Separator>

        <OAuth>
          <Button variant="outlined">
            <FcGoogle size={"32px"} /> &nbsp; Continue with Google
          </Button>
        </OAuth>
      </Wrapper>
    </Container>
  );
}

export default Login