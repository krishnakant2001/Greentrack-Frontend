"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getUserGoals, deleteGoal } from "@/services/goalService";
import { mockGoals } from "@/data/mockGoalData";
import { DecisionModal } from "@/model/DecisionModal";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";

// Types
interface Goal {
  id: string;
  userId?: string;
  title: string;
  description: string;
  goalType: string;
  targetCategory: string | null;
  currentValue: number;
  targetValue: number;
  period: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt?: string;
}

// Styled Components (similar to activity page)
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

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GoalCard = styled.div<{ $progress: number }>`
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
    background: ${(props) =>
      props.$progress >= 100
        ? "linear-gradient(90deg, #4caf50 0%, #81c784 100%)"
        : props.$progress >= 75
        ? "linear-gradient(90deg, #ffa726 0%, #ffb74d 100%)"
        : "linear-gradient(90deg, #143d60 0%, #a0c878 100%)"};
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

const GoalTypeBadge = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => {
    if (props.$type.includes("CATEGORY"))
      return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
    if (props.$type.includes("TOTAL"))
      return "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)";
    return "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)";
  }};
  color: ${(props) => {
    if (props.$type.includes("CATEGORY")) return "#1565c0";
    if (props.$type.includes("TOTAL")) return "#6a1b9a";
    return "#e65100";
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

const GoalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #143d60;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 12px 0;
  line-height: 1.5;
  font-style: italic;
`;

const ProgressSection = styled.div`
  margin: 16px 0;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressText = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;

const ProgressPercentage = styled.span<{ $completed: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.$completed ? "#4caf50" : "#143d60")};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $progress: number; $completed: boolean }>`
  height: 100%;
  width: ${(props) => Math.min(props.$progress, 100)}%;
  background: ${(props) =>
    props.$completed
      ? "linear-gradient(90deg, #4caf50 0%, #81c784 100%)"
      : props.$progress >= 75
      ? "linear-gradient(90deg, #ffa726 0%, #ffb74d 100%)"
      : "linear-gradient(90deg, #143d60 0%, #a0c878 100%)"};
  transition: width 0.3s ease;
  box-shadow: ${(props) =>
    props.$completed ? "0 0 8px rgba(76, 175, 80, 0.4)" : "none"};
`;

const GoalDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 16px 0;
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

const DateRange = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AchievementBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
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

// Helper function to get goal type icon
const getGoalTypeIcon = (type: string) => {
  if (type.includes("CATEGORY")) return <TrackChangesIcon />;
  if (type.includes("TOTAL")) return <TrendingDownIcon />;
  return <EmojiEventsIcon />;
};

// Helper function to format goal type
const formatGoalType = (type: string) => {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function to calculate progress percentage
const calculateProgress = (current: number, target: number) => {
  if (target === 0) return 0;
  // For reduction goals, progress is inverse
  return Math.abs(((target - current) / target) * 100);
};

const GoalsPage: React.FC = () => {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [deleteModal, setDeleteModal] = useState({ open: false, goalId: "" });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const goalsData = await getUserGoals();
      setGoals(goalsData.data);
    } catch (error) {
      console.error("Error loading goals:", error);
      // Use mock data as fallback when API fails
      console.log("Using mock data for development");
      setGoals(mockGoals as Goal[]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteModal({ open: true, goalId: id });
  };

  const handleDeleteConfirm = async (action: "confirm" | "cancel") => {
    if (action === "confirm") {
      try {
        await deleteGoal(deleteModal.goalId);
        console.log("Deleting goal:", deleteModal.goalId);
        loadGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
    setDeleteModal({ open: false, goalId: "" });
  };

  const handleEdit = (id: string) => {
    router.push(`/goals/edit/${id}`);
  };

  const handleAddNew = () => {
    router.push("/goals/create-goals");
  };

  // Filter goals
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "ALL" || goal.goalType === selectedType;

    return matchesSearch && matchesType;
  });

  // Calculate stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => {
    const progress = calculateProgress(goal.currentValue, goal.targetValue);
    return progress >= 100;
  }).length;
  const inProgressGoals = totalGoals - completedGoals;

  if (loading) {
    return (
      <PageContainer>
        <LoadingBackdrop open={loading} message="Loading goals..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>🎯 My Goals</Title>
        <AddButton onClick={handleAddNew}>
          <AddIcon />
          Add New Goal
        </AddButton>
      </Header>

      {goals.length > 0 && (
        <>
          <StatsBar>
            <StatCard>
              <StatLabel>Total Goals</StatLabel>
              <StatValue>
                {totalGoals}
                <StatUnit>goals</StatUnit>
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Completed</StatLabel>
              <StatValue>
                {completedGoals}
                <StatUnit>achieved</StatUnit>
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>In Progress</StatLabel>
              <StatValue>
                {inProgressGoals}
                <StatUnit>active</StatUnit>
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
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>

            <FilterButton
              $active={selectedType === "ALL"}
              onClick={() => setSelectedType("ALL")}
            >
              <FilterListIcon fontSize="small" />
              All
            </FilterButton>

            <FilterButton
              $active={selectedType === "CATEGORY_REDUCTION"}
              onClick={() => setSelectedType("CATEGORY_REDUCTION")}
            >
              <TrackChangesIcon fontSize="small" />
              Category
            </FilterButton>

            <FilterButton
              $active={selectedType === "TOTAL_EMISSIONS_REDUCTION"}
              onClick={() => setSelectedType("TOTAL_EMISSIONS_REDUCTION")}
            >
              <TrendingDownIcon fontSize="small" />
              Total Emissions
            </FilterButton>
          </FilterBar>
        </>
      )}

      {filteredGoals.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🎯</EmptyIcon>
          <EmptyTitle>
            {goals.length === 0 ? "No Goals Yet" : "No Matching Goals"}
          </EmptyTitle>
          <EmptyText>
            {goals.length === 0
              ? "Set your first sustainability goal and start making a difference!"
              : "Try adjusting your search or filters"}
          </EmptyText>
        </EmptyState>
      ) : (
        <GoalsGrid>
          {filteredGoals.map((goal) => {
            const progress = calculateProgress(
              goal.currentValue,
              goal.targetValue
            );
            const isCompleted = progress >= 100;

            return (
              <GoalCard key={goal.id} $progress={progress}>
                <CardHeader>
                  <GoalTypeBadge $type={goal.goalType}>
                    {getGoalTypeIcon(goal.goalType)}
                    {formatGoalType(goal.goalType)}
                  </GoalTypeBadge>
                  <ActionButtons>
                    <IconButton
                      onClick={() => handleEdit(goal.id)}
                      title="Edit"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      className="delete"
                      onClick={() => handleDelete(goal.id)}
                      title="Delete"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </ActionButtons>
                </CardHeader>

                <GoalTitle>{goal.title}</GoalTitle>

                {goal.description && (
                  <Description>&quot;{goal.description}&quot;</Description>
                )}

                <ProgressSection>
                  <ProgressLabel>
                    <ProgressText>Progress</ProgressText>
                    <ProgressPercentage $completed={isCompleted}>
                      {progress.toFixed(0)}%
                    </ProgressPercentage>
                  </ProgressLabel>
                  <ProgressBar>
                    <ProgressFill
                      $progress={progress}
                      $completed={isCompleted}
                    />
                  </ProgressBar>
                </ProgressSection>

                <GoalDetails>
                  <DetailItem>
                    <DetailLabel>Current</DetailLabel>
                    <DetailValue>{goal.currentValue.toFixed(2)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Target</DetailLabel>
                    <DetailValue>{goal.targetValue.toFixed(2)}</DetailValue>
                  </DetailItem>
                  {goal.targetCategory && (
                    <DetailItem>
                      <DetailLabel>Category</DetailLabel>
                      <DetailValue>{goal.targetCategory}</DetailValue>
                    </DetailItem>
                  )}
                  <DetailItem>
                    <DetailLabel>Period</DetailLabel>
                    <DetailValue>{goal.period}</DetailValue>
                  </DetailItem>
                </GoalDetails>

                {isCompleted && (
                  <AchievementBadge>
                    <EmojiEventsIcon fontSize="small" />
                    Goal Achieved!
                  </AchievementBadge>
                )}

                <DateRange>
                  📅 {formatDate(goal.startDate)} - {formatDate(goal.endDate)}
                </DateRange>
              </GoalCard>
            );
          })}
        </GoalsGrid>
      )}

      <DecisionModal
        open={deleteModal.open}
        handleClose={handleDeleteConfirm}
        title="Delete Goal?"
        description="Are you sure you want to delete this goal? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </PageContainer>
  );
};

export default GoalsPage;
