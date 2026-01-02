import styled from "styled-components";

export const Card = styled.div<{ $gradient?: string }>`
  background: ${(props) => props.$gradient || "white"};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 2px solid #d0e8c5;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #143d60 0%, #a0c878 100%);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(20, 61, 96, 0.12);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #143d60;
  margin: 32px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PageContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #143d60;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const GridContainer = styled.div<{ $minWidth?: string }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props) => props.$minWidth || "350px"}, 1fr)
  );
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
