import React from "react";
import { Select as SelectMUI, MenuItem, FormControl } from "@mui/material";

interface ISelectProps {
  options: any[];
  value: any;
  onChange: (event: any) => void;
  getOptionLabel: (option: any) => string;
  getOptionKey: (option: any) => string;
  sx?: any;
}

export default function Select(props: ISelectProps) {
  const { options, value, onChange, getOptionKey, getOptionLabel, sx } = props;

  return (
    <FormControl size="small" sx={{ width: 150, ...sx }}>
      <SelectMUI value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem value={option} key={getOptionKey(option)}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
}
