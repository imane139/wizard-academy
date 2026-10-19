import type { Wizard, NewWizard } from "./types.js";

export const wizards: Wizard[] = [];

export function addWizard(data: NewWizard): Wizard {
  const id = wizards.length + 1;

  const wizard: Wizard = {
    id: id,
    name: data.name,
    house: data.house
  };

  wizards.push(wizard);

  return wizard;
}

export function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] {
  return items.filter((item) => item[key] === value);
}