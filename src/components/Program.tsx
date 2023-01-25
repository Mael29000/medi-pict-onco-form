import React, { useEffect } from "react";
import Select from "./Select";
import TextField from "./TextField";
import DateRange from "./DateRange";
import Frequency from "./Frequency";
import {
  Format,
  Frequency as FrequencyEnum,
  IProgram,
  ITraitement,
  TakeMode,
  Unit,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";
import { Box } from "@mui/material";

interface ITraitementProps {
  program: IProgram;
  programIndex: number;
  traitement: ITraitement;
  sx?: any;
}

export default function Program(props: ITraitementProps) {
  const { program, sx, programIndex, traitement } = props;

  const { updateTraitement } = useTraitmentsContext();

  const [frequency, setFrequency] = React.useState<FrequencyEnum[]>(
    program.frequency
  );

  const [dose, setDose] = React.useState<number>(program.dose);

  const [unit, setUnit] = React.useState(Unit.ML);

  const [format, setFormat] = React.useState(Format.COMPRIME);

  const [timeRange, setTimeRange] = React.useState({
    start: new Date(),
    end: new Date(),
  });

  const [takeMode, setTakeMode] = React.useState(TakeMode.PER_OS);

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

  const handleChangeFormat = (event: any) => {
    const newFormat = (event.target as HTMLInputElement).value;
    setFormat(newFormat as Format);
  };

  const handleUnitChange = (event: any) => {
    const newUnit = (event.target as HTMLInputElement).value;
    setUnit(newUnit as Unit);
  };

  const handleTakeModeChange = (event: any) => {
    const newTakeMode = (event.target as HTMLInputElement).value;
    setTakeMode(newTakeMode as TakeMode);
  };

  const handleDoseChange = (value: string) => {
    setDose(Number(value));
  };

  useEffect(() => {
    // update traitement and program
    const newPrograms = [...traitement.programs];
    newPrograms[programIndex] = {
      ...program,
      frequency,
      unit,
      timeRange,
      dose,
    };
    updateTraitement({
      ...traitement,
      programs: newPrograms,
      format,
      mode_prise: takeMode,
    });
  }, [frequency, unit, format, timeRange, takeMode, dose]);

  return (
    <Box sx={{ ...sx }}>
      <Box
        sx={{
          // mt: 10,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <TextField
          label="Dose"
          sx={{ width: 140 }}
          onChange={handleDoseChange}
        />

        <Select
          options={["ml", "mg"]}
          value={unit}
          onChange={handleUnitChange}
          getOptionKey={(option) => option}
          getOptionLabel={(option) => option}
          sx={{ mr: 2, width: 70, ml: 1 }}
        />

        <Select
          options={["Per os", "Injection"]}
          getOptionKey={(option) => option}
          getOptionLabel={(option) => option}
          value={takeMode}
          onChange={handleTakeModeChange}
          sx={{ mr: 2 }}
        />

        <Select
          options={["Comprimé", "Gélule"]}
          getOptionKey={(option) => option}
          getOptionLabel={(option) => option}
          value={format}
          onChange={handleChangeFormat}
          sx={{ mr: 2 }}
        />
      </Box>
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
    </Box>
  );
}
