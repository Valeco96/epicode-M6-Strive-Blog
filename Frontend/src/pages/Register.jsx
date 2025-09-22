import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { register } from "../data/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    dataDiNascita: "",
    password: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //gestione cambi nei campi di input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Gestione dell'upload dell'avatar
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
    //Anteprima
    setAvatarFile(URL.createObjectURL(e.target.files[0]));
  };

  // Creazione o aggiornamento autore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creo FormData da inviare al backend
    const formToSend = new FormData();

    //Aggiungo i campi del form
    for (let key in formData) {
      formToSend.append(key, formData[key]);
    }

    if (avatarFile) {
      formToSend.append("avatar", avatarFile);
    }

    try {
      //Chiamo la funzione di axios di registrazione
      const data = await register(formToSend); //chiamo la funzione axios

      //Messaggio di conferma e navigazione
      setMessage("Registrazione dell'autore completata!");
      console.log("Dati registrazione:", data);

      navigate("/");
    } catch (error) {
      setMessage("Errore durante la registrazione:", error);
      setMessage(
        // cattura eventuali messaggi dal backend
        error.response?.data?.message ||
          "Errore durante la registrazione. Controlla i campi e riprova."
      );
    }
  };

  return (
    <div className="wrapper">
      <h2>Crea un nuovo account</h2>
      {message && <p>{message}</p>}
      <Form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
        </div>
        <div className="mb-3">
          <Form.Label>Cognome:</Form.Label>
          <Form.Control
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            placeholder="Cognome"
            required
          />
        </div>

        <div className="mb-3">
          <Form.Label>Data di nascita:</Form.Label>
          <Form.Control
            type="date"
            name="dataDiNascita"
            value={formData.dataDiNascita}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <Form.Label>Avatar:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        {avatarFile && (
          <div className="mb-5">
            <p>Anteprima Avatar:</p>
            <img
              src={avatarFile}
              alt="avatar"
              width="120"
              style={{ borderRadius: "20%", border: "1px solid #052C65" }}
            />
          </div>
        )}
        <div className="d-grid gap-2 mt-5">
          <Button size="lg" type="submit">
            Registrati
          </Button>
        </div>
      </Form>
    </div>
  );
}
