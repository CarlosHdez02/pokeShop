import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
