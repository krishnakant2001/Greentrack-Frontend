"use client";
import React from 'react'
import { ButtonSection, Container, Heading, Subtitle, Title, Wrapper } from '../main.styles'
import { Button, Divider } from '@mui/material'
import ActivitiesTable from "@/components/featureComponents/ActivitiesTable";

const activityJson = [
  {
    id: "act_64f2a7b5c8e4ab1234567890",
    userId: "usr_89ab12cd34ef56gh78ij90kl",
    category: "TRANSPORTATION",
    subType: "CAR_TRAVEL",
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
    subType: "ELECTRICITY_USAGE",
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
    category: "WASTE",
    subType: "PLASTIC_DISPOSAL",
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
];

const Activity = () => {
  return (
    <Container>
      <Heading>
        <Title>Activity</Title>
        <Subtitle>Here you can create your activity.</Subtitle>
      </Heading>
      <Divider />
      <Wrapper>
        <ButtonSection>
          <Button>Add New Activity</Button>
        </ButtonSection>
        <ActivitiesTable activities={activityJson} />
      </Wrapper>
    </Container>
  );
}

export default Activity