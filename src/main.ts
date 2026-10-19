import { wizards, addWizard, filterBy } from "./repository.js";
import type { SpellEvent } from "./types.js";


const wizard1 = addWizard({
  name: "Harry Potter",
  house: "Gryffindor"
});

const wizard2 = addWizard({
  name: "Hermione Granger",
  house: "Gryffindor"
});

const wizard3 = addWizard({
  name: "Draco Malfoy",
  house: "Slytherin"
});

const wizard4 = addWizard({
  name: "Luna Lovegood",
  house: "Ravenclaw"
});

console.log("Tous les sorciers :");
console.log(wizards);



const gryffindors = filterBy(wizards, "house", "Gryffindor");

console.log("Sorciers de Gryffindor :");
console.log(gryffindors);



// EXERCICE 3 : Événements de sorts

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

console.log(event1);
console.log(event2);