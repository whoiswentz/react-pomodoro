import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CycleContextProvider } from "./contexts/CycleContext";
import { GlobalStyle } from "./global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/theme/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
