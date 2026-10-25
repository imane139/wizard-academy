// =====================================
// HOUSES
// =====================================

export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";


// =====================================
// WIZARDS
// =====================================

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

// Omit
export type NewWizard = Omit<Wizard, "id">;

// Pick
export type WizardSummary = Pick<Wizard, "name" | "house">;

// Partial + Omit
export type WizardUpdate = Partial<Omit<Wizard, "id">>;

// Record
export type HousePoints = Record<House, number>;


// =====================================
// SPELLS
// =====================================

export type SpellCategory =
  | "attack"
  | "defense"
  | "healing";

export interface Spell {
  id: number;
  name: string;
  category: SpellCategory;
  power: number;
}

export type NewSpell = Omit<Spell, "id">;

// Exclude
export type NonHealingCategory =
  Exclude<SpellCategory, "healing">;


// =====================================
// EVENTS
// =====================================

export type AcademyEvent =
  | {
      type: "spell_cast";
      wizardId: number;
      spell: string;
    }
  | {
      type: "house_joined";
      wizardId: number;
      house: House;
    }
  | {
      type: "spell_failed";
      wizardId: number;
      reason: string;
    }
  | {
      type: "level_up";
      wizardId: number;
      newLevel: number;
    };

// Extract
export type SpellEvent = Extract<
  AcademyEvent,
  { type: "spell_cast" | "spell_failed" }
>;


// =====================================
// ADVANCED TYPES
// =====================================

// Conditional type + infer
export type ArrayElement<T> =
  T extends (infer U)[] ? U : never;

// Conditional type
export type SpellOutput<T extends SpellCategory> =
  T extends "healing"
    ? "health_restored"
    : "spell_executed";

// Parameters
export type SpellCastParameters = Parameters<
  (wizardId: number, spellId: number) => AcademyEvent
>;

// ReturnType
export type SpellCastReturn = ReturnType<
  (wizardId: number, spellId: number) => AcademyEvent
>;

// Discriminated union
export type DetailedSpell =
  | (Spell & { category: "attack" })
  | (Spell & { category: "defense" })
  | (Spell & { category: "healing" });

// Extract attack spells
export type AttackSpell = Extract<
  DetailedSpell,
  { category: "attack" }
>;

// Index signature
export interface AcademyStatistics {
  [key: string]: number;
}