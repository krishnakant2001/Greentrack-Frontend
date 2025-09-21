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
import { Button, Divider, TextField } from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const email = "krishnakant@gmail.com";
  const [firstName, setFirstName] = useState("Krishnakant");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
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
              value={firstName}
              onChange={isEditing ? handleFirstNameChange : undefined}
              // disabled={!isEditing}
              // error={!!firstNameError}
              // helperText={firstNameError}
            />
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={"Nagvanshi"}
              // onChange={handleLastNameChange}
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
              value={"India"}
              // onChange={handleRegionChange}
              // error={regionError}
              options={regionData}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Password Management</LeftSection>
          <RightSection>
            <PasswordField
              id="old-password"
              label="Old Password"
              // value={fields.pswd}
              // onChange={handlePswdChange}
              // error={pswdError}
            />
            <PasswordField
              id="new-password"
              label="New Password"
              // value={fields.pswd}
              // onChange={handlePswdChange}
              // error={pswdError}
            />
            <PasswordField
              id="confirm-password"
              label="Confirm Password"
              // value={fields.confirmPswd}
              // onChange={handleConfirmPswdChange}
              // error={confirmPswdError}
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
