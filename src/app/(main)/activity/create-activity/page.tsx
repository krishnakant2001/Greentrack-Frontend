"use client";
import React, { useEffect, useState } from "react";
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
import DecimalField from "@/components/reusableComponents/DecimalField";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";
import { activityCategoryData } from "@/data/activityCategoryData";
import { DateSelectField } from "@/components/reusableComponents/DateSelectField";
import { MessageModal } from "@/model/MessageModal";
import dayjs, { Dayjs } from "dayjs";
import { getUserProfileDetails } from "@/services/userDetailsService";
import { createActivity } from "@/services/activityService";
import { useRouter } from "next/navigation";

const CreateActivity = () => {
  const [fields, setFields] = useState({
    activityCategory: "",
    activitySubCategory: "",
    quantity: "",
    unit: "",
    location: "",
    description: "",
  });

  const [activityDate, setActivityDate] = useState<Dayjs | null>(null);

  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [userId, setUserId] = useState("");

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const res = await getUserProfileDetails();
        setUserId(res.data?.id);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const subCatergoryList = () => {
    if (fields.activityCategory) {
      return activitySubCategoryData
        .filter((item) => item.category === fields.activityCategory)
        .map((item) => ({ code: item.code, name: item.name }));
    }

    return activitySubCategoryData.map((item) => ({
      code: item.code,
      name: item.name,
    }));
  };

  const handleSelectCategory = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    setFields({ ...fields, activityCategory: selectedCategory });
    if (selectedCategory) {
      setCategoryError("");
    }
  };

  const handleSubSelectCategory = (event: SelectChangeEvent) => {
    const selectedSubCategory = event.target.value;
    setFields({ ...fields, activitySubCategory: selectedSubCategory });
    if (selectedSubCategory) {
      setSubCategoryError("");
    }
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantityValue = event.target.value;
    setFields({ ...fields, quantity: quantityValue });

    // Validation
    if (quantityValue === "") {
      setQuantityError("Please provide the activity quantity");
    } else if (Number(quantityValue) <= 0) {
      setQuantityError("Activity Quantity should be greater than 0");
    } else {
      setQuantityError("");
    }
  };

  const handleSelectUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activityUnit = event.target.value;
    setFields({ ...fields, unit: activityUnit.toLowerCase() });
    if (event.target.value !== "") {
      setUnitError("");
    }
  };

  const handleActivityDateChange = (formattedDate: string) => {
    setActivityDate(formattedDate ? dayjs(formattedDate) : null);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, location: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, description: event.target.value });
  };

  const handleSelectFieldClick = () => {
    if (!fields.activityCategory) {
      setMessageModalOpen(true);
    }
    // if ((event.target as HTMLElement).closest(".MuiModal-root")) {
    //   return;
    // }
  };

  const checkInputFields = () => {
    if (
      !fields.activityCategory ||
      !fields.activitySubCategory ||
      !fields.quantity ||
      !fields.unit
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("Submitting....");

    if (!fields.activityCategory) {
      setCategoryError("Please select the activity category");
    }
    if (!fields.activitySubCategory) {
      setSubCategoryError("Please select the sub category of activity");
    }
    if (!fields.quantity) {
      setQuantityError("Please provide the activity quantity");
    }
    if (!fields.unit) {
      setUnitError("Please provide the activity unit");
    }

    if (checkInputFields()) {
      setIsLoading(true);
      try {
        const response = await createActivity(
          fields.activityCategory,
          fields.activitySubCategory,
          fields.quantity,
          fields.unit,
          activityDate,
          fields.location,
          fields.description,
          userId
        );

        // Success handling
        setSuccessMessage(response.message);

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
    setCategoryError("");
    setSubCategoryError("");
    setQuantityError("");
    setUnitError("");
  };

  return (
    <Container>
      {isLoading && <div>Loading....</div>}
      <Heading>
        <Title>Create New Activity</Title>
        <Subtitle>
          Enter details to log your activity and track its carbon impact.
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
            <Button type="submit">Create Activity</Button>
          </ButtonSection>

          <ActivitySection>
            <SectionTitle>Activity Information</SectionTitle>
            <SubSection>
              <InputSelectField
                required
                id="activity"
                label="Activity Category"
                value={fields.activityCategory}
                onChange={handleSelectCategory}
                fullWidth
                error={categoryError}
                options={activityCategoryData}
              />
              <InputSelectField
                required
                id="subType"
                label="Activity Sub Type"
                value={fields.activitySubCategory}
                onChange={
                  fields.activityCategory ? handleSubSelectCategory : undefined
                }
                onClick={handleSelectFieldClick}
                fullWidth
                error={subCategoryError}
                options={subCatergoryList()}
              />
            </SubSection>

            <SubSection>
              <DecimalField
                required
                id="quantity"
                label="Quantity"
                value={fields.quantity}
                fullWidth
                onChange={handleChangeQuantity}
                placeholder="Enter a Positive value"
                error={quantityError}
              />
              <TextField
                required
                id="unit"
                label="Unit"
                variant="outlined"
                value={fields.unit}
                fullWidth
                onChange={handleSelectUnit}
                error={!!unitError}
                helperText={unitError}
              />
            </SubSection>
          </ActivitySection>
          <DividerWithMargin />
          <ActivitySection>
            <SectionTitle>Additional Details</SectionTitle>
            <SubSection>
              <DateSelectField
                value={activityDate}
                onChange={handleActivityDateChange}
              />
              <TextField
                id="location"
                label="Location"
                value={fields.location}
                fullWidth
                onChange={handleLocationChange}
              />
              <TextField
                id="description"
                label="Description"
                value={fields.description}
                fullWidth
                onChange={handleDescriptionChange}
              />
            </SubSection>
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
