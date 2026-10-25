import type {
  House,
  NewWizard,
  Spell,
  Wizard
} from "./types.js";


// =====================================
// ORIGINAL FUNCTIONS
// =====================================

export const wizards: Wizard[] = [];

export function addWizard(data: NewWizard): Wizard {
  const id =
    Math.max(0, ...wizards.map(wizard => wizard.id)) + 1;

  const wizard: Wizard = {
    id,
    name: data.name,
    house: data.house,
    level: data.level,
    active: data.active
  };

  wizards.push(wizard);

  return wizard;
}

export function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] {
  return items.filter(item => item[key] === value);
}

export function isHouse(value: unknown): value is House {
  return (
    value === "Gryffindor" ||
    value === "Slytherin" ||
    value === "Ravenclaw" ||
    value === "Hufflepuff"
  );
}


// =====================================
// PHASE 3 : TYPE GUARD
// =====================================

export function isWizard(value: unknown): value is Wizard {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const wizard = value as Record<string, unknown>;

  return (
    typeof wizard.id === "number" &&
    Number.isInteger(wizard.id) &&
    wizard.id > 0 &&
    typeof wizard.name === "string" &&
    isHouse(wizard.house) &&
    typeof wizard.level === "number" &&
    Number.isFinite(wizard.level) &&
    typeof wizard.active === "boolean"
  );
}


// =====================================
// PHASE 2 : GENERIC REPOSITORY
// =====================================

export class Repository<T extends { id: number }> {
  private readonly items: T[] = [];
  private nextId = 1;

  add(data: Omit<T, "id">): T {
    const item = {
      ...data,
      id: this.nextId++
    } as T;

    this.items.push(item);

    return { ...item };
  }

  findById(id: number): T | undefined {
    const item = this.items.find(
      element => element.id === id
    );

    return item ? { ...item } : undefined;
  }

  getAll(): T[] {
    return this.items.map(item => ({ ...item }));
  }

  update(
    id: number,
    changes: Partial<Omit<T, "id">>
  ): T | undefined {
    const index = this.items.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return undefined;
    }

    const {
      id: ignoredId,
      ...safeChanges
    } = changes as Partial<T>;

    const updated = {
      ...this.items[index]!,
      ...safeChanges,
      id
    } as T;

    this.items[index] = updated;

    return { ...updated };
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }
}


// =====================================
// WIZARD REPOSITORY
// =====================================

export class WizardRepository extends Repository<Wizard> {
  findByHouse(house: House): Wizard[] {
    return filterBy(this.getAll(), "house", house);
  }
}


// =====================================
// SPELL REPOSITORY
// =====================================

export class SpellRepository extends Repository<Spell> {
  findByCategory(category: Spell["category"]): Spell[] {
    return filterBy(
      this.getAll(),
      "category",
      category
    );
  }
}