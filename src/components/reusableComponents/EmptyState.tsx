"use client";
import React from "react";
import styled from "styled-components";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

const Container = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #999;
`;

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <Container>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};
