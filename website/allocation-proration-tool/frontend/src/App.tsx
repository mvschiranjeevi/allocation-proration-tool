import React from "react";
import AllocationForm from "./components/allocation-page";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center app-background">
      <AllocationForm />
    </div>
  );
};

export default App;
