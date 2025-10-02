"use client";
import React, { useEffect, useState } from 'react'
import { ActivityTopSection, ButtonSection, Container, Heading, Subtitle, Title, ViewButton, ViewSection, Wrapper } from '../main.styles'
import { Button, Divider } from '@mui/material'
import { getUserActivities } from '@/services/activityService';
import ActivityCardList from '@/components/featureComponents/ActivityCardList';
import ActivitiesTable from '@/components/featureComponents/ActivitiesTable';

const activityJson = [
  {
    id: "act_64f2a7b5c8e4ab1234567890",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "Transporation",
    subType: "Car Travel",
    quantity: 120.5,
    unit: "km",
    co2eEmissions: 28.75,
    emissionFactorRef: "EF-2025-TR-CAR",
    description: "Business trip to client office",
    activityDate: "2025-09-25T10:30:00",
    location: "New Delhi, India",
    createdAt: "2025-09-25T11:00:00",
    updatedAt: "2025-09-26T09:15:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567891",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "ENERGY",
    subType: "Electricity Usage",
    quantity: 350,
    unit: "kWh",
    co2eEmissions: 180.25,
    emissionFactorRef: "EF-2025-EN-ELC",
    description: "Monthly home electricity usage",
    activityDate: "2025-09-10T09:00:00",
    location: "Mumbai, India",
    createdAt: "2025-09-10T09:05:00",
    updatedAt: "2025-09-10T09:15:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567892",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "Waste",
    subType: "Plastic Disposal",
    quantity: 15,
    unit: "kg",
    co2eEmissions: 12.4,
    emissionFactorRef: "EF-2025-WS-PLS",
    description: "Disposed plastic waste",
    activityDate: "2025-09-18T15:20:00",
    location: "Bangalore, India",
    createdAt: "2025-09-18T15:25:00",
    updatedAt: "2025-09-18T16:00:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567893",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "Transporation",
    subType: "Bus Travel",
    quantity: 50,
    unit: "km",
    co2eEmissions: 5.2,
    emissionFactorRef: "EF-2025-TR-BUS",
    description: "Commute to office",
    activityDate: "2025-09-20T08:00:00",
    location: "Chennai, India",
    createdAt: "2025-09-20T08:05:00",
    updatedAt: "2025-09-20T08:15:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567894",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "ENERGY",
    subType: "Gas Usage",
    quantity: 120,
    unit: "m³",
    co2eEmissions: 95.6,
    emissionFactorRef: "EF-2025-EN-GAS",
    description: "Monthly gas consumption for cooking",
    activityDate: "2025-09-12T07:30:00",
    location: "Hyderabad, India",
    createdAt: "2025-09-12T07:35:00",
    updatedAt: "2025-09-12T08:00:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567895",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "Waste",
    subType: "Paper Recycling",
    quantity: 8,
    unit: "kg",
    co2eEmissions: 2.5,
    emissionFactorRef: "EF-2025-WS-PAP",
    description: "Recycled old documents",
    activityDate: "2025-09-15T11:00:00",
    location: "Pune, India",
    createdAt: "2025-09-15T11:05:00",
    updatedAt: "2025-09-15T11:15:00",
  },
  {
    id: "act_64f2a7b5c8e4ab1234567896",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "Transportation",
    subType: "Train Travel",
    quantity: 300,
    unit: "km",
    co2eEmissions: 15.8,
    emissionFactorRef: "EF-2025-TR-TRAIN",
    description: "Business trip by train",
    activityDate: "2025-09-22T06:30:00",
    location: "Kolkata, India",
    createdAt: "2025-09-22T06:35:00",
    updatedAt: "2025-09-22T07:00:00",
  }
];


const Activity = () => {

  const [activityData, setActivityData] = useState(activityJson);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  
  useEffect(() => {
    const fetchtUserActivities = async () => {
      try {
        const res = await getUserActivities();
        setActivityData(res);

      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchtUserActivities();
  }, [])


  return (
    <Container>
      <Heading>
        <Title>Activity</Title>
        <Subtitle>Here you can create your activity.</Subtitle>
      </Heading>
      <Divider />
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
        <ActivityCardList activities={activityData} />
      )}
      </Wrapper>
    </Container>
  );
}

export default Activity