"use client";
import React from "react";
import styled from "styled-components";

interface PeriodSelectorProps {
  periods: string[];
  activePeriod: string;
  onPeriodChange: (period: string) => void;
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  background: white;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Button = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #143d60 0%, #2a5f87 100%)"
      : "transparent"};
  color: ${(props) => (props.$active ? "white" : "#666")};
  text-transform: capitalize;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #0c2b4e 0%, #143d60 100%)"
        : "#f5f5f5"};
  }
`;

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  periods,
  activePeriod,
  onPeriodChange,
}) => {
  return (
    <Container>
      {periods.map((period) => (
        <Button
          key={period}
          $active={activePeriod === period}
          onClick={() => onPeriodChange(period)}
        >
          {period}
        </Button>
      ))}
    </Container>
  );
};
