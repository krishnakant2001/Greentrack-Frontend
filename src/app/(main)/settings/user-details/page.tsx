"use client";
import React, { useState } from "react";
import {
  ButtonSection,
  Container,
  DangerButton,
  DangerDescription,
  DangerTitle,
  Heading,
  LeftSection,
  RightSection,
  Section,
  Subtitle,
  Title,
  Wrapper,
} from "../../main.styles";
import { Button, Divider, SelectChangeEvent, TextField } from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { validatePswd } from "@/utils/validations";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const email = "krishnakant@gmail.com";

  const [fields, setFields] = useState({
    firstName: "Krishnakant",
    lastName: "Nagvanshi",
    region: "IN",
    currentPswd: "",
    newPswd: "",
    confirmPswd: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [regionError, setRegionError] = useState("");
  const [currentPswdError, setCurrentPswdError] = useState("");
  const [newPswdError, setNewPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, firstName: event.target.value });
    if (event.target.value !== "") {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, lastName: event.target.value });
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const selectedRegion = event.target.value;
    setFields({ ...fields, region: selectedRegion });
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
  };

  const handleCurrentPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, currentPswd: event.target.value });
    if (validatePswd(event.target.value)) {
      setCurrentPswdError("");
    }
  };

  const handleCurrentPswdBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!validatePswd(event.target.value)) {
      setCurrentPswdError("Password must have 6 characters.");
    }
  };

  const handleNewPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, newPswd: event.target.value });
    if (validatePswd(event.target.value)) {
      setNewPswdError("");
    }
    if (fields.confirmPswd === event.target.value) {
      setConfirmPswdError("");
    }
  };

  const handleConfirmPswdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, confirmPswd: event.target.value });
    if (event.target.value === fields.newPswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };
  return (
    <Container>
      <Heading>
        <Title>User Details</Title>
        <Subtitle>
          Manage your personal information and account settings.
        </Subtitle>
      </Heading>
      <Divider />
      <Wrapper>
        <ButtonSection>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(!isEditing)}>
              <EditIcon fontSize="small" />
              Edit Profile
            </Button>
          )}
        </ButtonSection>
        <Section>
          <LeftSection>Email Address</LeftSection>
          <RightSection>
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              type="Email"
              variant="outlined"
              value={email}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Full Name</LeftSection>
          <RightSection>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              value={fields.firstName}
              onChange={isEditing ? handleFirstNameChange : undefined}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={"Nagvanshi"}
              onChange={handleLastNameChange}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Region Settings</LeftSection>
          <RightSection>
            <InputSelectField
              required
              id="region"
              label="Region"
              fullWidth
              value={fields.region}
              onChange={handleRegionChange}
              error={regionError}
              options={regionData}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Password Management</LeftSection>
          <RightSection>
            <PasswordField
              id="current-password"
              label="Current Password"
              value={fields.currentPswd}
              onChange={handleCurrentPswdChange}
              error={currentPswdError}
              onBlur={handleCurrentPswdBlur}
            />
            <PasswordField
              id="new-password"
              label="New Password"
              value={fields.newPswd}
              onChange={handleNewPswdChange}
              error={newPswdError}
            />
            <PasswordField
              id="confirm-password"
              label="Confirm Password"
              value={fields.confirmPswd}
              onChange={handleConfirmPswdChange}
              error={confirmPswdError}
            />
          </RightSection>
        </Section>
        {!isEditing && (
          <>
            <Divider />
            <Section>
              <LeftSection>Danger Zone</LeftSection>
              <RightSection>
                <DangerTitle>Delete Account</DangerTitle>
                <DangerDescription>
                  Once you delete your account, there is no going back. Please
                  be certain. All your data, settings, and progress will be
                  permanently removed.
                </DangerDescription>
                <DangerButton startIcon={<DeleteIcon />}>
                  Delete My Account
                </DangerButton>
              </RightSection>
            </Section>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default UserDetails;
