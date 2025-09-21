import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../data/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    dataDiNascita: "",
    password: "",
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

    const formToSend = new FormData();
    for (let key in formData) {
      formToSend.append(key, formData[key]);
    }
    if (avatarFile) {
      formToSend.append("avatarFile", avatarFile);
    }
    try {
      await register(formToSend);
      setMessage("Registrazione dell'autore completata!");
      navigate("/");
    } catch (error) {
      setMessage("Errore durante la registrazione.");
    }
  };

  return (
    <div>
      <h2>Crea un nuovo account</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
        </div>
        <div>
          <label>Cognome:</label>
          <input
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            placeholder="Cognome"
            required
          />
        </div>

        <div>
          <label>Data di nascita:</label>
          <input
            type="date"
            name="dataDiNascita"
            value={formData.dataDiNascita}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
        {avatarFile && (
          <div>
            <p>Anteprima Avatar:</p>
            <img
              src={avatarFile}
              alt="avatar"
              width="120"
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}
