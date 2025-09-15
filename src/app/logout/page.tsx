"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ButtonSection,
  Container,
  ContentSection,
  ImageSection,
  Section,
  StyledLink,
  SubTitle,
  Title,
  Wrapper,
} from "../auth/auth.styles";
import { Alert, Button, Link } from "@mui/material";

const Logout = () => {
  const router = useRouter();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("You have been logged out successfully."); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRedirectMessage(true);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };

  }, [router]);

  const handleLoginRedirect = async () => {
    router.push("/auth/login");
  };

  const handleHomeRedirect = () => {
    router.push("/");
  };

  return (
    <Container>
      <ContentSection>
        <Wrapper>
          {successMessage && (
            <Alert
              severity="success"
              sx={{
                backgroundColor: "#d4eddaa8",
                fontSize: "1rem",
                color: "#155724",
                mb: 2,
                "& .MuiAlert-icon": { color: "#155724" },
              }}
            >
              {successMessage}
            </Alert>
          )}
          <Title>Goodbye!</Title>
          <SubTitle>
            Thank you for using our platform. Your session has been securely
            terminated.
          </SubTitle>
          {showRedirectMessage && (
            <Section style={{ color: "#6c757d", fontSize: "0.9rem" }}>
              You will be redirected to the Home page shortly...
            </Section>
          )}

          <ButtonSection>
            <Button variant="outlined" color="primary" onClick={handleHomeRedirect}>
              Go to Home
            </Button>
            <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
              Login Again
            </Button>
          </ButtonSection>

          <Section style={{ marginTop: "3rem" }}>
            Need help?{" "}
            <Link component={StyledLink} href={"/support"}>
              Contact Support
            </Link>
          </Section>
        </Wrapper>
      </ContentSection>
      <ImageSection />
    </Container>
  );
};
export default Logout;
