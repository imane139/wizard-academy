"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wizards = [];
function addWizard(data) {
    const id = wizards.length + 1;
    const wizard = {
        id: id,
        name: data.name,
        house: data.house
    };
    wizards.push(wizard);
    return wizard;
}
const wizard1 = addWizard({
    name: "Harry Potter",
    house: "Gryffindor"
});
const wizard2 = addWizard({
    name: "Hermione Granger",
    house: "Gryffindor"
});
console.log(wizards);
//# sourceMappingURL=main.js.map