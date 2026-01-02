"use client";
import React from "react";
import styled from "styled-components";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  changeValue?: number;
  changeLabel?: string;
  isPositive?: boolean;
  showTrend?: boolean;
}

const CardContainer = styled.div<{ $gradient?: string }>`
  background: ${(props) =>
    props.$gradient || "linear-gradient(135deg, #93e4fe3e 0%, #c1f19180 100%)"};
  border: 2px solid #d0e8c5;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(20, 61, 96, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #143d60 0%, #a0c878 100%);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #143d60;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
`;

const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2c5f7f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #143d60;
  margin-bottom: 8px;
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const StatUnit = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #666;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$positive ? "#4caf50" : "#f44336")};
  padding: 6px 12px;
  background: ${(props) =>
    props.$positive ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)"};
  border-radius: 20px;
  width: fit-content;
`;

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  unit,
  changeValue,
  changeLabel,
  isPositive = true,
  showTrend = false,
}) => {
  return (
    <CardContainer>
      <StatHeader>
        <StatIcon>{icon}</StatIcon>
        <StatLabel>{label}</StatLabel>
      </StatHeader>
      <StatValue>
        {value}
        {unit && <StatUnit>{unit}</StatUnit>}
      </StatValue>
      {(changeValue !== undefined || changeLabel) && (
        <StatChange $positive={isPositive}>
          {showTrend && (
            <>
              {isPositive ? (
                <TrendingDown fontSize="small" />
              ) : (
                <TrendingUp fontSize="small" />
              )}
            </>
          )}
          {changeValue !== undefined && (
            <>
              {Math.abs(changeValue).toFixed(1)}%{" "}
              {isPositive ? "decrease" : "increase"}
            </>
          )}
          {changeLabel && !changeValue && changeLabel}
        </StatChange>
      )}
    </CardContainer>
  );
};
