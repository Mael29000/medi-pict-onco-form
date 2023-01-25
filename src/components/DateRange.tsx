import React from "react";
import DateField from "./DateField";
import { Box } from "@mui/material";
import { ITimeRange } from "../contexts/TraitmentsContext";

interface IDateRangeProps {
  timeRange: ITimeRange;
  onDateStartChange: (date: Date | null) => void;
  onDateEndChange: (date: Date | null) => void;
}

export default function DateRange(props: IDateRangeProps) {
  const { timeRange, onDateStartChange, onDateEndChange } = props;

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          width: 310,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <DateField
          label="Début"
          value={timeRange.start}
          onChange={onDateStartChange}
        />
        <DateField
          label="Fin"
          value={timeRange.end}
          onChange={onDateEndChange}
        />
      </Box>
    </Box>
  );
}
