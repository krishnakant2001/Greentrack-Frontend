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
import { Button, Divider, SelectChangeEvent, TextField } from "@mui/material";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import DecimalField from "@/components/reusableComponents/DecimalField";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";
import { activityCategoryData } from "@/data/activityCategoryData";
import { DateSelectField } from "@/components/reusableComponents/DateSelectField";
import { MessageModal } from "@/model/MessageModal";

const CreateActivity = () => {
  const [fields, setFields] = useState({
    activityCategory: "",
    activitySubCategory: "",
    quantity: "",
    unit: "",
    activityDate: "",
    location: "",
    description: "",
  });

  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [unitError, setUnitError] = useState("");

  const [messageModalOpen, setMessageModalOpen] = useState(false);

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

  const handleSelectFieldClick = () => {
    if (!fields.activityCategory) {
      setMessageModalOpen(true);
    }
    // if ((event.target as HTMLElement).closest(".MuiModal-root")) {
    //   return;
    // }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      <Heading>
        <Title>Create New Activity</Title>
        <Subtitle>
          Enter details to log your activity and track its carbon impact.
        </Subtitle>
      </Heading>
      <Divider />
      <Wrapper>
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
              <DateSelectField />
              <TextField
                id="location"
                label="Location"
                value={fields.location}
                fullWidth
                // onChange={handleDescriptionChange}
              />
              <TextField
                id="description"
                label="Description"
                value={fields.description}
                fullWidth
                // onChange={handleDescriptionChange}
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
