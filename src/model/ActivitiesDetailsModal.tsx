"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
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

const ActivityData = {
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
};

const ActivityDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.div``;
const Info = styled.div``;

const ActivitiesDetails = (activity: Activity) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };
  return (
    <ActivityDetails>
      <Section>
        <Label>Activity Category</Label>
        <Info>{activity.category}</Info>
      </Section>
      <Section>
        <Label>Activity Sub-Category</Label>
        <Info>{activity.subType}</Info>
      </Section>
      <Section>
        <Label>Quantity</Label>
        <Info>{`${activity.quantity} ${activity.unit}`}</Info>
      </Section>
      <Section>
        <Label>Activity Date</Label>
        <Info>{formatDate(activity.activityDate) || "-"}</Info>
      </Section>
      <Section>
        <Label>Activity Description</Label>
        <Info>{activity.category || "-"}</Info>
      </Section>
      <Section>
        <Label>Activity location</Label>
        <Info>{activity.location || "No location"}</Info>
      </Section>
      <Section>
        <Label>Last updated date</Label>
        <Info>{activity.updatedAt}</Info>
      </Section>
    </ActivityDetails>
  );
};
const ActivitiesDetailsModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title"> Activity Details </DialogTitle>{" "}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ActivitiesDetails {...ActivityData} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose()}>
          Edit
        </Button>
        <Button variant="contained" onClick={() => handleClose()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivitiesDetailsModal;
