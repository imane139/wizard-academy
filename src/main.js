import { wizards, addWizard, filterBy } from "./repository.js";
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
//# sourceMappingURL=main.js.map