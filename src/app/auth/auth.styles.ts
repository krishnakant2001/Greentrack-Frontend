'use client'
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 436px;
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
export const Fullname = styled.div``;

export const ForgotPassword = styled.div`
    text-align: end;
    margin-bottom: 16px;
`;

export const Disclaimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`
export const StyledLink = styled(Link)(() => ({
  color: '#143D60',
  textDecoration: 'none',
  fontWeight: 300,
  '&:hover': {
    color: '#143D60',
    textDecoration: 'underline',
  },
}));
