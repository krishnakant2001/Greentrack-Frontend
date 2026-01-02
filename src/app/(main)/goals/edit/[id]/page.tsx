"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MessageModal } from "@/model/MessageModal";
import LoadingBackdrop from "@/components/auth/LoadingBackdrop";
import { goalPeriodsConstants, goalTypesConstants } from "@/constants/goalConstants";
import { activityCategoryConstants } from "@/constants/activityCategoryConstants";
import WorkInProgress from "@/components/reusableComponents/WorkInProgress";

// Reuse styled components
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

const EditGoalPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const goalId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    goalType: "",
    targetCategory: "",
    targetValue: "",
    goalPeriod: "",
    description: "",
  });
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "month"));
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const loadGoal = async () => {
      try {
        setLoading(true);
        // TODO: Fetch goal data by ID
        // const data = await getGoalById(goalId);
        // setFormData({...data});

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error loading goal:", error);
        setLoading(false);
      }
    };

    if (goalId) {
      loadGoal();
    }
  }, [goalId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Call update API
      // await updateGoal(goalId, formData);
      console.log("Updating goal:", goalId, formData);

      setModalMessage({
        title: "Goal Updated Successfully!",
        description:
          "Your goal has been updated successfully. You will be redirected to the goals page.",
      });
      setMessageModalOpen(true);
    } catch (error) {
      console.error("Error updating goal:", error);
      setModalMessage({
        title: "Failed to Update Goal",
        description:
          "An error occurred while updating your goal. Please try again.",
      });
      setMessageModalOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const showCategoryField = formData.goalType === "CATEGORY_REDUCTION";

  if (loading) {
    return (
      <PageContainer>
        <LoadingBackdrop open={loading} message="Loading goal..." />
      </PageContainer>
    );
  }

  const flag = true; // Temporary flag to show WIP message

  if(flag) {
    return (
      <WorkInProgress
        title="Edit Goal - Work In Progress"
        message="We're working on exciting new features to enhance your goal editing experience. Stay tuned!"
        icon="rocket"
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer>
        <Header>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </BackButton>
          <Title>✏️ Edit Goal</Title>
        </Header>

        <FormCard>
          <InfoBox>
            <InfoText>
              🎯 Update your sustainability goal details below.
            </InfoText>
          </InfoBox>

          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Goal Information</SectionTitle>

              <TextField
                fullWidth
                label="Goal Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />

              <FormRow>
                <TextField
                  fullWidth
                  select
                  label="Goal Type *"
                  name="goalType"
                  value={formData.goalType}
                  onChange={handleChange}
                  required
                  SelectProps={{ native: true }}
                >
                  <option value="">Select type</option>
                  {goalTypesConstants.map((type) => (
                    <option key={type.code} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </TextField>

                {showCategoryField && (
                  <TextField
                    fullWidth
                    select
                    label="Target Category *"
                    name="targetCategory"
                    value={formData.targetCategory}
                    onChange={handleChange}
                    required
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select category</option>
                    {activityCategoryConstants.map((cat) => (
                      <option key={cat.code} value={cat.code}>
                        {cat.name}
                      </option>
                    ))}
                  </TextField>
                )}
              </FormRow>

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe your goal..."
              />
            </FormSection>

            <FormSection>
              <SectionTitle>Target & Timeline</SectionTitle>

              <FormRow>
                <TextField
                  fullWidth
                  label="Target Value *"
                  name="targetValue"
                  type="number"
                  value={formData.targetValue}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                  helperText="Target value in kg CO₂e"
                />

                <TextField
                  fullWidth
                  select
                  label="Goal Period *"
                  name="goalPeriod"
                  value={formData.goalPeriod}
                  onChange={handleChange}
                  required
                  SelectProps={{ native: true }}
                >
                  <option value="">Select period</option>
                  {goalPeriodsConstants.map((period) => (
                    <option key={period.code} value={period.code}>
                      {period.name}
                    </option>
                  ))}
                </TextField>
              </FormRow>

              <FormRow>
                <DatePicker
                  label="Start Date *"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <DatePicker
                  label="End Date *"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate || undefined}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </FormRow>
            </FormSection>

            <ButtonGroup>
              <Button
                type="button"
                $variant="secondary"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" $variant="primary" disabled={saving}>
                <SaveIcon />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>

        <MessageModal
          open={messageModalOpen}
          handleClose={() => {
            setMessageModalOpen(false);
            if (modalMessage.title === "Goal Updated Successfully!") {
              router.push("/goals");
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

export default EditGoalPage;
