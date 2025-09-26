"use client";
import React, { useEffect, useState } from "react";
import {
  ButtonSection,
  Container,
  DangerButton,
  DangerDescription,
  DangerTitle,
  DividerWithMargin,
  FormSection,
  Heading,
  LeftSection,
  RightSection,
  Section,
  Subtitle,
  Title,
  Wrapper,
} from "../../main.styles";
import {
  Alert,
  Button,
  Divider,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  validateCurrentPassword,
  validateNewPswd,
  validatePswd,
} from "@/utils/validations";
import {
  deleteUserProfile,
  getUserProfileDetails,
  updateUserProfileDetails,
} from "@/services/userDetailsService";
import { DecisionModal } from "@/model/DecisionModal";
import { MessageModal } from "@/model/MessageModal";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [emailFieldFocus, setEmailFieldFocus] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserProfileDetails();

        setFields({
          email: res.data?.email || "",
          firstName: res.data?.firstName || "",
          lastName: res.data?.lastName || "",
          region: res.data?.region || "",
          currentPswd: "",
          newPswd: "",
          confirmPswd: "",
        });
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [refreshKey]);

  const handleTextFieldClick = () => {
    if (!isEditing) {
      setMessageModalOpen(true);
    }
  };
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

  const handleDecision = async (action: "delete" | "cancel") => {
    setDecisionModalOpen(false);
    if (action === "delete") {
      console.log("User confirmed account deletion");
      setIsLoading(true);
      try {
        const deleteUserProfileResponse = await deleteUserProfile();
        setDeleteMessage(deleteUserProfileResponse.data);

        setTimeout(() => {
          router.push("/");
        }, 2000);
        
      } catch (error) {
        let errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        if (errorMessage.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (errorMessage.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        console.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
      
    } else {
      console.log("User cancelled deletion");
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
    if (!fields.currentPswd) {
      if (fields.newPswd || fields.confirmPswd) {
        setCurrentPswdError("Please provide the current password");
        return false;
      }
    }

    // Current password is non empty
    if (fields.currentPswd) {
      if (!validateCurrentPassword(fields.currentPswd)) {
        setCurrentPswdError("Current Password must have at least 6 characters");
        return false;
      } else if (!fields.newPswd) {
        setNewPswdError("Please provide new password");
        return false;
      } else if (fields.newPswd && !validateNewPswd(fields.newPswd)) {
        setNewPswdError("Password must have at least 6 characters");
        return false;
      } else if (fields.newPswd === fields.currentPswd) {
        setNewPswdError(
          "Your new password is matching with your current password"
        );
        return false;
      } else if (fields.newPswd !== fields.confirmPswd) {
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
      setIsLoading(true);
      try {
        const updateUserProfileResponse = await updateUserProfileDetails(
          fields.firstName,
          fields.lastName,
          fields.region,
          fields.currentPswd,
          fields.newPswd
        );

        console.log(
          "User Profile Updated response:",
          updateUserProfileResponse
        );
      } catch (error) {
        let errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        if (errorMessage.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (errorMessage.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        console.error(errorMessage);
      } finally {
        // Stop Loading
        setIsLoading(false);
        setIsEditing(!isEditing);
        setRefreshKey((prev) => prev + 1);
      }
    }
  };

  const handleCancelButton = () => {
    setRefreshKey((prev) => prev + 1);
    setIsEditing(!isEditing);
    setCurrentPswdError("");
    setNewPswdError("");
    setConfirmPswdError("");
  };

  if (isLoading) return <div>Loading...</div>;
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
        {deleteMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {deleteMessage}
          </Alert>
        )}
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
                onFocus={() => setEmailFieldFocus(true)}
                onBlur={() => setEmailFieldFocus(false)}
                helperText={
                  emailFieldFocus
                    ? "You are not allowed to change your email address."
                    : ""
                }
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
                onClick={handleTextFieldClick}
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
                onClick={handleTextFieldClick}
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
                onClick={handleTextFieldClick}
                error={regionError}
                options={regionData}
              />
            </RightSection>
          </Section>
          <Section>
            <LeftSection>Password Management </LeftSection>
            <RightSection>
              <Typography variant="body2" color="#143D60">
                Note: If you don&apos;t want to update your password, leave the
                password fields empty.
              </Typography>
              <PasswordField
                id="current-password"
                label="Current Password"
                value={fields.currentPswd}
                onChange={isEditing ? handleCurrentPswdChange : undefined}
                onClick={handleTextFieldClick}
                error={currentPswdError}
              />
              <PasswordField
                id="new-password"
                label="New Password"
                value={fields.newPswd}
                onChange={isEditing ? handleNewPswdChange : undefined}
                onClick={handleTextFieldClick}
                error={newPswdError}
              />
              <PasswordField
                id="confirm-password"
                label="Confirm Password"
                value={fields.confirmPswd}
                onChange={isEditing ? handleConfirmPswdChange : undefined}
                onClick={handleTextFieldClick}
                error={confirmPswdError}
              />
            </RightSection>
          </Section>
          {!isEditing && (
            <>
              <DividerWithMargin />
              <Section>
                <LeftSection>Danger Zone</LeftSection>
                <RightSection>
                  <DangerTitle>Delete Account</DangerTitle>
                  <DangerDescription>
                    Once you delete your account, there is no going back. Please
                    be certain. All your data, settings, and progress will be
                    permanently removed.
                  </DangerDescription>
                  <DangerButton
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setDecisionModalOpen(true);
                    }}
                  >
                    Delete My Account
                  </DangerButton>
                  <DecisionModal
                    open={decisionModalOpen}
                    handleClose={handleDecision}
                    title="Are you sure you want to delete your account?"
                    description="This action is irreversible. All your data, settings, and progress will be permanently removed. Please confirm that you want to proceed with deleting your account."
                  />
                </RightSection>
              </Section>
            </>
          )}
          <MessageModal
            open={messageModalOpen}
            handleClose={() => setMessageModalOpen(false)}
            title="Profile Editing Disabled"
            description="Your profile fields are currently locked. Click on 'Edit Profile' button to enable editing"
          />
        </FormSection>
      </Wrapper>
    </Container>
  );
};

export default UserDetails;
