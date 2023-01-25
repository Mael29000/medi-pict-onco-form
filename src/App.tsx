import React from "react";
import Form from "./pages/Form";
import { TraitmentsProvider } from "./contexts/TraitmentsContext";

function App() {
  return (
    <TraitmentsProvider>
      <div className="App">
        <Form />
      </div>
    </TraitmentsProvider>
  );
}

export default App;
