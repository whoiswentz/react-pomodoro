import { Cycle } from "../../models/cycle"

export type CycleState = {
  cycles: Cycle[],
  activeCycleId: string | null
}

export enum ActionType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE'
}

export function cycleReducer(state: CycleState, action: any): CycleState {
  switch (action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
      
    case ActionType.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(c => {
          if (c.id === state.activeCycleId)
            return { ...c, interruptedDate: new Date() }
          return c
        }),
        activeCycleId: null
      }
    case ActionType.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map(c => {
          if (c.id === state.activeCycleId)
            return { ...c, finishedDate: new Date() }
          return c
        }),
        activeCycleId: null
      }
    default:
      return state
  }
}