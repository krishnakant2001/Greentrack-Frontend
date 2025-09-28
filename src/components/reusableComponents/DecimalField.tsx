"use client";
import React, { useEffect, useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      
      // only block the wheel if our input currently has focus
      if (document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };

    const options: AddEventListenerOptions = { passive: false, capture: true };

    // add as non-passive + capture so preventDefault actually works
    window.addEventListener("wheel", handleWheel, options);
    return () => window.removeEventListener("wheel", handleWheel, options);
  }, []);

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
        inputRef={inputRef}
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
