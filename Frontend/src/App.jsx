import { useState } from "react";
import "./App.css";
import BNavbar from "./components/BNavbar";
import BFooter from "./components/BFooter";

function App() {
  return (
    <>
      <BrowserRouter>
        <BNavbar />
        <BFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
