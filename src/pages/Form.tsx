import {
  Autocomplete,
  TextField,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { traitements as allTraitments } from "../mocks/traitements";
import RecurentForm from "../components/RecurentForm";
import {
  TraitementType,
  useTraitmentsContext,
} from "../contexts/TraitmentsContext";

import QrCode from "../components/QrCode";
import OccasionalForm from "../components/OccasionalForm";

const styles = {
  section_main: {
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "spacevenly",
    "align-items": "center",
    "background-image": "url('../images/pills_1.png')",
    "background-repeat": "no-repeat",
    "background-attachment": "fixed",
    "background-position": "center",
  },
  root: {
    fontFamily: "sans-serif",
  },
  h1: {
    textAlign: "center",
  },
  qrcode: {
    textAlign: "center",
  },
};

export default function Form() {
  const { addTraitment } = useTraitmentsContext();

  const [traitementType, setTraitementType] = useState<TraitementType>(
    TraitementType.RECURENT
  );

  const handleTraitementChange = (event: any, newValue: any) => {
    console.log("Chat GPT");
    addTraitment(newValue, traitementType);
    console.log("Chat GPT2");

    //clear autocomplete
    setClear(clear + 1);
  };

  const handleTraitementTypeChange = (event: any, newValue: any) => {
    setTraitementType(newValue);
  };

  const [clear, setClear] = useState(0);

  return (
    <div style={styles.section_main} className="section_main">
      <Box sx={{ p: 10 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mb: 20,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
            <Autocomplete
              key={clear}
              disablePortal
              id="combo-box-demo"
              options={allTraitments}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Traitement" />
              )}
              getOptionLabel={(option) => option.name}
              onChange={handleTraitementChange}
              placeholder="Choisir un traitement"
            />
          </Box>
          <ToggleButtonGroup
            value={traitementType}
            exclusive
            onChange={handleTraitementTypeChange}
          >
            <ToggleButton value={TraitementType.RECURENT}>
              {TraitementType.RECURENT}
            </ToggleButton>
            <ToggleButton value={TraitementType.OCCASIONAL}>
              {TraitementType.OCCASIONAL}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {traitementType === TraitementType.RECURENT ? (
          <RecurentForm />
        ) : (
          <OccasionalForm />
        )}
      </Box>
      <QrCode />
    </div>
  );
}
