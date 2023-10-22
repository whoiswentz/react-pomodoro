import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <TaskInput type="text" list="task-sugentions" id="task" placeholder="give a name for your project" />
          <datalist id="task-sugentions">
            <option value="Task 1" />
            <option value="Task 2" />
            <option value="Task 3" />
            <option value="Task 4" />
          </datalist>

          <label htmlFor="durationInMinutes">for</label>
          <MinuteInput type="number" id="durationInMinutes" placeholder="00" step={5} min={5} max={60} />
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}