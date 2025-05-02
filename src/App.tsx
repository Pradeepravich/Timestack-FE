import { store } from "./redux/store";
import { Provider } from "react-redux";
import ThemeConfig from "./components/ThemeConfig";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <CssBaseline enableColorScheme />
        <SnackbarProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeConfig>
    </Provider>
  );
}

export default App;
