"use client";
import { Button, Divider, SelectChangeEvent, TextField } from "@mui/material";
import {
  Container,
  Heading,
  Subtitle,
  Title,
  Wrapper,
} from "../../../main.styles";
import React, { useState } from "react";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import { activityCategoryData } from "@/data/activityCategoryData";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";

const CreateEmissionFactor = () => {
  const [fields, setFields] = useState({
    region: "",
    activityCategory: "",
    activitySubCategory: "",
    unit: "",
  });

  const [regionError, setRegionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [unitError, setUnitError] = useState("");

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

  return (
    <Container>
      <Heading>
        <Title>Create Emission Factor</Title>
        <Subtitle>
          Add a new emission factor for region, category, and unit.
        </Subtitle>
      </Heading>

      <Divider />
      <Wrapper>
        <>
          <div>Factor Identification</div>
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
            onChange={handleSubSelectCategory}
            fullWidth
            error={subCategoryError}
            options={activitySubCategoryData
              .filter((item) => item.category === fields.activityCategory)
              .map((item) => ({ code: item.code, name: item.name }))}
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
        </>
        <>
          <div>Emission Data</div>
          <TextField required id="co2efactor" label="CO2 Emission Factor" />
          <TextField id="methodology" label="Methodology" />
          <TextField id="source" label="Source" />
        </>
        <>
          <Button variant="outlined">Cancel</Button>
          <Button>Create</Button>
        </>
      </Wrapper>
    </Container>
  );
};

export default CreateEmissionFactor;
