import type {
    AcademyEvent,
    House,
    NewSpell,
    NewWizard,
    Spell,
    SpellEvent,
    Wizard,
    WizardUpdate
  } from "./types.js";
  
  import {
    SpellRepository,
    WizardRepository
  } from "./repository.js";
  
  import {
    Log,
    MeasureTime
  } from "./decorators.js";
  
  
  // =====================================
  // PHASE 5 : ACADEMY SERVICE
  // =====================================
  
  export class AcademyService {
    private readonly events: AcademyEvent[] = [];
  
    constructor(
      private readonly wizardRepository =
        new WizardRepository(),
  
      private readonly spellRepository =
        new SpellRepository()
    ) {}
  
    registerWizard(data: NewWizard): Wizard {
      const wizard = this.wizardRepository.add(data);
  
      this.events.push({
        type: "house_joined",
        wizardId: wizard.id,
        house: wizard.house
      });
  
      return wizard;
    }
  
    registerSpell(data: NewSpell): Spell {
      return this.spellRepository.add(data);
    }
  
    getWizards(): Wizard[] {
      return this.wizardRepository.getAll();
    }
  
    getSpells(): Spell[] {
      return this.spellRepository.getAll();
    }
  
    findByHouse(house: House): Wizard[] {
      return this.wizardRepository.findByHouse(house);
    }
  
    updateWizard(
      id: number,
      changes: WizardUpdate
    ): Wizard | undefined {
      const before = this.wizardRepository.findById(id);
  
      const updated = this.wizardRepository.update(
        id,
        changes
      );
  
      if (
        before &&
        updated &&
        updated.level > before.level
      ) {
        this.events.push({
          type: "level_up",
          wizardId: id,
          newLevel: updated.level
        });
      }
  
      return updated;
    }
  
    @Log
    @MeasureTime
    castSpell(
      wizardId: number,
      spellId: number
    ): AcademyEvent {
      const wizard =
        this.wizardRepository.findById(wizardId);
  
      const spell =
        this.spellRepository.findById(spellId);
  
      if (!wizard || !spell || !wizard.active) {
        const event: AcademyEvent = {
          type: "spell_failed",
          wizardId,
          reason: "Wizard or spell unavailable"
        };
  
        this.events.push(event);
  
        return event;
      }
  
      const event: AcademyEvent = {
        type: "spell_cast",
        wizardId,
        spell: spell.name
      };
  
      this.events.push(event);
  
      return event;
    }
  
    getEvents(): AcademyEvent[] {
      return [...this.events];
    }
  
    getSpellEvents(): SpellEvent[] {
      return this.events.filter(
        (event): event is SpellEvent =>
          event.type === "spell_cast" ||
          event.type === "spell_failed"
      );
    }
  }