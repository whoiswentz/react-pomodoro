import { formatDistanceToNow } from 'date-fns';
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";
import { HistoryContainer, HistoryList, TaskStatus } from "./styles";

export function History() {
  const { cycles } = useContext(CycleContext);
  
  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Begin</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(c => {
              return (
                <tr key={c.id}>
                  <td>{c.task}</td>
                  <td>{c.minutesAmount} Minutes</td>
                  <td>{formatDistanceToNow(c.startDate, {addSuffix: true})}</td>
                  <td>
                    {c.finishedDate && <TaskStatus statusColor="green">Finished</TaskStatus>}
                    {c.interruptedDate && <TaskStatus statusColor="red">Interrupted</TaskStatus>}
                    {!c.finishedDate && !c.interruptedDate && <TaskStatus statusColor="yellow">In Progress</TaskStatus>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}