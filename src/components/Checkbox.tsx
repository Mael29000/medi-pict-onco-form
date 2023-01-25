import React from "react";
import { Checkbox as CheckboxMui, FormControlLabel } from "@mui/material";

interface ICheckboxProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: ICheckboxProps) {
  const { label, onChange } = props;
  return (
    <FormControlLabel
      control={<CheckboxMui onChange={onChange} />}
      label={label}
    />
  );
}
