import { useState } from "react";
import Dropdown from "./Components/Dropdown";

import "./App.css";

function App() {
  const [selected, setSelected] = useState([]);
  const [multiSelected, setMultiSelected] = useState([]);

  // Test data
  const data = [
    { id: 1, title: "option 1" },
    { id: 2, title: "option 2" },
    { id: 3, title: "option 3" },
    { id: 4, title: "option 4" },
    { id: 5, title: "option 5" },
  ];

  return (
    <div className="App">
      <Dropdown options={data} selected={selected} setSelected={setSelected} />
      <Dropdown
        options={data}
        isMultiSelect={true}
        selected={multiSelected}
        setSelected={setMultiSelected}
      />
    </div>
  );
}

export default App;
