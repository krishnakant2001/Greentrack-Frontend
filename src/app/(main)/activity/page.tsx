"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { deleteActivity, getUserActivities } from "@/services/activityService";
import { DecisionModal } from "@/model/DecisionModal";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";
import { mockActivities } from "@/data/mockActivityData";
import { activityCategoryConstants } from "@/constants/activityCategoryConstants";

// Types
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

// Styled Components
const PageContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #143d60;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #143d60 0%, #2a5f87 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(20, 61, 96, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(20, 61, 96, 0.3);
    background: linear-gradient(135deg, #0c2b4e 0%, #143d60 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #a0c878;
    box-shadow: 0 0 0 3px rgba(160, 200, 120, 0.1);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  display: flex;
  align-items: center;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #a0c878 0%, #7faf5c 100%)"
      : "white"};
  color: ${(props) => (props.$active ? "white" : "#143d60")};
  border: 2px solid ${(props) => (props.$active ? "#a0c878" : "#e0e0e0")};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #a0c878;
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #7faf5c 0%, #6d9b4a 100%)"
        : "#f0f7f4"};
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #143d60;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const StatUnit = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
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

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CategoryBadge = styled.div<{ $category: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$category) {
      case "TRAVEL":
        return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
      case "ENERGY":
        return "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)";
      case "PURCHASES":
        return "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)";
      default:
        return "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)";
    }
  }};
  color: ${(props) => {
    switch (props.$category) {
      case "TRAVEL":
        return "#1565c0";
      case "ENERGY":
        return "#e65100";
      case "PURCHASES":
        return "#6a1b9a";
      default:
        return "#424242";
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #143d60;
  }

  &.delete:hover {
    background: #ffebee;
    color: #d32f2f;
  }
`;

const SubTypeLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #143d60;
  margin-bottom: 12px;
`;

const ActivityDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 16px;
  color: #143d60;
  font-weight: 600;
`;

const EmissionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #a0c878 0%, #7faf5c 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(160, 200, 120, 0.3);
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 12px 0 8px 0;
  line-height: 1.5;
  font-style: italic;
`;

const LocationText = styled.div`
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.3;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  color: #143d60;
  margin-bottom: 12px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "TRAVEL":
      return <DirectionsCarIcon />;
    case "ENERGY":
      return <ElectricBoltIcon />;
    case "PURCHASES":
      return <ShoppingBagIcon />;
    default:
      return <DirectionsCarIcon />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ActivityPage: React.FC = () => {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    activityId: "",
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const activityResponse = await getUserActivities();
      setActivities(activityResponse.data);
    } catch (error) {
      console.error("Error loading activities:", error);
      // Use mock data as fallback when API fails
      console.log("Using mock data for development");
      setActivities(mockActivities);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteModal({ open: true, activityId: id });
  };

  const handleDeleteConfirm = async (action: "confirm" | "cancel") => {
    if (action === "confirm") {
      try {
        console.log("Deleting activity:", deleteModal.activityId);
        await deleteActivity(deleteModal.activityId);
        // After successful delete, reload activities
        loadActivities();
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
    setDeleteModal({ open: false, activityId: "" });
  };

  const handleEdit = (id: string) => {
    router.push(`/activity/edit/${id}`);
  };

  const handleAddNew = () => {
    router.push("/activity/create-activity");
  };

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.subType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || activity.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  const totalEmissions = activities.reduce(
    (sum, act) => sum + act.co2eEmissions,
    0
  );
  const totalActivities = activities.length;
  const avgEmissions =
    totalActivities > 0 ? totalEmissions / totalActivities : 0;

  if (loading) {
    return (
      <PageContainer>
        <LoadingBackdrop open={loading} message="Loading activities..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>🌱 My Activities</Title>
        <AddButton onClick={handleAddNew}>
          <AddIcon />
          Add New Activity
        </AddButton>
      </Header>

      {activities.length > 0 && (
        <>
          <StatsBar>
            <StatCard>
              <StatLabel>Total Activities</StatLabel>
              <StatValue>
                {totalActivities}
                <StatUnit>activities</StatUnit>
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Total Emissions</StatLabel>
              <StatValue>
                {totalEmissions.toFixed(2)}
                <StatUnit>kg CO₂e</StatUnit>
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Average per Activity</StatLabel>
              <StatValue>
                {avgEmissions.toFixed(2)}
                <StatUnit>kg CO₂e</StatUnit>
              </StatValue>
            </StatCard>
          </StatsBar>

          <FilterBar>
            <SearchBox>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>

            <FilterButton
              $active={selectedCategory === "ALL"}
              onClick={() => setSelectedCategory("ALL")}
            >
              <FilterListIcon fontSize="small" />
              All
            </FilterButton>

            {activityCategoryConstants.map((cat) => (
              <FilterButton
                key={cat.code}
                $active={selectedCategory === cat.code}
                onClick={() => setSelectedCategory(cat.code)}
              >
                {getCategoryIcon(cat.code)}
                {cat.name}
              </FilterButton>
            ))}
          </FilterBar>
        </>
      )}

      {filteredActivities.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🌍</EmptyIcon>
          <EmptyTitle>
            {activities.length === 0
              ? "No Activities Yet"
              : "No Matching Activities"}
          </EmptyTitle>
          <EmptyText>
            {activities.length === 0
              ? "Start tracking your carbon footprint by adding your first activity!"
              : "Try adjusting your search or filters"}
          </EmptyText>
        </EmptyState>
      ) : (
        <ActivitiesGrid>
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id}>
              <CardHeader>
                <CategoryBadge $category={activity.category}>
                  {getCategoryIcon(activity.category)}
                  {activity.category}
                </CategoryBadge>
                <ActionButtons>
                  <IconButton
                    onClick={() => handleEdit(activity.id)}
                    title="Edit"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    className="delete"
                    onClick={() => handleDelete(activity.id)}
                    title="Delete"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ActionButtons>
              </CardHeader>

              <SubTypeLabel>{activity.subType.replace(/_/g, " ")}</SubTypeLabel>

              <EmissionBadge>
                🌿 {activity.co2eEmissions.toFixed(2)} kg CO₂e
              </EmissionBadge>

              <ActivityDetails>
                <DetailItem>
                  <DetailLabel>Quantity</DetailLabel>
                  <DetailValue>
                    {activity.quantity} {activity.unit}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Date</DetailLabel>
                  <DetailValue>
                    {new Date(activity.activityDate).toLocaleDateString()}
                  </DetailValue>
                </DetailItem>
              </ActivityDetails>

              {activity.description && (
                <Description>&quot;{activity.description}&quot;</Description>
              )}

              {activity.location && (
                <LocationText>📍 {activity.location}</LocationText>
              )}

              <DateText>Logged: {formatDate(activity.createdAt)}</DateText>
            </ActivityCard>
          ))}
        </ActivitiesGrid>
      )}

      <DecisionModal
        open={deleteModal.open}
        handleClose={handleDeleteConfirm}
        title="Delete Activity?"
        description="Are you sure you want to delete this activity? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </PageContainer>
  );
};

export default ActivityPage;
