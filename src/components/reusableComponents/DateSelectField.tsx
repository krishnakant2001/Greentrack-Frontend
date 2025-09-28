import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateSelectFieldProps {
  value?: Dayjs | null;
  onChange?: (newDate: string) => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
  error?: string;
  placeholder?: string;
}

export const DateSelectField: React.FC<DateSelectFieldProps> = ({
  value,
  onChange,
  label = "Activity Date",
  fullWidth = true,
  id = "date-input",
  error,
  placeholder,
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          format="DD/MM/YYYY"
          maxDate={dayjs()}
          onChange={(newValue) =>
            onChange?.(newValue ? newValue.format("YYYY-MM-DDT00:00:00") : "")
          }
          slotProps={{
            textField: {
              id: id,
              placeholder: placeholder,
              error: !!error,
              helperText: error,
              fullWidth: fullWidth,
              sx: {
                "& .MuiPickersOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#27667B", // default border
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};
