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
import { MessageModal } from "@/model/MessageModal";
import dayjs, { Dayjs } from "dayjs";
import { createActivity } from "@/services/activityService";
import { useRouter } from "next/navigation";
import { GOAL_PERIODS, GOAL_TYPES } from "@/data/goalData";

const CreateActivity = () => {
  const [fields, setFields] = useState({
    goalType: "",
    targetCategory: "",
    targetValue: "",
    goalPeriod: "",
    goalTitle: "",
    goalDescription: "",
  });

  const [activityDate, setActivityDate] = useState<Dayjs | null>(null);

  const [goalTypeError, setGoalTypeError] = useState("");
  const [targetCategoryError, setTargetCategoryError] = useState("");
  const [targetValueError, setTargetValueError] = useState("");
  const [goalPeriodError, setGoalPeriodError] = useState("");
  const [goalTitleError, setGoalTitleError] = useState("");

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  //   useEffect(() => {
  //     const fetchUserDetails = async () => {
  //       setIsLoading(true);
  //       try {
  //         const res = await getUserProfileDetails();
  //         setUserId(res.data?.id);
  //       } catch (error) {
  //         console.error("Failed to fetch user details", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchUserDetails();
  //   }, []);

  //   const subCatergoryList = () => {
  //     if (fields.activityCategory) {
  //       return activitySubCategoryData
  //         .filter((item) => item.category === fields.activityCategory)
  //         .map((item) => ({ code: item.code, name: item.name }));
  //     }

  //     return activitySubCategoryData.map((item) => ({
  //       code: item.code,
  //       name: item.name,
  //     }));
  //   };

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

  const handleTargetValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, targetValue: event.target.value });
    if (event.target.value !== "") {
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

  const handleActivityDateChange = (formattedDate: string) => {
    setActivityDate(formattedDate ? dayjs(formattedDate) : null);
  };

  const handleGoalTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, goalTitle: event.target.value });
    if (event.target.value !== "") {
      setGoalTitleError("");
    }
  };

  const handleGoalDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, goalDescription: event.target.value });
  };

  //   const handleSelectFieldClick = () => {
  //     if (!fields.activityCategory) {
  //       setMessageModalOpen(true);
  //     }
  //     // if ((event.target as HTMLElement).closest(".MuiModal-root")) {
  //     //   return;
  //     // }
  //   };

  const checkInputFields = () => {
    if (
      !fields.goalType ||
      !fields.targetCategory ||
      !fields.targetValue ||
      !fields.goalPeriod ||
      !fields.goalTitle
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("Submitting....");

    // if (!fields.activityCategory) {
    //   setCategoryError("Please select the activity category");
    // }
    // if (!fields.activitySubCategory) {
    //   setSubCategoryError("Please select the sub category of activity");
    // }
    // if (!fields.quantity) {
    //   setQuantityError("Please provide the activity quantity");
    // }
    // if (!fields.unit) {
    //   setUnitError("Please provide the activity unit");
    // }

    if (checkInputFields()) {
      setIsLoading(true);
      try {
        // const response = await createActivity(
        //   fields.goalType,
        //   fields.targetCategory,
        //   fields.targetValue,
        //   fields.goalPeriod,
        //   activityDate,
        //   fields.goalTitle,
        //   fields.goalDescription
        // );

        // Success handling
        // setSuccessMessage(response.message);

        // Optionally, redirect to login page after a delay
        setTimeout(() => {
          router.push("/activity");
        }, 3000);
      } catch (error) {
        // Error handling
        console.error("Registration error:", error);

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
              <TextField
                required
                id="targetValue"
                label="Target Value"
                value={fields.targetValue}
                onChange={handleTargetValueChange}
                fullWidth
                error={!!targetValueError}
              />
            </SubSection>

            <SubSection>
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
              <DateSelectField
                //start date
                value={activityDate}
                onChange={handleActivityDateChange}
              />
              <DateSelectField
                //end date
                value={activityDate}
                onChange={handleActivityDateChange}
              />
            </SubSection>
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
          <DividerWithMargin />
          <ActivitySection>
            <SectionTitle>Additional Details</SectionTitle>
            <SubSection></SubSection>
          </ActivitySection>
          <MessageModal
            open={messageModalOpen}
            handleClose={() => setMessageModalOpen(false)}
            title="Select Activity Category First"
            description="Please choose an Activity Category first. Subcategory options depend on your selection."
          />
        </FormSection>
      </Wrapper>
    </Container>
  );
};

export default CreateActivity;
