import { HistoryContainer, HistoryList, TaskStatus } from "./styles";

export function History() {
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
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td>
                <TaskStatus statusColor="red">Finished</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td><TaskStatus statusColor="red">Finished</TaskStatus></td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td><TaskStatus statusColor="red">Finished</TaskStatus></td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td><TaskStatus statusColor="red">Finished</TaskStatus></td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td><TaskStatus statusColor="red">Finished</TaskStatus></td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 Minutes</td>
              <td>2 Months</td>
              <td><TaskStatus statusColor="red">Finished</TaskStatus></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}