"use client";
import React, { useEffect, useState } from 'react'
import { ActivityTopSection, ButtonSection, Container, Heading, Subtitle, Title, ViewButton, ViewSection, Wrapper } from '../main.styles'
import { Button, Divider } from '@mui/material'
import { getUserActivities } from '@/services/activityService';
import ActivityCardList from '@/components/featureComponents/ActivityCardList';
import ActivitiesTable from '@/components/featureComponents/ActivitiesTable';
import ActivitiesDetailsModal from '@/model/ActivitiesDetailsModal';

const Activity = () => {

  const [activityData, setActivityData] = useState();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [activityDetailsModalOpen, setActivityDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchtUserActivities = async () => {
      try {
        setIsLoading(true);
        const res = await getUserActivities();
        setActivityData(res.data);

      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchtUserActivities();
  }, [])

  const handleOpenDetails = () => {
  setActivityDetailsModalOpen(true);
};

const handleCloseDetails = () => {
  setActivityDetailsModalOpen(false);
};


  return (
    <Container>
      <Heading>
        <Title>Activity</Title>
        <Subtitle>Here you can create your activity.</Subtitle>
      </Heading>
      <Divider />
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Wrapper>
          <ActivityTopSection>
            <ViewSection>
              <ViewButton
                $active={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                List view
              </ViewButton>
              <ViewButton
                $active={viewMode === "card"}
                onClick={() => setViewMode("card")}
              >
                Card view
              </ViewButton>
            </ViewSection>
            <ButtonSection>
              <Button>Add New Activity</Button>
            </ButtonSection>
          </ActivityTopSection>
          {viewMode === "list" ? (
            <ActivitiesTable activities={activityData} />
          ) : (
            <ActivityCardList
              activities={activityData}
              onCardClick={handleOpenDetails}
            />
          )}

          <ActivitiesDetailsModal
            open={activityDetailsModalOpen}
            handleClose={handleCloseDetails}
          />
        </Wrapper>
      )}
    </Container>
  );
}

export default Activity