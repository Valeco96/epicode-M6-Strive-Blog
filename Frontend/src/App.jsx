import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BNavbar from "./components/BNavbar";
import BFooter from "./components/BFooter";
import Homepage from "./pages/Homepage";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <BNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
        <BFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
