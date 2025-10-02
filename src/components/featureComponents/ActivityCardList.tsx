"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ActivityCard from "./ActivityCard";
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

interface ActivitiesListProps {
  activities: Activity[];
}

const ActivityCardContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`

const ActivityCardList = ({ activities }: ActivitiesListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    activityId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedActivity(activityId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedActivity(null);
  };

  const handleDetails = () => {
    console.log("Details", selectedActivity);
    handleMenuClose();
  };

  const handleEdit = () => {
    console.log("Edit", selectedActivity);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete", selectedActivity);
    handleMenuClose();
  };


  return (
    <ActivityCardContainer>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onMenuClick={(e) => handleMenuOpen(e, activity.id)}
        />
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: 10, horizontal: 100 }}
      >
        <MenuItem onClick={handleDetails}>View Details</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "#c50000" }}>
          Delete
        </MenuItem>
      </Menu>
    </ActivityCardContainer>
  );
}

export default ActivityCardList;
