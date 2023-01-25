import React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IDateFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date | null) => void;
}

export default function DateField(props: IDateFieldProps) {
  const { label, value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: 150 }} size="small" />
        )}
      />
    </LocalizationProvider>
  );
}
