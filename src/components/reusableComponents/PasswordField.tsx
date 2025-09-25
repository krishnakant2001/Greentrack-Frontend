"use client";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  onClick,
  label = "Password",
  required = true,
  fullWidth = true,
  id = "outlined-adornment-password",
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  
  return (
    <FormControl required={required} variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor="outlined-adornment-password" error={!!error}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onClick={onClick}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
