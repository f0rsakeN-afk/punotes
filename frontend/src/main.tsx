import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scroll.css"
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/themeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
