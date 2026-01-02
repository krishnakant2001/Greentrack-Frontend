"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { regionDataConstants } from "@/constants/regionDataConstants";

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #143d60 0%, #1a5a7d 50%, #a0c878 100%);
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #a0c878;

  svg {
    color: #143d60;
    font-size: 1.5rem;
  }

  h2 {
    color: #143d60;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormField = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) => {
    if (props.variant === "danger") {
      return `
        background: #dc3545;
        color: white;
        &:hover {
          background: #c82333;
          transform: translateY(-2px);
        }
      `;
    } else if (props.variant === "secondary") {
      return `
        background: white;
        color: #143d60;
        border: 1px solid #143d60;
        &:hover {
          background: #f8f9fa;
        }
      `;
    } else {
      return `
        background: linear-gradient(135deg, #143d60 0%, #1a5a7d 100%);
        color: white;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(20, 61, 96, 0.3);
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

const DangerZone = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
`;

const DangerZoneTitle = styled.h3`
  color: #c53030;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DangerZoneDescription = styled.p`
  color: #742a2a;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const InfoText = styled(Typography)`
  && {
    color: #143d60;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: #e8f4f8;
    border-radius: 6px;
    border-left: 4px solid #a0c878;
  }
`;

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

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

  const router = useRouter();

  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserProfileDetails(jwtToken);

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
        setSnackbarMessage("Failed to load user details");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [refreshKey, jwtToken]);

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

  const handleRegionChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const selectedRegion = event.target.value;
    setFields({ ...fields, region: selectedRegion });
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
  };

  const handleCurrentPswdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleConfirmPswdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, confirmPswd: event.target.value });
    if (event.target.value === fields.newPswd) {
      setConfirmPswdError("");
    } else {
      setConfirmPswdError("Passwords do not match.");
    }
  };

  const handleDecision = async (action: "confirm" | "cancel") => {
    setDecisionModalOpen(false);
    if (action === "confirm") {
      console.log("User confirmed account deletion");
      setIsLoading(true);
      try {
        const deleteUserProfileResponse = await deleteUserProfile(jwtToken);
        setSnackbarMessage(
          deleteUserProfileResponse.data || "Account deleted successfully"
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

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
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
          jwtToken,
          fields.currentPswd,
          fields.newPswd
        );

        console.log(
          "User Profile Updated response:",
          updateUserProfileResponse
        );
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setIsEditing(false);
        setRefreshKey((prev) => prev + 1);
      } catch (error) {
        let errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        if (errorMessage.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (errorMessage.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error(errorMessage);
      } finally {
        setIsLoading(false);
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

  if (isLoading)
    return (
      <PageContainer>
        <FormCard>
          <Typography>Loading...</Typography>
        </FormCard>
      </PageContainer>
    );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>User Settings</PageTitle>
        <PageSubtitle>
          Manage your personal information and account preferences
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        <form onSubmit={handleSubmit} noValidate>
          {/* Profile Section */}
          <SectionTitle>
            <PersonIcon />
            <h2>Profile Information</h2>
          </SectionTitle>

          <FormRow>
            <FormField>
              <TextField
                fullWidth
                required
                id="email"
                label="Email Address"
                type="email"
                variant="outlined"
                value={fields.email}
                disabled
                helperText="Email address cannot be changed"
              />
            </FormField>
          </FormRow>

          <FormRow>
            <FormField>
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
                disabled={!isEditing}
              />
            </FormField>
            <FormField>
              <TextField
                fullWidth
                id="last-name"
                label="Last Name"
                variant="outlined"
                value={fields.lastName}
                onChange={isEditing ? handleLastNameChange : undefined}
                onClick={handleTextFieldClick}
                disabled={!isEditing}
              />
            </FormField>
          </FormRow>

          <FormRow>
            <FormField>
              <TextField
                select
                required
                fullWidth
                id="region"
                label="Region"
                value={fields.region}
                onChange={isEditing ? handleRegionChange : undefined}
                onClick={handleTextFieldClick}
                error={!!regionError}
                helperText={regionError}
                disabled={!isEditing}
              >
                {regionDataConstants.map((option) => (
                  <MenuItem key={option.code} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormField>
          </FormRow>

          {/* Password Section */}
          {isEditing && (
            <>
              <SectionTitle style={{ marginTop: "2rem" }}>
                <LockIcon />
                <h2>Password Management</h2>
              </SectionTitle>

              <InfoText>
                Note: If you don&apos;t want to update your password, leave the
                password fields empty.
              </InfoText>

              <FormRow>
                <FormField>
                  <PasswordField
                    id="current-password"
                    label="Current Password"
                    value={fields.currentPswd}
                    onChange={handleCurrentPswdChange}
                    error={currentPswdError}
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField>
                  <PasswordField
                    id="new-password"
                    label="New Password"
                    value={fields.newPswd}
                    onChange={handleNewPswdChange}
                    error={newPswdError}
                  />
                </FormField>
                <FormField>
                  <PasswordField
                    id="confirm-password"
                    label="Confirm Password"
                    value={fields.confirmPswd}
                    onChange={handleConfirmPswdChange}
                    error={confirmPswdError}
                  />
                </FormField>
              </FormRow>
            </>
          )}

          {/* Action Buttons */}
          <ButtonGroup>
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  onClick={handleCancelButton}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                type="button"
              >
                <EditIcon fontSize="small" />
                Edit Profile
              </Button>
            )}
          </ButtonGroup>
        </form>

        {/* Danger Zone */}
        {!isEditing && (
          <DangerZone>
            <DangerZoneTitle>
              <DeleteIcon />
              Delete Account
            </DangerZoneTitle>
            <DangerZoneDescription>
              Once you delete your account, there is no going back. Please be
              certain. All your data, settings, and progress will be permanently
              removed.
            </DangerZoneDescription>
            <Button variant="danger" onClick={() => setDecisionModalOpen(true)}>
              <DeleteIcon fontSize="small" />
              Delete My Account
            </Button>
          </DangerZone>
        )}
      </FormCard>

      {/* Modals */}
      <DecisionModal
        open={decisionModalOpen}
        handleClose={handleDecision}
        title="Delete Your Account?"
        description="This action is irreversible. All your data, settings, and progress will be permanently removed. Please confirm that you want to proceed with deleting your account."
        variant="danger"
      />

      <MessageModal
        open={messageModalOpen}
        handleClose={() => setMessageModalOpen(false)}
        title="Profile Editing Disabled"
        description="Your profile fields are currently locked. Click on 'Edit Profile' button to enable editing"
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default UserDetails;
