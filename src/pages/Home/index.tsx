import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from "./styles";

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please, inform the task'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>;

export function Home() {
  const {
    register, 
    handleSubmit, 
    watch,
    reset,
  } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const taskWatch = watch('task')

  const isSubmitDisabled = !taskWatch

  function handleCreateTask(data: NewTaskFormData) {
    console.log(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateTask)} action="">
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <TaskInput 
            type="text" 
            list="task-sugentions" 
            id="task" 
            placeholder="give a name for your project" 
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

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}