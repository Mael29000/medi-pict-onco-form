import React, { useEffect } from "react";
import { Box } from "@mui/material";
import DateRange from "./DateRange";
import {
  IProgram,
  Frequency as FrequencyEnum,
  ITraitement,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";
import Frequency from "./Frequency";

interface IReccurentPropertiesProps {
  program: IProgram;
  programIndex: number;
  traitement: ITraitement;
}

export default function ReccurentProperties(props: IReccurentPropertiesProps) {
  const { program, programIndex, traitement } = props;

  const { updateTraitement } = useTraitmentsContext();

  const [timeRange, setTimeRange] = React.useState({
    start: new Date(),
    end: new Date(),
  });

  const [frequency, setFrequency] = React.useState<FrequencyEnum[]>(
    program.frequency || []
  );

  const handleStartDateChange = (date: Date | null) => {
    if (!date) return;
    setTimeRange({ ...timeRange, start: date });
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;
    setTimeRange({ ...timeRange, end: date });
  };

  const handleChangeFrequency = (value: string) => {
    // if value present in frequency, remove it
    // else add it
    const newFrequency = frequency.includes(value as FrequencyEnum)
      ? frequency.filter((f) => f !== value)
      : [...frequency, value as FrequencyEnum];
    setFrequency(newFrequency);
  };

  useEffect(() => {
    // update traitement and program
    const newPrograms = [...(traitement.programs || [])];
    newPrograms[programIndex] = {
      ...program,
      frequency,
      timeRange,
    };
    updateTraitement({
      ...traitement,
      programs: newPrograms,
    });
  }, [frequency, timeRange]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 2,
      }}
    >
      <DateRange
        timeRange={timeRange}
        onDateEndChange={handleEndDateChange}
        onDateStartChange={handleStartDateChange}
      />
      <Box sx={{ ml: 2 }}>
        <Frequency onChange={handleChangeFrequency} />
      </Box>
    </Box>
  );
}
