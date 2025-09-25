import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import React from "react";

interface InputSelectFieldProps {
  value: string;
  onChange?: (event: SelectChangeEvent) => void;
  onClick?: () => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
  error?: string;
  options: Array<{ code: string; name: string }>;
}
const InputSelectField: React.FC<InputSelectFieldProps> = ({
  value,
  onChange,
  onClick,
  label,
  required,
  fullWidth,
  id,
  error,
  options,
}) => {
  return (
    <FormControl
      required={required}
      fullWidth={fullWidth}
      error={!!error}
      onClick={onClick}
    >
      <InputLabel id={id} error={!!error}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default InputSelectField;
