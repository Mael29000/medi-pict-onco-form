import React, { useEffect } from "react";
import Select from "./Select";
import TextField from "./TextField";
import {
  Format,
  IProgram,
  ITraitement,
  TakeMode,
  TraitementType,
  Unit,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";
import { Box } from "@mui/material";
import ReccurentProperties from "./ReccurentProperties";
import OccasionalProperties from "./OccasionalProperties";

interface ITraitementProps {
  program: IProgram;
  programIndex: number;
  traitement: ITraitement;
  sx?: any;
  type: TraitementType;
}

export default function Program(props: ITraitementProps) {
  const { program, sx, programIndex, traitement, type } = props;

  const { updateTraitement } = useTraitmentsContext();

  const [dose, setDose] = React.useState<number>(program.dose);

  const [unit, setUnit] = React.useState(Unit.ML);

  const [format, setFormat] = React.useState(Format.COMPRIME);

  const [takeMode, setTakeMode] = React.useState(TakeMode.PER_OS);

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
    const newPrograms = [...(traitement.programs || [])];
    newPrograms[programIndex] = {
      ...program,
      unit,
      dose,
    };
    updateTraitement({
      ...traitement,
      programs: newPrograms,
      format,
      mode_prise: takeMode,
    });
  }, [unit, format, takeMode, dose]);

  return (
    <Box sx={{ ...sx }}>
      <Box
        sx={{
          // mt: 10,
          display: "flex",
          alignItems: "flexStart",
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
      {type === TraitementType.RECURENT ? (
        <ReccurentProperties
          program={program}
          programIndex={programIndex}
          traitement={traitement}
        />
      ) : (
        <OccasionalProperties traitement={traitement} />
      )}
    </Box>
  );
}
