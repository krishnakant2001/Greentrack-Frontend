"use client";
import { activityCategoryData } from "@/data/activityCategoryData";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";
import { MoreHoriz } from "@mui/icons-material";
import styled from "styled-components";

interface Activity {
  id: string;
  userId: string;
  category: string;
  subType: string;
  quantity: number;
  unit: string;
  co2eEmissions: number;
  emissionFactorRef: string;
  description: string;
  activityDate: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityCardProps {
  activity: Activity;
  onMenuClick?: () => void;
}

const CardContainer = styled.div`
  width: 360px;
  padding: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #55afcd80 0%, #c1f19180 100%);
  border: 2px solid #143d60;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CategorySection = styled.div``;

const Category = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  color: #143d60;
  line-height: 1.2;
`;

const SubType = styled.div`
  font-size: 18px;
  color: #2c5f7f;
  margin-top: 4px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
`;

const MenuButton = styled.button`
  border-radius: 25%;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 8px;
  color: #143d60;
  transition: color 0.2s ease;

  &:hover {
    color: #2c5f7f;
  }
`;

const QuantityText = styled.div`
  font-size: 16px;
  color: #143d60;
`;

const MiddleSection = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #143d60;
  padding: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #143d60;
`;

const DateText = styled.div``;

const LocationText = styled.div``;

// UTILITY FUNCTIONS
const getCategoryName = (code: string): string => {
  const category = activityCategoryData.find((c) => c.code === code);
  return category?.name ?? code;
};

const getSubCategoryName = (code: string): string => {
  const subCategory = activitySubCategoryData.find((sc) => sc.code === code);
  return subCategory?.name ?? code;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit}`;
};

const formatEmissions = (emissions: number): string => {
  return `${emissions} kg CO₂e`;
};

// COMPONENT
const ActivityCard = ({ activity, onMenuClick }: ActivityCardProps) => {
  const categoryName = getCategoryName(activity.category);
  const subCategoryName = getSubCategoryName(activity.subType);
  const formattedDate = formatDate(activity.activityDate);
  const quantityDisplay = formatQuantity(activity.quantity, activity.unit);
  const emissionsDisplay = formatEmissions(activity.co2eEmissions);

  return (
    <CardContainer>
      <CardWrapper>
        {/* Header Section */}
        <TopSection>
          <CategorySection>
            <Category>{categoryName}</Category>
            <SubType>{subCategoryName}</SubType>
          </CategorySection>

          <RightSection>
            <MenuButton onClick={onMenuClick}>
              <MoreHoriz/>
            </MenuButton>
            <QuantityText>Quantity: {quantityDisplay}</QuantityText>
          </RightSection>
        </TopSection>

        {/* Emissions Section */}
        <MiddleSection>Carbon Emission: {emissionsDisplay}</MiddleSection>

        {/* Footer Section */}
        <BottomSection>
          <DateText>{formattedDate}</DateText>
          <LocationText>{activity.location || "No location"}</LocationText>
        </BottomSection>
      </CardWrapper>
    </CardContainer>
  );
};

export default ActivityCard;
