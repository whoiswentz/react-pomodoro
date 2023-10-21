import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { GlobalStyle } from "./global";
import { defaultTheme } from "./styles/theme/default";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Button color='primary' />
      <Button color='secondary' />
      <Button color='success' />
      <Button color='danger' />
      <Button />
    </ThemeProvider>
  )
}
