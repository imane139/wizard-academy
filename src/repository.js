export const wizards = [];
export function addWizard(data) {
    const id = wizards.length + 1;
    const wizard = {
        id: id,
        name: data.name,
        house: data.house
    };
    wizards.push(wizard);
    return wizard;
}
export function filterBy(items, key, value) {
    return items.filter((item) => item[key] === value);
}
//# sourceMappingURL=repository.js.map