import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BNavbar from "./components/BNavbar";
import BFooter from "./components/BFooter";
import Homepage from "./pages/Homepage";
import PostDetails from "./pages/PostDetails";
import PostForm from "./pages/PostForm";
import AuthorForm from "./pages/AuthorForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <BNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<AuthorForm />} />
          {/*Creazione di un nuovo autore - POST */}
          <Route path="/AuthorForm" element={<AuthorForm />} />
          {/*Modifica di un autore esistente - PATCH */}
          <Route path="/AuthorForm/:id" element={<AuthorForm />} />
          <Route path="/PostForm" element={<PostForm />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
        <BFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
