"use client";
import React, { useState } from "react";
import {
  ActivitySection,
  ButtonSection,
  Container,
  DividerWithMargin,
  FormSection,
  Heading,
  SectionTitle,
  SubSection,
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
} from "@mui/material";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { activityCategoryData } from "@/data/activityCategoryData";
import { DateSelectField } from "@/components/reusableComponents/DateSelectField";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { GOAL_PERIODS, GOAL_TYPES } from "@/data/goalData";
import DecimalField from "@/components/reusableComponents/DecimalField";
import { createGoal } from "@/services/goalService";

const CreateGoal = () => {
  const [fields, setFields] = useState({
    goalType: "",
    targetCategory: "",
    targetValue: "",
    goalPeriod: "",
    goalTitle: "",
    goalDescription: "",
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [goalTypeError, setGoalTypeError] = useState("");
  const [targetCategoryError, setTargetCategoryError] = useState("");
  const [targetValueError, setTargetValueError] = useState("");
  const [goalPeriodError, setGoalPeriodError] = useState("");
  const [goalTitleError, setGoalTitleError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSelectGoalType = (event: SelectChangeEvent) => {
    const selectedGoalType = event.target.value;
    setFields({ ...fields, goalType: selectedGoalType });
    if (selectedGoalType) {
      setGoalTypeError("");
    }
  };

  const handleTargetCategoryChange = (event: SelectChangeEvent) => {
    const selectedTargetCategory = event.target.value;
    setFields({ ...fields, targetCategory: selectedTargetCategory });
    if (selectedTargetCategory) {
      setTargetCategoryError("");
    }
  };

  const handleTargetValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const co2emissionTargetValue = event.target.value;
    setFields({ ...fields, targetValue: co2emissionTargetValue });

    // Validation
    if (co2emissionTargetValue === "") {
      setTargetValueError("Please provide co2 emission target value");
    } else if (Number(co2emissionTargetValue) <= 0) {
      setTargetValueError("Target value should be greater than 0");
    } else {
      setTargetValueError("");
    }
  };

  const handleSelectGoalPeriod = (event: SelectChangeEvent) => {
    const selectedGoalPeriod = event.target.value;
    setFields({ ...fields, goalPeriod: selectedGoalPeriod });
    if (selectedGoalPeriod) {
      setGoalPeriodError("");
    }
  };

  const handleStartDateChange = (formattedDate: string) => {
    const startDateValue = formattedDate ? dayjs(formattedDate) : null;
    setStartDate(startDateValue);
    if (startDateValue) {
      setStartDateError("");
    }
  };

  const handleEndDateChange = (formattedDate: string) => {
    const endDateValue = formattedDate ? dayjs(formattedDate) : null;
    setEndDate(endDateValue);
    if (endDateValue) {
      setEndDateError("");
    }
  };

  const handleGoalTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, goalTitle: event.target.value });
    if (event.target.value !== "") {
      setGoalTitleError("");
    }
  };

  const handleGoalDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, goalDescription: event.target.value });
  };

  const checkInputFields = () => {
    if (
      !fields.goalType ||
      !fields.targetCategory ||
      !fields.targetValue ||
      !fields.goalPeriod ||
      !startDate ||
      !endDate ||
      !fields.goalTitle
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("Submitting....");

    if (!fields.goalType) {
      setGoalTypeError("Please provide goal type");
    }
    if (!fields.targetCategory) {
      setTargetCategoryError("Please provide target category");
    }
    if (!fields.targetValue) {
      setTargetValueError("Please provide co2 emssion target value");
    }
    if (!fields.goalPeriod) {
      setGoalPeriodError("Please provide goal period");
    }
    if (!startDate) {
      setStartDateError("Start Date is required");
    }
    if (!endDate) {
      setEndDateError("End date is required");
    }
    if (!fields.goalTitle) {
      setGoalTitleError("Please provide the goal title");
    }

    if (checkInputFields()) {
      setIsLoading(true);
      try {
        const response = await createGoal(
          fields.goalType,
          fields.targetCategory,
          fields.targetValue,
          fields.goalPeriod,
          startDate,
          endDate,
          fields.goalTitle,
          fields.goalDescription
        );

        // Success handling
        setSuccessMessage(response.message);

        // Optionally, redirect to login page after a delay
        setTimeout(() => {
          router.push("/goals");
        }, 3000);
      } catch (error) {
        // Error handling
        console.error(" error:", error);

        let errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        if (errorMessage.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (errorMessage.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        setApiError(errorMessage);
      } finally {
        // Stop Loading
        setIsLoading(false);
      }
    }
  };

  const handleCancelButton = () => {
    console.log("Cancelling....");
    setGoalTypeError("");
    setTargetCategoryError("");
    setTargetValueError("");
    setGoalPeriodError("");
    setStartDateError("");
    setEndDateError("");
    setGoalTitleError("");
  };

  return (
    <Container>
      {isLoading && <div>Loading....</div>}
      <Heading>
        <Title>Create New Sustainability Goals</Title>
        <Subtitle>
          Define your target and time period to track progress.
        </Subtitle>
      </Heading>
      <Divider />
      <Wrapper>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}
        <FormSection onSubmit={handleSubmit} noValidate>
          <ButtonSection>
            <Button variant="outlined" onClick={handleCancelButton}>
              Cancel
            </Button>
            <Button type="submit">Create Goal</Button>
          </ButtonSection>

          <ActivitySection>
            <SectionTitle>Goal Information</SectionTitle>
            <SubSection>
              <InputSelectField
                required
                id="goalType"
                label="Goal Type"
                value={fields.goalType}
                onChange={handleSelectGoalType}
                fullWidth
                error={goalTypeError}
                options={GOAL_TYPES}
              />
              <InputSelectField
                required
                id="targetCategory"
                label="Target Category"
                value={fields.targetCategory}
                onChange={handleTargetCategoryChange}
                fullWidth
                error={targetCategoryError}
                options={activityCategoryData}
              />
            </SubSection>
            <SubSection>
              <DecimalField
                required
                id="targetValue"
                label="Co2 Emission Target value"
                value={fields.targetValue}
                onChange={handleTargetValueChange}
                fullWidth
                error={targetValueError}
              />
              <InputSelectField
                required
                id="goalPeriod"
                label="Goal Period"
                value={fields.goalPeriod}
                onChange={handleSelectGoalPeriod}
                fullWidth
                error={goalPeriodError}
                options={GOAL_PERIODS}
              />
            </SubSection>
          </ActivitySection>
          <DividerWithMargin />
          <ActivitySection>
            <SectionTitle>Goal Duration</SectionTitle>
            <SubSection>
              <DateSelectField
                label="Start Date"
                minDate={dayjs()}
                maxDate={endDate && dayjs(endDate)}
                value={startDate}
                onChange={handleStartDateChange}
                error={startDateError}
              />
              <DateSelectField
                label="End Date"
                minDate={startDate ? dayjs(startDate) : dayjs()}
                value={endDate}
                onChange={handleEndDateChange}
                error={endDateError}
              />
            </SubSection>
          </ActivitySection>
          <ActivitySection></ActivitySection>
          <DividerWithMargin />
          <ActivitySection>
            <SectionTitle>Goal Summary</SectionTitle>
            <SubSection>
              <TextField
                required
                id="title"
                label="Goal Title"
                variant="outlined"
                value={fields.goalTitle}
                fullWidth
                onChange={handleGoalTitleChange}
                error={!!goalTitleError}
                helperText={goalTitleError}
              />
              <TextField
                id="goalDescription"
                label="Goal Description"
                value={fields.goalDescription}
                fullWidth
                onChange={handleGoalDescriptionChange}
              />
            </SubSection>
          </ActivitySection>
        </FormSection>
      </Wrapper>
    </Container>
  );
};

export default CreateGoal;
