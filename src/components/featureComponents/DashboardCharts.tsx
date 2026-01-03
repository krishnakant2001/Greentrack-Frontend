"use client";
import React from "react";
import styled from "styled-components";

interface ChartData {
  category: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: ChartData[];
  size?: number;
}

interface BarChartProps {
  data: ChartData[];
  height?: number;
}

// Styled Components
const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const PieChartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PieChartSvg = styled.svg`
  transform: rotate(-90deg);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #143d60;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${(props) => props.$color};
`;

const LegendLabel = styled.span`
  font-weight: 500;
`;

const LegendValue = styled.span`
  color: #666;
  font-weight: 600;
`;

const BarChartWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BarLabel = styled.div`
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #143d60;
  text-align: right;
`;

const BarTrack = styled.div`
  flex: 1;
  height: 32px;
  background: #f0f0f0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

const BarFill = styled.div<{ $color: string; $percentage: number }>`
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background: ${(props) => props.$color};
  border-radius: 8px;
  transition: width 0.8s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  position: relative;

  &::after {
    content: "${(props) => props.$percentage.toFixed(1)}%";
    color: ${(props) => (props.$percentage > 20 ? "white" : "#143d60")};
    font-size: 12px;
    font-weight: 600;
    position: ${(props) => (props.$percentage > 20 ? "static" : "absolute")};
    right: ${(props) => (props.$percentage > 20 ? "auto" : "-45px")};
  }
`;

const BarValue = styled.div`
  width: 80px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-align: right;
`;

const DonutCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const DonutValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #143d60;
`;

const DonutLabel = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

// PieChart Component
export const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const innerRadius = radius * 0.6; // For donut chart
  // const circumference = 2 * Math.PI * radius;

  let currentAngle = 0;

  const createArc = (
    startAngle: number,
    endAngle: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    const startX = radius + outerRadius * Math.cos(startAngle);
    const startY = radius + outerRadius * Math.sin(startAngle);
    const endX = radius + outerRadius * Math.cos(endAngle);
    const endY = radius + outerRadius * Math.sin(endAngle);

    const innerStartX = radius + innerRadius * Math.cos(endAngle);
    const innerStartY = radius + innerRadius * Math.sin(endAngle);
    const innerEndX = radius + innerRadius * Math.cos(startAngle);
    const innerEndY = radius + innerRadius * Math.sin(startAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `
      M ${startX} ${startY}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      L ${innerStartX} ${innerStartY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}
      Z
    `;
  };

  return (
    <ChartContainer>
      <PieChartWrapper>
        <PieChartSvg width={size} height={size}>
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const path = createArc(startAngle, endAngle, radius, innerRadius);
            currentAngle = endAngle;

            return (
              <g key={index}>
                <path
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                  style={{
                    transition: "opacity 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <title>
                    {item.category}: {item.value.toFixed(2)} kg CO₂e (
                    {percentage.toFixed(1)}%)
                  </title>
                </path>
              </g>
            );
          })}
        </PieChartSvg>
        <DonutCenter>
          <DonutValue>{total.toFixed(1)}</DonutValue>
          <DonutLabel>kg CO₂e</DonutLabel>
        </DonutCenter>
      </PieChartWrapper>
      <ChartLegend>
        {data.map((item, index) => (
          <LegendItem key={index}>
            <LegendColor $color={item.color} />
            <LegendLabel>{item.category}</LegendLabel>
            <LegendValue>
              ({((item.value / total) * 100).toFixed(1)}%)
            </LegendValue>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartContainer>
  );
};

// BarChart Component
export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <BarChartWrapper>
      {data.map((item, index) => (
        <BarRow key={index}>
          <BarLabel>{item.category}</BarLabel>
          <BarTrack>
            <BarFill
              $color={item.color}
              $percentage={(item.value / maxValue) * 100}
            />
          </BarTrack>
          <BarValue>{item.value.toFixed(2)}</BarValue>
        </BarRow>
      ))}
    </BarChartWrapper>
  );
};

// Activity Count Chart Component
interface ActivityChartProps {
  data: { category: string; count: number; color: string }[];
}

const ActivityChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  width: 100%;
`;

const ActivityBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ActivityBarTrack = styled.div`
  width: 100%;
  height: 150px;
  background: #f0f0f0;
  border-radius: 8px 8px 0 0;
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const ActivityBarFill = styled.div<{ $color: string; $percentage: number }>`
  width: 100%;
  height: ${(props) => props.$percentage}%;
  background: ${(props) => props.$color};
  border-radius: 8px 8px 0 0;
  transition: height 0.8s ease;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
`;

const ActivityCount = styled.div`
  color: white;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ActivityLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #143d60;
  text-align: center;
`;

export const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <ActivityChartWrapper>
      {data.map((item, index) => (
        <ActivityBar key={index}>
          <ActivityBarTrack>
            <ActivityBarFill
              $color={item.color}
              $percentage={(item.count / maxCount) * 100}
            >
              <ActivityCount>{item.count}</ActivityCount>
            </ActivityBarFill>
          </ActivityBarTrack>
          <ActivityLabel>{item.category}</ActivityLabel>
        </ActivityBar>
      ))}
    </ActivityChartWrapper>
  );
};
