"use client";
import {
  Alert,
  Button,
  Divider,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  ButtonSection,
  Container,
  DividerWithMargin,
  EmissionFactorSection,
  FormSection,
  Heading,
  SectionTitle,
  SubSection,
  Subtitle,
  Title,
  Wrapper,
} from "../../../main.styles";
import React, { useState } from "react";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import { activityCategoryData } from "@/data/activityCategoryData";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";
import DecimalField from "@/components/reusableComponents/DecimalField";
import { MessageModal } from "@/model/MessageModal";
import { useRouter } from "next/navigation";
import { createEmissionFactor } from "@/services/emissionFactorService";

const CreateEmissionFactor = () => {
  const [fields, setFields] = useState({
    region: "",
    activityCategory: "",
    activitySubCategory: "",
    unit: "",
    co2eFactor: "",
    methodology: "",
    source: "",
  });

  const [regionError, setRegionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [co2eFactorError, setCo2eFactorError] = useState("");

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

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

  const handleSelectRegion = (event: SelectChangeEvent) => {
    const selectedRegion = event.target.value;
    setFields({ ...fields, region: selectedRegion });
    if (selectedRegion) {
      setRegionError("");
    } else {
      setRegionError("Please select a region.");
    }
  };

  const handleSelectCategory = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    setFields({ ...fields, activityCategory: selectedCategory });
    if (selectedCategory) {
      setCategoryError("");
    } else {
      setCategoryError("Please select a Activity category");
    }
  };

  const handleSubSelectCategory = (event: SelectChangeEvent) => {
    const selectedSubCategory = event.target.value;
    setFields({ ...fields, activitySubCategory: selectedSubCategory });
    if (selectedSubCategory) {
      setSubCategoryError("");
    } else {
      setSubCategoryError("Please select a Activity category");
    }
  };

  const handleSelectUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activityUnit = event.target.value;
    setFields({ ...fields, unit: activityUnit.toLowerCase() });
    if (event.target.value !== "") {
      setUnitError("");
    }
  };

  const handleCo2efactorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, co2eFactor: event.target.value });
    if (event.target.value != "") {
      setCo2eFactorError("");
    } else {
      setCo2eFactorError("Please provide a co2 emission factor");
    }
  };

  const handleMethodlogyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFields({ ...fields, methodology: event.target.value });
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, source: event.target.value });
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
      !fields.region ||
      !fields.activityCategory ||
      !fields.activitySubCategory ||
      !fields.unit ||
      !fields.co2eFactor
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("Submitting....");

    if (!fields.region) {
      setRegionError("Please select a region");
    }
    if (!fields.activityCategory) {
      setCategoryError("Please select the activity category");
    }
    if (!fields.activitySubCategory) {
      setSubCategoryError("Please select the sub category of activity");
    }
    if (!fields.unit) {
      setUnitError("Please provide the activity unit");
    }
    if (!fields.co2eFactor) {
      setCo2eFactorError("Please provide the co2 emsission factor");
    }

    if (checkInputFields()) {
      setIsLoading(true);
      try {
        const response = await createEmissionFactor(
          fields.region,
          fields.activityCategory,
          fields.activitySubCategory,
          fields.unit,
          fields.co2eFactor,
          fields.methodology,
          fields.source
        );

        console.log("Create Emission Factor successfully:", response);

        // Success handling
        setSuccessMessage(response.message);

        // Optionally, redirect to login page after a delay
        setTimeout(() => {
          router.push("/admin/emission-factor");
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
    setRegionError("");
    setCategoryError("");
    setSubCategoryError("");
    setUnitError("");
    setCo2eFactorError("");
  };

  return (
    <Container>
      {isLoading && <div>Loading....</div>}
      <Heading>
        <Title>Create Emission Factor</Title>
        <Subtitle>
          Add a new emission factor for region, category, and unit.
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
            <Button type="submit">Create</Button>
          </ButtonSection>
          <EmissionFactorSection>
            <SectionTitle>Factor Identification</SectionTitle>
            <InputSelectField
              required
              id="region"
              label="Region"
              value={fields.region}
              onChange={handleSelectRegion}
              fullWidth
              error={regionError}
              options={regionData}
            />
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
          </EmissionFactorSection>
          <DividerWithMargin />
          <EmissionFactorSection>
            <SectionTitle>Emission Data</SectionTitle>
            <SubSection>
              <DecimalField
                required
                id="co2efactor"
                label="CO2 Emission Factor"
                value={fields.co2eFactor}
                fullWidth
                onChange={handleCo2efactorChange}
                error={co2eFactorError}
              />
              <TextField
                id="methodology"
                label="Methodology"
                value={fields.methodology}
                fullWidth
                onChange={handleMethodlogyChange}
              />
              <TextField
                id="source"
                label="Source"
                value={fields.source}
                fullWidth
                onChange={handleSourceChange}
              />
            </SubSection>
          </EmissionFactorSection>
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

export default CreateEmissionFactor;
