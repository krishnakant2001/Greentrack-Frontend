"use client";
import Link from "next/link";
import styled from "styled-components";
import logoutBackground from "@/assets/Planting.jpg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 436px;
`;

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1``;

export const Section = styled.div`
  margin-bottom: 12px;
`;

export const OAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.div``;
export const TextSection = styled.div`
  display: flex;
  gap: 16px;
`;
export const ButtonSection = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;

export const LinkSection = styled.div`
  text-align: end;
  margin-bottom: 16px;
`;

export const OtpCounter = styled.div`
  color: #00000099;
  font-weight: 300;
`;

export const Disclaimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const StyledLink = styled(Link)(() => ({
  color: "#143D60",
  textDecoration: "none",
  fontWeight: 300,
  "&:hover": {
    color: "#0d2539",
    textDecoration: "underline",
  },
}));

export const TermsAndConditionsContent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: justify;
  align-items: center;
  gap: 16px;
  overflow-y: auto;
  padding: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: #0d2539;
`;

export const Paragraph = styled.p`
  text-align: justify;
`;

//logout page styles
export const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 4;
`;

export const ImageSection = styled.div`
  height: 100vh;
  flex: 5;
  background-image: url("${logoutBackground.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubTitle = styled.h3`
  font-weight: 400;
  color: #143d60;
  margin-bottom: 1rem;
`;
