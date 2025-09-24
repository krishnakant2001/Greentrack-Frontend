"use client";
import React, { useEffect, useState } from "react";
import {
  ButtonSection,
  Container,
  DangerButton,
  DangerDescription,
  DangerTitle,
  FormSection,
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
import { validateCurrentPassword, validateNewPswd, validatePswd } from "@/utils/validations";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2OGQwYzEyNzE0ZjRjZDBjMmZiYmJiOGQiLCJlbWFpbCI6InByYXRoYW1AZ21haWwuY29tIiwiaWF0IjoxNzU4NjM1MTI1LCJleHAiOjE3NjEyMjcxMjV9._-aqrjwq6qpxLpDFcmDetyrwJjE1hSPkT3ZgX6cQ453--42gi4Fh_e5KygBOuDaQ";

  const [fields, setFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    region: "",
    currentPswd: "",
    newPswd: "",
    confirmPswd: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [regionError, setRegionError] = useState("");
  const [currentPswdError, setCurrentPswdError] = useState("");
  const [newPswdError, setNewPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        setFields({
          email: res.data.email || "",
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          region: res.data.region || "",
          currentPswd: "",
          newPswd: "",
          confirmPswd: "",
        });
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [refreshKey]);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const checkUpdatedFormAndPasswordValidation = () => {

    if (!fields.firstName) {
      setFirstNameError("Please enter your first name.");
      return false;
    }
    if (!fields.region) {
      setRegionError("Please select a region.");
      return false;
    }

    // Current Password is empty
    if(!fields.currentPswd){
      if(fields.newPswd || fields.confirmPswd){
        setCurrentPswdError("Please provide the current password");
        return false;
      }
    }

    // Current password is non empty
    if(fields.currentPswd){
      if(!validateCurrentPassword(fields.currentPswd)){
        setCurrentPswdError("Current Password must have at least 6 characters");
        return false;
      }
      else if(!fields.newPswd) {
        setNewPswdError("Please provide new password");
        return false;
      }
      else if(fields.newPswd && !validateNewPswd(fields.newPswd)) {
        setNewPswdError("Password must have at least 6 characters");
        return false;
      }
      else if(fields.newPswd === fields.currentPswd) {
        setNewPswdError("Your new password is matching with your current password");
        return false;
      }
      else if(fields.newPswd !== fields.confirmPswd) {
        setConfirmPswdError("Passwords do not match.");
        return false;
      }
    }

    if (!fields.currentPswd && !fields.newPswd && !fields.confirmPswd) {
      setCurrentPswdError("");
      setNewPswdError("");
      setConfirmPswdError("");
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting...");
    event.preventDefault();


    if (checkUpdatedFormAndPasswordValidation()) {
      console.log("Email:", fields.email);
      console.log("First Name:", fields.firstName);
      console.log("Last Name:", fields.lastName);
      console.log("Region:", fields.region);
      console.log("Current Password:", fields.currentPswd);
      console.log("New Password:", fields.newPswd);
      console.log("Confirm Password:", fields.confirmPswd);
    }
  };

  const handleCancelButton = () => {
    setRefreshKey((prev) => prev + 1);
    setIsEditing(!isEditing);
    setCurrentPswdError("");
    setNewPswdError("");
    setConfirmPswdError("");
  };

  if (loading) return <div>Loading...</div>;
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
        <FormSection onSubmit={handleSubmit} noValidate>
          <ButtonSection>
            {isEditing ? (
              <>
                <Button variant="outlined" onClick={handleCancelButton}>
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
                value={fields.email}
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
                value={fields.lastName}
                onChange={isEditing ? handleLastNameChange : undefined}
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
                onChange={isEditing ? handleRegionChange : undefined}
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
                onChange={isEditing ? handleCurrentPswdChange : undefined}
                error={currentPswdError}
              />
              <PasswordField
                id="new-password"
                label="New Password"
                value={fields.newPswd}
                onChange={isEditing ? handleNewPswdChange : undefined}
                error={newPswdError}
              />
              <PasswordField
                id="confirm-password"
                label="Confirm Password"
                value={fields.confirmPswd}
                onChange={isEditing ? handleConfirmPswdChange : undefined}
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
        </FormSection>
      </Wrapper>
    </Container>
  );
};

export default UserDetails;
