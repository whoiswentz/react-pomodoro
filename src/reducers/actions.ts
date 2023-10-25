import { Cycle } from "../models/cycle";
import { ActionType } from "./cycles/reducer";

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionType.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionType.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionType.INTERRUPT_CYCLE
  }
}