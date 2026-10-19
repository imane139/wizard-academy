export interface Wizard {
    id: number;
    name: string;
    house: string;
}
export type NewWizard = Omit<Wizard, "id">;
//# sourceMappingURL=types.d.ts.map