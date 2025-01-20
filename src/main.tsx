import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthenticatedProvider } from "./lib/context/AuthenticatedProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthenticatedProvider>
      <App />
    </AuthenticatedProvider>
  </StrictMode>
);
