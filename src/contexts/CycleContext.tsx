import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle } from "../models/cycle";
import { createNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/actions";
import { cycleReducer, CycleState } from "../reducers/cycles/reducer";

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

export const CycleContext = createContext<CycleContext>({} as CycleContext)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(cycleReducer, {
    cycles: [],
    activeCycleId: null
  }, (initialState: CycleState) => {
    const storedCycleState = localStorage.getItem('@react-pomodoro:cycle-state:1.0.0')
    if (storedCycleState) {
      return JSON.parse(storedCycleState)
    }
    return initialState
  })
  
  const {cycles, activeCycleId} = cycleState  
  const activeCycle = cycles.find(c => c.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)
    localStorage.setItem('@react-pomodoro:cycle-state:1.0.0', stateJSON)
  })
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())
    const startDate = new Date()
    const newCycle: Cycle = { id, task, minutesAmount, startDate }
    dispatch(createNewCycleAction(newCycle))
    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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