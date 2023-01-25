import React from "react";
import Traitement from "./Traitement";
import { useTraitmentsContext } from "../contexts/TraitmentsContext";

interface IReccurentFormProps {}

export default function RecurentForm(props: IReccurentFormProps) {
  const { recurentTraitments } = useTraitmentsContext();

  console.log("recurentTraitments", recurentTraitments);

  return (
    <>
      {recurentTraitments.map((option, index) => (
        <Traitement traitement={option} sx={{ mb: 4 }} key={option.id} />
      ))}
    </>
  );
}
