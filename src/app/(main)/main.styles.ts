"use client";
import styled from "styled-components";

export const Container = styled.div``;
export const Heading = styled.div``;
export const Title = styled.h1``;
export const Subtitle = styled.h2``;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    border: 2px solid #000000ff;
    padding: 16px;
    border-radius: 12px;
`;
export const Section = styled.div`
  display: flex;
  gap: 24px;
  border: 2px solid #0048ffff;
    padding: 16px;
    border-radius: 12px;
`;
export const ButtonSection = styled.div`
display: flex;
justify-content: flex-end;
gap: 16px;
padding: 0 16px;
`;
export const LeftSection = styled.div`
  flex: 1;
  border: 2px solid #00ff80ff;
`;
export const RightSection = styled.div`
    border: 2px solid #ff5100ff;
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: center;
`;
export const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    color: red;
    border: 1px solid black;
    padding: 8px 24px;
    width: fit-content;
    border-radius: 8px;

`;
