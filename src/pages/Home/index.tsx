import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from "phosphor-react";
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CycleContext } from '../../contexts/CycleContext';
import { Coutdown } from './components/Coutdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please, inform the task'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CycleContext)
  
  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit,  watch, reset } = cycleForm

  const taskWatch = watch('task')
  const isSubmitDisabled = !taskWatch

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...cycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Coutdown />
        
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button" >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
        
      </form>
    </HomeContainer>
  )
}