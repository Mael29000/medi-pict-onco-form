import React from "react";
import {
  TraitementType,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";
import Traitement from "./Traitement";
import { Paper } from "@mui/material";

export default function OccasionalForm() {
  const { occasionalTraitments } = useTraitmentsContext();
  console.log("occasionalTraitments", occasionalTraitments);

  return (
    <>
      {occasionalTraitments.map((option) => (
        <Paper elevation={12}>
          <Traitement
            traitement={option}
            sx={{ mb: 4, p: 2 }}
            key={option.id}
            type={TraitementType.OCCASIONAL}
          />
        </Paper>
      ))}
    </>
  );
}
