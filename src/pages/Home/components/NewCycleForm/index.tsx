
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CycleContext } from '../../../../contexts/CycleContext';
import { FormContainer, MinuteInput, TaskInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()
  
  return (
    <FormContainer>
      <label htmlFor="task">I will work in</label>
      <TaskInput 
        type="text" 
        list="task-sugentions" 
        id="task" 
        placeholder="give a name for your project"
        disabled={!!activeCycle}
        {...register('task')}
      />
          
      <datalist id="task-sugentions">
        <option value="Task 1" />
        <option value="Task 2" />
        <option value="Task 3" />
        <option value="Task 4" />
      </datalist>

      <label htmlFor="durationInMinutes">for</label>
      <MinuteInput 
        type="number" 
        id="durationInMinutes" 
        placeholder="00" 
        step={5} 
        min={5} 
        max={60} 
        {...register('minutesAmount', { valueAsNumber: true })} 
      />
    </FormContainer>
  )
}