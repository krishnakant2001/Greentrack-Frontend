"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { createGoal } from "@/services/goalService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MessageModal } from "@/model/MessageModal";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";
import { goalPeriodsConstants, goalTypesConstants } from "@/constants/goalConstants";
import { activityCategoryConstants } from "@/constants/activityCategoryConstants";
import WorkInProgress from "@/components/reusableComponents/WorkInProgress";

// Styled Components (reuse from activity create)
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #143d60;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Required = styled.span`
  color: #d32f2f;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #a0c878;
    box-shadow: 0 0 0 3px rgba(160, 200, 120, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #a0c878;
    box-shadow: 0 0 0 3px rgba(160, 200, 120, 0.1);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #a0c878;
    box-shadow: 0 0 0 3px rgba(160, 200, 120, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const HelpText = styled.span`
  font-size: 12px;
  color: #666;
  font-style: italic;
`;

const ErrorText = styled.span`
  font-size: 13px;
  color: #d32f2f;
  margin-top: 4px;
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
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #1565c0;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 24px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #1565c0;
  margin: 0;
  line-height: 1.5;
`;

const CreateGoalPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    description: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    goalType: "",
    targetCategory: "",
    targetValue: "",
    goalPeriod: "",
    title: "",
    description: "",
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "month"));

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Goal title is required";
    }

    if (!formData.goalType) {
      newErrors.goalType = "Goal type is required";
    }

    if (!formData.targetValue || parseFloat(formData.targetValue) <= 0) {
      newErrors.targetValue = "Target value must be greater than 0";
    }

    if (!formData.goalPeriod) {
      newErrors.goalPeriod = "Goal period is required";
    }

    // Category is required only for CATEGORY_REDUCTION type
    if (
      formData.goalType === "CATEGORY_REDUCTION" &&
      !formData.targetCategory
    ) {
      newErrors.targetCategory =
        "Target category is required for category reduction goals";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      newErrors.endDate = "End date is required";
    }

    if (startDate && endDate && endDate.isBefore(startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await createGoal(
        formData.goalType,
        formData.targetCategory,
        formData.targetValue,
        formData.goalPeriod,
        startDate,
        endDate,
        formData.title,
        formData.description
      );

      // Show success message and navigate back
      setModalMessage({
        title: "Goal Created Successfully!",
        description:
          "Your goal has been created successfully. You will be redirected to the goals page.",
      });
      setMessageModalOpen(true);
    } catch (error) {
      console.error("Error creating goal:", error);
      setModalMessage({
        title: "Failed to Create Goal",
        description:
          "An error occurred while creating your goal. Please try again.",
      });
      setMessageModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Check if category field should be shown
  const showCategoryField = formData.goalType === "CATEGORY_REDUCTION";

  const flag = true;
  if (flag) {
    return (
      <WorkInProgress
        title="Create Goal - Work In Progress"
        message="We're working on exciting new features to enhance your goal creation experience. Stay tuned!"
        icon="rocket"
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer>
        <Header>
          <BackButton onClick={handleCancel}>
            <ArrowBackIcon />
          </BackButton>
          <Title>🎯 Create New Goal</Title>
        </Header>

        <FormCard>
          <InfoBox>
            <InfoText>
              Set a sustainability goal to track your progress. Choose your goal
              type, target value, and timeframe to get started.
            </InfoText>
          </InfoBox>

          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Goal Information</SectionTitle>

              <FormGroup style={{ marginBottom: "20px" }}>
                <Label>
                  Goal Title <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Reduce carbon emissions by 20%"
                />
                {errors.title && <ErrorText>{errors.title}</ErrorText>}
                <HelpText>
                  Give your goal a clear and descriptive title
                </HelpText>
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>
                    Goal Type <Required>*</Required>
                  </Label>
                  <Select
                    name="goalType"
                    value={formData.goalType}
                    onChange={handleChange}
                  >
                    <option value="">Select goal type</option>
                    {goalTypesConstants.map((type) => (
                      <option key={type.code} value={type.code}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                  {errors.goalType && <ErrorText>{errors.goalType}</ErrorText>}
                </FormGroup>

                {showCategoryField && (
                  <FormGroup>
                    <Label>
                      Target Category <Required>*</Required>
                    </Label>
                    <Select
                      name="targetCategory"
                      value={formData.targetCategory}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      {activityCategoryConstants.map((cat) => (
                        <option key={cat.code} value={cat.code}>
                          {cat.name}
                        </option>
                      ))}
                    </Select>
                    {errors.targetCategory && (
                      <ErrorText>{errors.targetCategory}</ErrorText>
                    )}
                  </FormGroup>
                )}
              </FormRow>

              <FormGroup style={{ marginBottom: "20px" }}>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your goal and how you plan to achieve it..."
                />
                <HelpText>
                  Optional: Add details about your goal and your strategy
                </HelpText>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Target & Timeline</SectionTitle>

              <FormRow>
                <FormGroup>
                  <Label>
                    Target Value <Required>*</Required>
                  </Label>
                  <Input
                    type="number"
                    name="targetValue"
                    value={formData.targetValue}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    step="0.01"
                    min="0"
                  />
                  {errors.targetValue && (
                    <ErrorText>{errors.targetValue}</ErrorText>
                  )}
                  <HelpText>Target value in kg CO₂e</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>
                    Goal Period <Required>*</Required>
                  </Label>
                  <Select
                    name="goalPeriod"
                    value={formData.goalPeriod}
                    onChange={handleChange}
                  >
                    <option value="">Select period</option>
                    {goalPeriodsConstants.map((period) => (
                      <option key={period.code} value={period.code}>
                        {period.name}
                      </option>
                    ))}
                  </Select>
                  {errors.goalPeriod && (
                    <ErrorText>{errors.goalPeriod}</ErrorText>
                  )}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>
                    Start Date <Required>*</Required>
                  </Label>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (errors.startDate) {
                        setErrors((prev) => ({ ...prev, startDate: "" }));
                      }
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                      },
                    }}
                  />
                  {errors.startDate && (
                    <ErrorText>{errors.startDate}</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    End Date <Required>*</Required>
                  </Label>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      if (errors.endDate) {
                        setErrors((prev) => ({ ...prev, endDate: "" }));
                      }
                    }}
                    minDate={startDate || undefined}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.endDate,
                      },
                    }}
                  />
                  {errors.endDate && <ErrorText>{errors.endDate}</ErrorText>}
                </FormGroup>
              </FormRow>
            </FormSection>

            <ButtonGroup>
              <Button type="button" $variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" $variant="primary" disabled={loading}>
                <SaveIcon />
                {loading ? "Creating..." : "Create Goal"}
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>

        <MessageModal
          open={messageModalOpen}
          handleClose={() => {
            setMessageModalOpen(false);
            if (modalMessage.title === "Goal Created Successfully!") {
              router.push("/goals");
            }
          }}
          title={modalMessage.title}
          description={modalMessage.description}
        />

        <LoadingBackdrop open={loading} message="Creating goal..." />
      </PageContainer>
    </LocalizationProvider>
  );
};

export default CreateGoalPage;
