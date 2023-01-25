import React from "react";
import { TextField as TextFieldMUI } from "@mui/material";

interface ITextFieldProps {
  label: string;
  sx?: any;
  onChange: (value: string) => void;
}

export default function TextField(props: ITextFieldProps) {
  const { label, sx } = props;

  return (
    <TextFieldMUI
      label={label}
      sx={sx}
      size="small"
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
