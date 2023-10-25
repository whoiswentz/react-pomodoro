import { createContext, ReactNode, useState } from "react";
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

export const CycleContext = createContext<CycleContext>({} as CycleContext)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondPassed] = useState(0)
  
  const activeCycle = cycles.find(c => c.id === activeCycleId)
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(c => {
      if (c.id === activeCycleId)
        return { ...c, finishedDate: new Date() }
      return c
    }))
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())
    const startDate = new Date()
    const newCycle: Cycle = { id, task, minutesAmount, startDate }
    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondPassed(0)
  }

  

  function interruptCurrentCycle() {
    setCycles(state => state.map(c => {
      if (c.id === activeCycleId)
        return { ...c, interruptedDate: new Date() }
      return c
    }))
    setActiveCycleId(null)
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