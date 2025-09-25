"use client";
import { Button, Divider } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div``;

export const Heading = styled.div`
padding: 8px;
  margin-bottom: 20px;
`;

export const Title = styled.h1``;

export const Subtitle = styled.h3`

  font-weight: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 12px;
`;

export const FormSection = styled.form``;

export const Section = styled.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  border-radius: 12px;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 16px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: #374151;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 2;
  padding-left: 32px;
`;
export const Space = styled.div`
  height: 36px;
`

/* Danger button for delete actions */
export const DangerButton = styled(Button)`
  && {
    padding: 12px 24px;

    background: #ef4444;
    color: white;

    font-weight: 500;
    text-transform: none;

    transition: all 0.2s ease;

    &:hover {
      background: #dc2626;
    }
  }
`;

export const DangerTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
`;

export const DangerDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #7f1d1d;

  margin: 0 0 16px 0;
`;

export const DividerWithMargin = styled(Divider)`
  &&{
    margin-top: 36px;
    margin-bottom: 24px;
  }
`