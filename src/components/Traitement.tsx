import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  ITraitement,
  useTraitmentsContext,
  Unit,
} from "../contexts/TraitmentsContext";
import { AddCircle } from "@mui/icons-material";
import Program from "./Program";

interface ITraitementProps {
  traitement: ITraitement;
  sx?: any;
}

export default function Traitement(props: ITraitementProps) {
  const { traitement, sx } = props;

  console.log("Traitement", traitement);

  const { removeTraitment, updateTraitement } = useTraitmentsContext();

  const [frequency, setFrequency] = React.useState("Once a day");

  const [unit, setUnit] = React.useState("ml");

  const handleChangeFrequency = (event: any) => {
    const newFrequency = (event.target as HTMLInputElement).value;
    console.log("newFrequency", newFrequency);
    setFrequency(newFrequency);
  };

  const handleUnitChange = (event: any) => {
    const newUnit = (event.target as HTMLInputElement).value;
    console.log("newUnit", newUnit);
    setUnit(newUnit);
  };

  const handleRemove = () => {
    removeTraitment(traitement.id);
  };

  const addProgram = () => {
    updateTraitement({
      ...traitement,
      programs: [
        ...traitement.programs,
        {
          frequency: [],
          dose: 0,
          unit: Unit.ML,
          timeRange: { start: new Date(), end: new Date() },
        },
      ],
    });
  };

  const handleRemoveProgram = (index: number) => {
    const newPrograms = [...traitement.programs];
    newPrograms.splice(index, 1);
    updateTraitement({
      ...traitement,
      programs: newPrograms,
    });
  };

  return (
    <Box sx={{ width: "100%", display: "flex", ...sx }}>
      <Box sx={{ width: 300 }}>
        <Box
          sx={{
            // mt: 10,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <IconButton sx={{ mr: 2 }} onClick={handleRemove}>
            <BackspaceIcon sx={{ rotate: "180deg" }} color="error" />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ mr: 2 }}>
            {traitement?.medication.name}
          </Typography>
        </Box>

        <IconButton>
          <AddCircle color="primary" onClick={addProgram} />
        </IconButton>
      </Box>
      <Box>
        {traitement.programs.map((program, index) => (
          <Box sx={{ display: "flex" }}>
            {index > 0 ? (
              <>
                <IconButton
                  disableRipple
                  onClick={() => handleRemoveProgram(index)}
                >
                  <BackspaceIcon
                    sx={{
                      rotate: "180deg",
                      width: 15,
                      mr: 2,
                    }}
                    color="error"
                  />
                </IconButton>
                <Program
                  program={program}
                  sx={{ mt: 4 }}
                  programIndex={index}
                  traitement={traitement}
                />
              </>
            ) : (
              <Program
                program={program}
                sx={{ ml: 6 }}
                programIndex={index}
                traitement={traitement}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
