import {
  wizards,
  addWizard,
  filterBy,
  isHouse,
  isWizard,
  WizardRepository,
  SpellRepository
} from "./repository.js";

import {
  ValidatePower,
  Cache
} from "./decorators.js";

import { AcademyService } from "./services.js";

import type {
  Spell,
  SpellEvent,
  WizardSummary,
  WizardUpdate,
  HousePoints,
  NonHealingCategory,
  ArrayElement,
  SpellOutput,
  SpellCastParameters,
  SpellCastReturn,
  AttackSpell,
  AcademyStatistics
} from "./types.js";


// =====================================
// PART A : ORIGINAL WORK
// =====================================

// Omit - Add wizards

const wizard1 = addWizard({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true
});

const wizard2 = addWizard({
  name: "Hermione Granger",
  house: "Gryffindor",
  level: 8,
  active: true
});

const wizard3 = addWizard({
  name: "Draco Malfoy",
  house: "Slytherin",
  level: 4,
  active: true
});

const wizard4 = addWizard({
  name: "Luna Lovegood",
  house: "Ravenclaw",
  level: 6,
  active: false
});

console.log("=== TOUS LES SORCIERS ===");
console.log(wizards);


// Generic filter

const gryffindors = filterBy(
  wizards,
  "house",
  "Gryffindor"
);

console.log("=== SORCIERS DE GRYFFINDOR ===");
console.log(gryffindors);


// Pick

const harrySummary: WizardSummary = {
  name: wizard1.name,
  house: wizard1.house
};

console.log("=== RESUME DE HARRY ===");
console.log(harrySummary);


// Partial

const hermioneUpdate: WizardUpdate = {
  level: 10,
  active: true
};

console.log("=== MODIFICATION PREPAREE ===");
console.log(hermioneUpdate);


// Record

const housePoints: HousePoints = {
  Gryffindor: 150,
  Slytherin: 120,
  Ravenclaw: 100,
  Hufflepuff: 90
};

console.log("=== POINTS DES MAISONS ===");
console.log(housePoints);


// Spell

const spell1: Spell = {
  id: 1,
  name: "Expelliarmus",
  category: "attack",
  power: 50
};

const spell2: Spell = {
  id: 2,
  name: "Protego",
  category: "defense",
  power: 40
};

const spell3: Spell = {
  id: 3,
  name: "Episkey",
  category: "healing",
  power: 30
};

console.log("=== SORTS MAGIQUES ===");
console.log([spell1, spell2, spell3]);


// Exclude

const allowedCategory: NonHealingCategory = "attack";

console.log("=== CATEGORIE SANS SOIN ===");
console.log(allowedCategory);


// Extract

const event1: SpellEvent = {
  type: "spell_cast",
  wizardId: 1,
  spell: "Expelliarmus"
};

const event2: SpellEvent = {
  type: "spell_failed",
  wizardId: 2,
  reason: "Puissance insuffisante"
};

console.log("=== EVENEMENTS DE SORTS ===");
console.log(event1);
console.log(event2);


// ValidatePower

class SpellCaster {
  @ValidatePower
  cast(power: number): void {
    console.log(
      `Sort lancé avec une puissance de ${power}`
    );
  }
}

const caster = new SpellCaster();

caster.cast(50);
caster.cast(0);

try {
  caster.cast(-10);
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}


// Cache

class SpellCalculator {
  @Cache
  calculate(power: number): number {
    console.log("Calcul en cours...");
    return power * 2;
  }
}

const calculator = new SpellCalculator();

console.log(calculator.calculate(50));
console.log(calculator.calculate(50));
console.log(calculator.calculate(20));
console.log(calculator.calculate(50));


// isHouse

console.log("=== VALIDATION DES MAISONS ===");

console.log(isHouse("Gryffindor"));
console.log(isHouse("Barcelona"));
console.log(isHouse(123));

const userInput: unknown = "Ravenclaw";

if (isHouse(userInput)) {
  console.log("Maison valide :", userInput);
} else {
  console.log("Maison invalide");
}


// =====================================
// PART B : NEW PHASES
// =====================================


// PHASE 2 : GENERIC REPOSITORY

console.log("=== PHASE 2 : REPOSITORY ===");

const wizardRepository = new WizardRepository();

const newWizard = wizardRepository.add({
  name: "Neville Longbottom",
  house: "Gryffindor",
  level: 3,
  active: true
});

console.log("Added wizard:", newWizard);

console.log(
  "Find by ID:",
  wizardRepository.findById(newWizard.id)
);

console.log(
  "Update wizard:",
  wizardRepository.update(newWizard.id, {
    level: 7
  })
);

console.log(
  "All repository wizards:",
  wizardRepository.getAll()
);

const spellRepository = new SpellRepository();

const newSpell = spellRepository.add({
  name: "Lumos",
  category: "defense",
  power: 20
});

console.log("Added spell:", newSpell);

console.log(
  "Defense spells:",
  spellRepository.findByCategory("defense")
);


// PHASE 3 : ISWIZARD

console.log("=== PHASE 3 : ISWIZARD ===");

console.log(isWizard(wizard1));
console.log(isWizard({ name: "Unknown" }));
console.log(isWizard(null));


// PHASE 4 : DECORATORS
// Log and MeasureTime are used in AcademyService.


// PHASE 5 : ACADEMY SERVICE

console.log("=== PHASE 5 : ACADEMY SERVICE ===");

const academy = new AcademyService();

const student1 = academy.registerWizard({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true
});

const student2 = academy.registerWizard({
  name: "Luna Lovegood",
  house: "Ravenclaw",
  level: 6,
  active: false
});

const attackSpell = academy.registerSpell({
  name: "Expelliarmus",
  category: "attack",
  power: 50
});

academy.registerSpell({
  name: "Protego",
  category: "defense",
  power: 40
});

console.log(
  "Gryffindor wizards:",
  academy.findByHouse("Gryffindor")
);

console.log(
  "Updated Harry:",
  academy.updateWizard(student1.id, {
    level: 10
  })
);

console.log(
  "Successful spell:",
  academy.castSpell(student1.id, attackSpell.id)
);

console.log(
  "Failed spell:",
  academy.castSpell(student2.id, attackSpell.id)
);

console.log(
  "All events:",
  academy.getEvents()
);

console.log(
  "Spell events:",
  academy.getSpellEvents()
);


// PHASE 6 : ADVANCED TYPES

console.log("=== PHASE 6 : ADVANCED TYPES ===");

// infer
const firstSpell: ArrayElement<Spell[]> = spell1;
console.log("First spell:", firstSpell.name);

// Conditional type
const healingResult: SpellOutput<"healing"> =
  "health_restored";

console.log("Healing result:", healingResult);

// Parameters
const parameters: SpellCastParameters = [
  student1.id,
  attackSpell.id
];

console.log("Parameters:", parameters);

// ReturnType
const returnValue: SpellCastReturn = {
  type: "spell_cast",
  wizardId: student1.id,
  spell: attackSpell.name
};

console.log("Return value:", returnValue);

// Extract
const attackExample: AttackSpell = {
  id: 10,
  name: "Stupefy",
  category: "attack",
  power: 70
};

console.log("Attack spell:", attackExample);

// Index signature
const statistics: AcademyStatistics = {
  totalWizards: academy.getWizards().length,
  totalSpells: academy.getSpells().length,
  totalEvents: academy.getEvents().length
};

console.log("Statistics:", statistics);


// PHASE 7 : FINAL INTEGRATION

console.log("=== PHASE 7 : FINAL STATE ===");

console.log("Wizards:", academy.getWizards());
console.log("Spells:", academy.getSpells());
console.log("Events:", academy.getEvents());