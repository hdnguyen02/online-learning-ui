import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { AuthProvider } from "./context/AuthContext.jsx"
import { DeckProvider } from "./context/DeckContext.jsx"
import { YourLiblaryProvider } from "./context/YourLiblaryContext.jsx"
import App from "./App.jsx"


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <YourLiblaryProvider>
      <DeckProvider>
        <App />
      </DeckProvider>
    </YourLiblaryProvider>
  </AuthProvider>
)
