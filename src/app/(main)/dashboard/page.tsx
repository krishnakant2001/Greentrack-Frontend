"use client";
import { setJwtToken } from "@/store/features/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  EmojiEvents,
  Lightbulb,
  LocalActivity,
} from "@mui/icons-material";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";
import {
  PieChart,
  BarChart,
  ActivityChart,
} from "@/components/featureComponents/DashboardCharts";
import {
  calculatePercentage,
  formatNumber,
  getCategoryBgColor,
  getCategoryBorderColor,
  getCategoryColor,
  getCategoryGradient,
} from "@/utils/dashboardUtils";
import {
  Card,
  GridContainer,
  Header,
  PageContainer,
  SectionTitle,
  Title,
} from "@/components/reusableComponents/StyledComponents";
import {
  DashboardSummaryResponse,
  getDashboardSummary,
} from "@/services/dashboardService";
import { EmptyState as EmptyStateComponent } from "@/components/reusableComponents/EmptyState";
import { PeriodSelector } from "@/components/reusableComponents/PeriodSelector";
import { StatCard } from "@/components/reusableComponents/StatCard";
import { getCategoryIcon } from "@/utils/CategoryIcons";

// Styled Components (Dashboard specific)
const MainStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const CategoryCard = styled(Card)<{ $category: string }>`
  border: 2px solid ${(props) => getCategoryBorderColor(props.$category)};

  &::before {
    background: ${(props) => getCategoryGradient(props.$category)};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIcon = styled.div<{ $category: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(props) => getCategoryBgColor(props.$category)};
  color: ${(props) => getCategoryColor(props.$category)};
`;

const CategoryName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #143d60;
  text-transform: capitalize;
`;

const CategoryEmission = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #143d60;
  text-align: center;
  margin: 16px 0;
`;

const CategoryUnit = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #666;
`;

const CategoryFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;

const ActivityCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const PercentageBadge = styled.div<{ $category: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => getCategoryBgColor(props.$category)};
  color: ${(props) => getCategoryColor(props.$category)};
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)``;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #143d60;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InsightsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InsightCard = styled(Card)<{ $type: "success" | "warning" | "info" }>`
  background: ${(props) => {
    switch (props.$type) {
      case "success":
        return "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
      case "warning":
        return "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)";
      case "info":
        return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
    }
  }};
  border: 2px solid
    ${(props) => {
      switch (props.$type) {
        case "success":
          return "#81c784";
        case "warning":
          return "#ffb74d";
        case "info":
          return "#64b5f6";
      }
    }};
`;

const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const InsightIconWrapper = styled.div<{
  $type: "success" | "warning" | "info";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  color: ${(props) => {
    switch (props.$type) {
      case "success":
        return "#4caf50";
      case "warning":
        return "#ff9800";
      case "info":
        return "#2196f3";
    }
  }};
`;

const InsightTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #143d60;
`;

const InsightContent = styled.div`
  font-size: 15px;
  color: #2c5f7f;
  line-height: 1.6;
  font-weight: 500;
`;

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [period, setPeriod] = useState<string>("weekly");
  const [dashboardData, setDashboardData] =
    useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(setJwtToken(token));
      router.replace("/dashboard");
    }
  }, [searchParams, router, dispatch]);

  useEffect(() => {
    fetchDashboardData(period);
  }, [period]);

  const fetchDashboardData = async (period: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardSummary(period);
      setDashboardData(data);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingBackdrop open={loading} />;
  }

  if (error) {
    return (
      <PageContainer>
        <EmptyStateComponent
          icon="⚠️"
          title={error}
          subtitle="Please refresh the page or try again later."
        />
      </PageContainer>
    );
  }

  if (!dashboardData || dashboardData.totalActivities === 0) {
    return (
      <PageContainer>
        <Header>
          <Title>
            <Assessment /> Dashboard
          </Title>
        </Header>
        <EmptyStateComponent
          icon="📊"
          title="No activities logged yet"
          subtitle="Start tracking your carbon footprint to see insights here"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>
          <Assessment /> Carbon Dashboard
        </Title>
        <PeriodSelector
          periods={["daily", "weekly", "monthly", "yearly"]}
          activePeriod={period}
          onPeriodChange={setPeriod}
        />
      </Header>

      {/* Main Statistics */}
      <MainStats>
        <StatCard
          icon={<Assessment style={{ fontSize: 24, color: "#143d60" }} />}
          label="Total Emissions"
          value={formatNumber(dashboardData.totalCo2eEmissions)}
          unit="kg CO₂e"
          changeValue={dashboardData.percentageChange}
          isPositive={dashboardData.isImprovement}
          showTrend={true}
        />

        <StatCard
          icon={<LocalActivity style={{ fontSize: 24, color: "#143d60" }} />}
          label="Total Activities"
          value={dashboardData.totalActivities}
          unit="activities"
          changeLabel={`${period} period`}
          isPositive={true}
        />

        <StatCard
          icon={<EmojiEvents style={{ fontSize: 24, color: "#143d60" }} />}
          label="Top Category"
          value={dashboardData.topCategory}
          changeLabel={`${formatNumber(
            dashboardData.categoryBreakdown[dashboardData.topCategory] || 0
          )} kg CO₂e`}
          isPositive={false}
        />
      </MainStats>

      {/* Charts Section */}
      <SectionTitle>
        <Assessment /> Emissions Overview
      </SectionTitle>
      <ChartsSection>
        <ChartCard>
          <ChartTitle>Emissions by Category</ChartTitle>
          <PieChart
            data={Object.entries(dashboardData.categoryBreakdown).map(
              ([category, value]) => ({
                category,
                value,
                color: getCategoryColor(category),
              })
            )}
            size={240}
          />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Activity Distribution</ChartTitle>
          <ActivityChart
            data={Object.entries(dashboardData.activityCounts).map(
              ([category, count]) => ({
                category,
                count,
                color: getCategoryColor(category),
              })
            )}
          />
        </ChartCard>
      </ChartsSection>

      <ChartsSection>
        <ChartCard style={{ gridColumn: "1 / -1" }}>
          <ChartTitle>Category Emissions Breakdown</ChartTitle>
          <BarChart
            data={Object.entries(dashboardData.categoryBreakdown).map(
              ([category, value]) => ({
                category,
                value,
                color: getCategoryColor(category),
              })
            )}
          />
        </ChartCard>
      </ChartsSection>

      {/* Category Breakdown */}
      <SectionTitle>
        <Assessment /> Category Breakdown
      </SectionTitle>
      <GridContainer $minWidth="350px">
        {Object.entries(dashboardData.categoryBreakdown).map(
          ([category, emissions]) => (
            <CategoryCard key={category} $category={category}>
              <CategoryHeader>
                <CategoryInfo>
                  <CategoryIcon $category={category}>
                    {getCategoryIcon(category)}
                  </CategoryIcon>
                  <CategoryName>{category.toLowerCase()}</CategoryName>
                </CategoryInfo>
              </CategoryHeader>
              <CategoryEmission>
                {formatNumber(emissions)} <CategoryUnit>kg CO₂e</CategoryUnit>
              </CategoryEmission>
              <CategoryFooter>
                <ActivityCount>
                  <LocalActivity fontSize="small" />
                  {dashboardData.activityCounts[category] || 0} activities
                </ActivityCount>
                <PercentageBadge $category={category}>
                  {calculatePercentage(
                    emissions,
                    dashboardData.totalCo2eEmissions
                  )}
                  % of total
                </PercentageBadge>
              </CategoryFooter>
            </CategoryCard>
          )
        )}
      </GridContainer>

      {/* Insights */}
      <SectionTitle>
        <Lightbulb /> Insights & Recommendations
      </SectionTitle>
      <InsightsSection>
        <InsightCard
          $type={dashboardData.isImprovement ? "success" : "warning"}
        >
          <InsightHeader>
            <InsightIconWrapper
              $type={dashboardData.isImprovement ? "success" : "warning"}
            >
              {dashboardData.isImprovement ? (
                <TrendingDown style={{ fontSize: 28 }} />
              ) : (
                <TrendingUp style={{ fontSize: 28 }} />
              )}
            </InsightIconWrapper>
            <InsightTitle>
              {dashboardData.isImprovement
                ? "Great Progress!"
                : "Needs Attention"}
            </InsightTitle>
          </InsightHeader>
          <InsightContent>
            Your emissions have{" "}
            {dashboardData.isImprovement ? "decreased" : "increased"} by{" "}
            {Math.abs(dashboardData.percentageChange).toFixed(1)}% compared to
            the previous {period} period. Previous emissions:{" "}
            {formatNumber(dashboardData.previousPeriodEmissions)} kg CO₂e.
          </InsightContent>
        </InsightCard>

        <InsightCard $type="info">
          <InsightHeader>
            <InsightIconWrapper $type="info">
              <Lightbulb style={{ fontSize: 28 }} />
            </InsightIconWrapper>
            <InsightTitle>Improvement Area</InsightTitle>
          </InsightHeader>
          <InsightContent>{dashboardData.improvementArea}</InsightContent>
        </InsightCard>
      </InsightsSection>
    </PageContainer>
  );
};

export default Dashboard;
