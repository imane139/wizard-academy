export interface Wizard {
    id: number;
    name: string;
    house: string;
  }
  
  export type NewWizard = Omit<Wizard, "id">;

  
export type AcademyEvent =
| {
    type: "spell_cast";
    wizardId: number;
    spell: string;
  }
| {
    type: "house_joined";
    wizardId: number;
    house: string;
  }
| {
    type: "spell_failed";
    wizardId: number;
    reason: string;
  };

export type SpellEvent = Extract<
AcademyEvent,
{ type: "spell_cast" | "spell_failed" }
>;

export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";