"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Disclaimer,
  FormSection,
  LinkSection,
  OtpCounter,
  Section,
  StyledLink,
  Title,
  Wrapper,
} from "../auth.styles";
import { Button, Link, Typography } from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";

const OtpValidation = () => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setIsResendEnabled(false);
    } else {
      setIsResendEnabled(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const validateOtp = (value: string) => {
    const otpRegex = /^\d{6}$/; // Assuming OTP is a 6-digit number
    return otpRegex.test(value);
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
    if (validateOtp(event.target.value)) {
      setOtpError("");
    }
    if (event.target.value.length > 6) {
      setOtpError("OTP must be 6 digits.");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp === "" || !validateOtp(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
    } else {
      // Proceed with form submission
      console.log("Form submitted with OTP:", otp);
    }
  };

  const handleResendClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isResendEnabled) return;
    // Trigger your resend OTP logic here
    console.log("Resending OTP...");

    setTimer(60);
    setIsResendEnabled(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Enter the OTP</Title>
        <Section>
          Please enter the OTP that has been sent to your email address.
        </Section>
        <FormSection onSubmit={handleSubmit} noValidate>
          <PasswordField
            id="otp"
            label="One-Time Password (OTP)"
            value={otp}
            onChange={handleOtpChange}
            error={otpError}
          />
          <LinkSection>
            {isResendEnabled ? (
              <StyledLink href="#" onClick={handleResendClicked}>
                Resend OTP
              </StyledLink>
            ) : (
              <OtpCounter>
                You can resend OTP in {timer} second{timer !== 1 ? "s" : ""}
              </OtpCounter>
            )}
          </LinkSection>

          <Button type="submit" fullWidth variant="contained">
            Verify OTP
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

export default OtpValidation;
