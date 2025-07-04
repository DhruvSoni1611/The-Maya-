import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CustomCursor from "./components/CustomCursor.jsx";
import { dark } from "@clerk/themes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    appearance={{
      baseTheme: dark,
    }}
  >
    <BrowserRouter>
      <CustomCursor type="dot-ring" />
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ClerkProvider>
);
