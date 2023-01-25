import React from "react";
import Traitement from "./Traitement";
import {
  TraitementType,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";
import { Paper } from "@mui/material";
interface IReccurentFormProps {}

export default function RecurentForm(props: IReccurentFormProps) {
  const { recurentTraitments } = useTraitmentsContext();

  console.log("recurentTraitments", recurentTraitments);

  return (
    <>
      {recurentTraitments.map((option, index) => (
        <Paper elevation={12}>
          <Traitement
            traitement={option}
            sx={{ mb: 4, p: 2 }}
            key={option.id}
            type={TraitementType.RECURENT}
          />
        </Paper>
      ))}
    </>
  );
}
