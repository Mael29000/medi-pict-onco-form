import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  ITraitement,
  useTraitmentsContext,
  Unit,
  TraitementType,
} from "../contexts/TraitmentsContext";
import { AddCircle } from "@mui/icons-material";
import Program from "./Program";

interface ITraitementProps {
  traitement: ITraitement;
  sx?: any;
  type: TraitementType;
}

export default function Traitement(props: ITraitementProps) {
  const { traitement, sx, type } = props;

  console.log("Traitement", traitement);

  const { removeTraitment, updateTraitement } = useTraitmentsContext();

  const handleRemove = () => {
    removeTraitment(traitement.id);
  };

  const addProgram = () => {
    updateTraitement({
      ...traitement,
      programs:
        type === TraitementType.RECURENT
          ? [
              ...traitement.programs,
              {
                frequency: [],
                dose: 0,
                unit: Unit.ML,
                timeRange: { start: new Date(), end: new Date() },
              },
            ]
          : [
              {
                dose: 0,
                unit: Unit.ML,
                symptoms: [],
              },
            ],
    });
  };

  const handleRemoveProgram = (index: number) => {
    const newPrograms = [...(traitement.programs || [])];
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
        {type === TraitementType.RECURENT && (
          <IconButton>
            <AddCircle color="primary" onClick={addProgram} />
          </IconButton>
        )}
      </Box>
      <Box>
        {(traitement.programs || []).map((program, index) => (
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
                  type={type}
                />
              </>
            ) : (
              <Program
                program={program}
                sx={{ ml: 6 }}
                programIndex={index}
                traitement={traitement}
                type={type}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
