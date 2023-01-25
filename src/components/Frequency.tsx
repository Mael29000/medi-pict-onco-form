import React from "react";
import Checkbox from "./Checkbox";
import { Box } from "@mui/material";
import { Frequency as FrequencyEnum } from "../contexts/TraitmentsContext";

interface IFrequencyProps {
  onChange: (value: string) => void;
}

export default function Frequency(props: IFrequencyProps) {
  const { onChange } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <Checkbox
        label="Matin"
        onChange={() => onChange(FrequencyEnum.Morning)}
      />
      <Checkbox label="Midi" onChange={() => onChange(FrequencyEnum.MidDay)} />
      <Checkbox label="18h" onChange={() => onChange(FrequencyEnum.sixPm)} />
      <Checkbox label="Soir" onChange={() => onChange(FrequencyEnum.Evening)} />
    </Box>
  );
}
