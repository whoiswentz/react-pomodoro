import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle } from "../models/cycle";

type CreateCycleData = {
  task: string;
  minutesAmount: number;
}

export type CycleContext = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

type CycleContextProviderProps = {
  children: ReactNode
}

type CycleState = {
  cycles: Cycle[],
  activeCycleId: string | null
}

export const CycleContext = createContext<CycleContext>({} as CycleContext)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id
          }
        case 'INTERRUPT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map(c => {
              if (c.id === state.activeCycleId)
                return { ...c, interruptedDate: new Date() }
              return c
            }),
            activeCycleId: null
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
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
    }, 
    {
      cycles: [],
      activeCycleId: null
    }
  )
  
  const {cycles, activeCycleId} = cycleState
  const [amountSecondsPassed, setAmountSecondPassed] = useState(0)
  
  const activeCycle = cycles.find(c => c.id === activeCycleId)
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())
    const startDate = new Date()
    const newCycle: Cycle = { id, task, minutesAmount, startDate }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setAmountSecondPassed(0)
  }

  

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId
      }
    })
  }

  return (
    <CycleContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      setSecondsPassed,
      markCurrentCycleAsFinished,
      createNewCycle,
      interruptCurrentCycle,
      amountSecondsPassed
    }}>
      {children}
    </CycleContext.Provider> 
  )
}