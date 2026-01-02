"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { TextField, Box, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getActivityById, updateActivity } from "@/services/activityService";
import { MessageModal } from "@/model/MessageModal";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";
import { activitySubCategoryConstants } from "@/constants/activitySubCategoryConstants";
import { activityCategoryConstants } from "@/constants/activityCategoryConstants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Reuse styled components from create page
const PageContainer = styled.div`
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: white;
  color: #143d60;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: #f5f5f5;
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #143d60;
  margin: 0;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #143d60;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, #143d60 0%, #a0c878 100%);
    border-radius: 2px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: linear-gradient(135deg, #143d60 0%, #2a5f87 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(20, 61, 96, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(20, 61, 96, 0.3);
      background: linear-gradient(135deg, #0c2b4e 0%, #143d60 100%);
    }
  `
      : `
    background: white;
    color: #143d60;
    border: 2px solid #e0e0e0;

    &:hover {
      background: #f5f5f5;
      border-color: #143d60;
    }
  `}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-left: 4px solid #e65100;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 24px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #e65100;
  margin: 0;
  line-height: 1.5;
`;

const EditActivityPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const activityId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    subType: "",
    quantity: "",
    unit: "",
    description: "",
    location: "",
  });
  const [activityDate, setActivityDate] = useState<Dayjs | null>(dayjs());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    description: "",
  });

  const userData = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (activityId) {
      loadActivity(activityId);
    }
  }, [activityId]);

  const loadActivity = async (activityId: string) => {
    try {
      setLoading(true);
      const activityByIdResponse = await getActivityById(activityId);
      setFormData({ ...activityByIdResponse.data });
      setActivityDate(dayjs(activityByIdResponse.data.activityDate));

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error loading activity:", error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset subType when category changes
      ...(name === "category" ? { subType: "" } : {}),
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subType) newErrors.subType = "Sub-type is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (Number(formData.quantity) <= 0)
      newErrors.quantity = "Quantity must be positive";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (formData.description && formData.description.length > 100) {
      newErrors.description = "Description cannot exceed 100 characters";
    }
    if (formData.location && formData.location.length > 50) {
      newErrors.location = "Location cannot exceed 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      console.log("Updating activity:", activityId, formData);
      await updateActivity(
        activityId,
        formData.category,
        formData.subType,
        formData.quantity,
        formData.unit,
        activityDate,
        formData.location,
        formData.description,
        userData?.id || "user-id-not-found"
      );

      // Success - show modal
      setModalMessage({
        title: "Activity Updated Successfully!",
        description:
          "Your activity has been updated successfully. You will be redirected to the activities page.",
      });

      setMessageModalOpen(true);

    } catch (error) {
      console.error("Error updating activity:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while updating your activity. Please try again.";
      setModalMessage({
        title: "Failed to Update Activity",
        description: errorMessage,
      });
      setMessageModalOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const filteredSubCategories = formData.category
    ? activitySubCategoryConstants.filter(
        (sub) => sub.category === formData.category
      )
    : [];

  if (loading) {
    return (
      <PageContainer>
        <LoadingBackdrop open={loading} message="Loading activity..." />
      </PageContainer>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer>
        <Header>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </BackButton>
          <Title>✏️ Edit Activity</Title>
        </Header>

        <FormCard>
          <InfoBox>
            <InfoText>
              📝 Update your activity details below. All fields marked with *
              are required.
            </InfoText>
          </InfoBox>

          <form onSubmit={handleSubmit}>
            {/* Activity Type Section */}
            <FormSection>
              <SectionTitle>Activity Type</SectionTitle>

              <FormRow>
                {/* Category Field */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    error={!!errors.category}
                    helperText={errors.category}
                    SelectProps={{
                      native: false,
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: "background.paper",
                            "& .MuiMenuItem-root": {
                              px: 2,
                              py: 1.5,
                              borderRadius: 1,
                              mx: 0.5,
                              "&:hover": { bgcolor: "#f0f7f4" },
                              "&.Mui-selected": {
                                bgcolor: "#e8f5e9",
                                "&:hover": { bgcolor: "#d0e8c5" },
                              },
                            },
                          },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#a0c878" },
                        "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select category</em>
                    </MenuItem>
                    {activityCategoryConstants.map((cat) => (
                      <MenuItem key={cat.code} value={cat.code}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Sub-Type Field */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    select
                    label="Sub-Type"
                    name="subType"
                    value={formData.subType}
                    onChange={handleChange}
                    required
                    disabled={!formData.category}
                    error={!!errors.subType}
                    helperText={
                      errors.subType ||
                      (!formData.category
                        ? "Please select a category first"
                        : "")
                    }
                    SelectProps={{
                      native: false,
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: "background.paper",
                            "& .MuiMenuItem-root": {
                              px: 2,
                              py: 1.5,
                              borderRadius: 1,
                              mx: 0.5,
                              "&:hover": { bgcolor: "#f0f7f4" },
                              "&.Mui-selected": {
                                bgcolor: "#e8f5e9",
                                "&:hover": { bgcolor: "#d0e8c5" },
                              },
                            },
                          },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#a0c878" },
                        "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select sub-type</em>
                    </MenuItem>
                    {filteredSubCategories.map((sub) => (
                      <MenuItem key={sub.code} value={sub.code}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </FormRow>
            </FormSection>

            {/* Measurement Details Section */}
            <FormSection>
              <SectionTitle>Measurement Details</SectionTitle>

              <FormRow>
                {/* Quantity Field */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                    placeholder="e.g., 15.5"
                    inputProps={{ step: "0.01", min: "0" }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#a0c878" },
                        "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                      },
                    }}
                  />
                </Box>

                {/* Unit Field */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    error={!!errors.unit}
                    helperText={errors.unit || "Max 15 characters"}
                    required
                    placeholder="e.g., km, kWh, kg"
                    inputProps={{ maxLength: 15 }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#a0c878" },
                        "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                      },
                    }}
                  />
                </Box>
              </FormRow>
            </FormSection>

            {/* Additional Information Section */}
            <FormSection>
              <SectionTitle>Additional Information</SectionTitle>

              <FormRow>
                {/* Activity Date Field */}
                <Box sx={{ flex: 1 }}>
                  <DatePicker
                    label="Activity Date"
                    value={activityDate}
                    onChange={(newValue) => setActivityDate(newValue)}
                    maxDate={dayjs()}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        sx: {
                          "& .MuiPickersOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#27667B",
                              borderRadius: 2,
                            },
                            "&:hover fieldset": { borderColor: "#a0c878" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#a0c878 !important",
                            },
                          },
                        },
                      },
                      actionBar: { actions: [] },
                      desktopPaper: {
                        sx: {
                          backgroundColor: "#ffffff",
                          "& .MuiPickersDay-root": {
                            backgroundColor: "#ffffff",
                            "&:hover": { backgroundColor: "#f0f7f4" },
                            "&.Mui-selected": {
                              backgroundColor: "#a0c878 !important",
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#7faf5c !important",
                              },
                            },
                          },
                        },
                      },
                      popper: {
                        sx: { "& .MuiPaper-root": { width: "100%" } },
                        placement: "bottom-start",
                        modifiers: [
                          { name: "flip", enabled: false },
                          {
                            name: "sameWidth",
                            enabled: true,
                            phase: "beforeWrite",
                            requires: ["computeStyles"],
                            fn: ({ state }) => {
                              state.styles.popper.width = `${state.rects.reference.width}px`;
                            },
                            effect: ({ state }) => {
                              const referenceWidth = (
                                state.elements.reference as HTMLElement
                              ).offsetWidth;
                              state.elements.popper.style.width = `${referenceWidth}px`;
                            },
                          },
                        ],
                      },
                    }}
                  />
                </Box>

                {/* Location Field */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    error={!!errors.location}
                    helperText={errors.location || "Max 50 characters"}
                    placeholder="e.g., Bengaluru, KA"
                    inputProps={{ maxLength: 50 }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#a0c878" },
                        "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                      },
                    }}
                  />
                </Box>
              </FormRow>

              {/* Description Field */}
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add any notes about this activity..."
                  inputProps={{ maxLength: 100 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover fieldset": { borderColor: "#a0c878" },
                      "&.Mui-focused fieldset": { borderColor: "#a0c878" },
                    },
                  }}
                />
              </Box>
            </FormSection>

            {/* Buttons */}
            <ButtonGroup>
              <Button type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" $variant="primary" disabled={loading}>
                <SaveIcon />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>

        <MessageModal
          open={messageModalOpen}
          handleClose={() => {
            setMessageModalOpen(false);
            if (modalMessage.title === "Activity Updated Successfully!") {
              router.push("/activity");
            }
          }}
          title={modalMessage.title}
          description={modalMessage.description}
        />

        <LoadingBackdrop open={saving} message="Saving changes..." />
      </PageContainer>
    </LocalizationProvider>
  );
};

export default EditActivityPage;
