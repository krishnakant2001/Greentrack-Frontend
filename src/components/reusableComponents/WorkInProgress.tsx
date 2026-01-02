import React from "react";
import styled from "styled-components";
import BuildIcon from "@mui/icons-material/Build";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface WorkInProgressProps {
  title?: string;
  message?: string;
  icon?: "build" | "rocket";
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 32px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #143d60 0%, #a0c878 50%, #143d60 100%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(20, 61, 96, 0.15);
  animation: pulse 2s infinite;

  svg {
    font-size: 64px;
    color: #143d60;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(20, 61, 96, 0.15);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 8px 32px rgba(20, 61, 96, 0.25);
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #143d60;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #e65100;
  margin-top: 16px;
  box-shadow: 0 2px 8px rgba(230, 81, 0, 0.15);

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e65100;
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

const FeatureList = styled.div`
  margin-top: 40px;
  text-align: left;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e0e0e0;
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #143d60;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "🚀";
    font-size: 20px;
  }
`;

const FeatureItem = styled.div`
  font-size: 14px;
  color: #666;
  padding: 8px 0;
  padding-left: 24px;
  position: relative;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #a0c878;
    font-weight: bold;
    font-size: 18px;
  }
`;

const WorkInProgress: React.FC<WorkInProgressProps> = ({
  title = "Work In Progress",
  message = "We're working hard to bring you this feature. Stay tuned for exciting updates!",
  icon = "build",
}) => {
  return (
    <Container>
      <Card>
        <IconWrapper>
          {icon === "build" ? <BuildIcon /> : <RocketLaunchIcon />}
        </IconWrapper>

        <Title>{title}</Title>
        <Message>{message}</Message>

        <StatusBadge>Under Development</StatusBadge>

        <FeatureList>
          <FeatureTitle>Coming Soon</FeatureTitle>
          <FeatureItem>Enhanced user experience</FeatureItem>
          <FeatureItem>Real-time data insights</FeatureItem>
          <FeatureItem>AI-powered suggestions</FeatureItem>
          <FeatureItem>Interactive visualizations</FeatureItem>
        </FeatureList>
      </Card>
    </Container>
  );
};

export default WorkInProgress;
