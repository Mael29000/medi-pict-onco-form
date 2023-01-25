import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ITraitement,
  Unit,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";

interface IOccasionalPropertiesProps {
  traitement: ITraitement;
}

export default function OccasionalProperties(
  props: IOccasionalPropertiesProps
) {
  const { updateTraitement } = useTraitmentsContext();

  const { traitement } = props;

  const allSymptoms = [
    "Mal de tête",
    "Douleur au ventre",
    "Douleur au dos",
    "Douleur aux jambes",
    "Douleur aux bras",
    "Douleur aux mains",
    "Douleur aux pieds",
    "Douleur aux oreilles",
    "Douleur aux yeux",
    "Douleur aux dents",
    "Douleur aux articulations",
    "Douleur aux muscles",
    "Douleur aux os",
    "Douleur aux intestins",
    "Douleur aux poumons",
    "Douleur aux reins",
    "Douleur aux voies urinaires",
    "Douleur aux voies respiratoires",
    "Douleur aux voies digestives",
    "Douleur aux voies génitales",
    "Douleur aux voies oculaires",
    "Douleur aux voies auditives",
    "Douleur aux voies olfactives",
    "Douleur aux voies gustatives",
    "Douleur aux voies tactiles",
    "Douleur aux voies vestibulaires",
    "Douleur aux voies nerveuses",
    "Douleur aux voies vasculaires",
    "Douleur aux voies lymphatiques",
    "Douleur aux voies endocrines",
    "Douleur aux voies hormonales",
    "Douleur aux voies immunitaires",
    "Douleur aux voies musculaires",
    "Douleur aux voies osseuses",
    "Douleur aux voies articulaires",
    "Douleur aux voies cutanées",
  ];

  const [clear, setClear] = useState(0);

  const [symptoms, setSymptoms] = useState<string[]>([]);

  const handleAddSymptom = (event: any, newValue: any) => {
    setSymptoms([...symptoms, newValue]);
    //remove the symptom from the list
    allSymptoms.splice(allSymptoms.indexOf(newValue), 1);
    setClear(clear + 1);
  };

  const handleRemoveSymptom = (symptom: string) => {
    console.log("symptom", symptom);
    setSymptoms(symptoms.filter((s) => s !== symptom));
    //add the symptom back to the list
    allSymptoms.push(symptom);
    setClear(clear + 1);
  };

  useEffect(() => {
    updateTraitement({
      ...traitement,
      programs: [
        {
          dose: 0,
          unit: Unit.ML,
          symptoms: symptoms,
        },
      ],
    });
  }, [symptoms]);

  return (
    <>
      <Autocomplete
        key={clear}
        disablePortal
        id="combo-box-demo"
        options={allSymptoms}
        sx={{ width: 300, mb: 1, mt: 2 }}
        renderInput={(params) => (
          <TextField {...params} label="Symptomes" size="small" />
        )}
        getOptionLabel={(option) => option}
        onChange={handleAddSymptom}
        placeholder="Choisir un traitement"
      />
      {symptoms.map((symptom) => (
        <Chip
          label={symptom}
          onDelete={() => handleRemoveSymptom(symptom)}
          key={symptom}
          color="primary"
          sx={{ mr: 1 }}
        />
      ))}
    </>
  );
}
