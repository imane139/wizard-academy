import type { Wizard, NewWizard } from "./types.js";
export declare const wizards: Wizard[];
export declare function addWizard(data: NewWizard): Wizard;
export declare function filterBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[];
//# sourceMappingURL=repository.d.ts.map