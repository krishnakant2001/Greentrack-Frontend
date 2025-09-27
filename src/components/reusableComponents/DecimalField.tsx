"use client";
import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

interface DecimalFieldProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
  error?: string;
  placeholder?: string;
}

const DecimalField: React.FC<DecimalFieldProps> = ({
  value,
  onChange,
  onClick,
  label = "CO₂ Emission Factor",
  required = true,
  fullWidth = true,
  id = "decimal-input",
  error,
  placeholder,
}) => {
  const blockUnwantedKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <FormControl required={required} variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor={id} error={!!error}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type="number"
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={blockUnwantedKeys}
        error={!!error}
        placeholder={placeholder || "Enter a decimal value"}
        inputProps={{
          inputMode: "decimal",
          step: "any",
          min: "0",
        }}
        label={label}
      />
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </FormControl>
  );
};

export default DecimalField;
