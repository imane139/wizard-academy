import { wizards, addWizard, filterBy, isHouse } from "./repository.js";
import type { SpellEvent } from "./types.js";
import { ValidatePower } from "./decorators.js";
import { Cache } from "./decorators.js";



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



class Spell {
  @ValidatePower
  cast(power: number): void {
    console.log(`Sort lancé avec une puissance de ${power}`);
  }
}

const spell = new Spell();

spell.cast(50);
spell.cast(0);

try {
  spell.cast(-10);
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}


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

console.log(isHouse("Gryffindor"));
console.log(isHouse("Barcelona"));
console.log(isHouse(123));