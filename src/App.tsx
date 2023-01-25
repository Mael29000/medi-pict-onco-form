import React from "react";
import Form from "./pages/Form";
import { TraitmentsProvider } from "./contexts/TraitmentsContext";
import Header from "./components/Header";

function App() {
  return (
    <TraitmentsProvider>
      <div className="App">
        <Header />
        <Form />
      </div>
    </TraitmentsProvider>
  );
}

export default App;
