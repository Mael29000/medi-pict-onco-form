import React from "react";

export interface IMedication {
  name: string;
  id: number;
}

export interface ITraitement {
  id: number;
  programs: IProgram[];
  medication: IMedication;
  type: TraitementType;
  format: Format;
  mode_prise: TakeMode;
}

export interface IProgram {
  dose: number;
  unit: Unit;
  timeRange?: ITimeRange;
  frequency?: Frequency[];
  symptoms?: string[];
}

export enum Frequency {
  Morning = "Matin",
  MidDay = "Midi",
  sixPm = "18h",
  Evening = "Soir",
}

export interface ITimeRange {
  start: Date;
  end: Date;
}

export enum TraitementType {
  RECURENT = "recurent",
  OCCASIONAL = "occasionnel",
}

export enum TakeMode {
  PER_OS = "Per os",
  INJECTION = "Injection",
}

export enum Format {
  COMPRIME = "Comprimé",
}

interface TraitmentContextProps {
  allTraitments: ITraitement[];
  recurentTraitments: ITraitement[];
  occasionalTraitments: ITraitement[];
  addTraitment: (medication: IMedication, type: TraitementType) => void;
  removeTraitment: (id: number) => void;
  updateTraitement: (traitement: ITraitement) => void;
}

export enum Unit {
  ML = "ml",
  G = "g",
  MG = "mg",
}

const initialValues: TraitmentContextProps = {
  allTraitments: [],
  recurentTraitments: [],
  occasionalTraitments: [],
  addTraitment: () => {},
  removeTraitment: () => {},
  updateTraitement: () => {},
};

const TraitmentsContext =
  React.createContext<TraitmentContextProps>(initialValues);

export const TraitmentsProvider = ({ children }: any) => {
  const [traitments, setTraitments] = React.useState<ITraitement[]>([]);

  const addTraitment = (medication: IMedication, type: TraitementType) => {
    console.log("coucou");

    //if not already in the list
    if (
      traitments.find((traitment) => traitment.medication.id === medication.id)
    )
      return;

    const traitment: ITraitement = {
      id: traitments.length + 1,
      medication,
      mode_prise: TakeMode.PER_OS,
      format: Format.COMPRIME,
      programs:
        type === TraitementType.RECURENT
          ? [
              {
                dose: 0,
                unit: Unit.ML,
                frequency: [],
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
      type,
    };

    setTraitments([...traitments, traitment]);
  };

  const removeTraitment = (id: number) => {
    setTraitments(traitments.filter((traitment) => traitment.id !== id));
  };

  const recurentTraitments: ITraitement[] = traitments.filter(
    (traitment) => traitment.type === TraitementType.RECURENT
  );

  const occasionalTraitments: ITraitement[] = traitments.filter(
    (traitment) => traitment.type === TraitementType.OCCASIONAL
  );

  const updateTraitement = (traitement: ITraitement) => {
    const newTraitments = traitments.map((traitment) => {
      if (traitment.id === traitement.id) {
        return traitement;
      }
      return traitment;
    });

    setTraitments(newTraitments);
  };

  console.log("all traitments", traitments);

  return (
    <TraitmentsContext.Provider
      value={{
        allTraitments: traitments,
        recurentTraitments,
        occasionalTraitments,
        addTraitment,
        removeTraitment,
        updateTraitement,
      }}
    >
      {children}
    </TraitmentsContext.Provider>
  );
};

export const useTraitmentsContext = () => React.useContext(TraitmentsContext);
