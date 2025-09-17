import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AuthorForm({ token }) {
  const { id } = useParams(); //id dell'autore quando lo riceviamo
  const authorId = id; // lo passiamo alla logica del form

  //Stato dei campi
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [avatar, setAvatar] = useState(""); //URL dell'immagine attuale
  const [avatarFile, setAvatarFile] = useState(null); //file selezionato
  const [message, setMessage] = useState("");

  //se authorId é presente, carica i dati esistenti
  useEffect(() => {
    if (authorId) {
      const response = fetch(`http://localhost:4000/authors/${authorId}`, {
        header: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNome(data.nome);
          setCognome(data.cognome);
          setEmail(data.email);
          setDataDiNascita(data.dataDiNascita);
          setAvatar(data.avatar);
        })
        .catch((err) => console.error(err));
    }
  }, [authorId, token]);

  //Gestione dell'upload dell'avatar
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
    //Anteprima
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  // Creazione o aggiornamento autore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response, data;

      if (!authorId) {
        // Creazione nuovo autore
        response = await fetch("http://localhost:4000/authors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, cognome, email, dataDiNascita }),
        });
        if (!response.ok) {
          // Qui provo a leggere il messaggio di errore
          const errorText = await response.text();
          throw new Error(errorText || "Errore nella richiesta");
        }

        data = await response.json();
        console.log("Autore creato", data);
      } else {
        // Aggiornamento dati (senza avatar)
        response = await fetch(`http://localhost:4000/authors/${authorId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nome, cognome, email, dataDiNascita }),
        });
        data = await response.json();
      }

      setMessage("Dati salvati con successo!");

      // Se c'è un file avatar selezionato, aggiorna avatar
      if (avatarFile && data._id) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await fetch(
          `http://localhost:4000/authors/${data._id}/avatar`,
          {
            method: "PATCH",
            body: formData,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Errore durante l'aggiornamento");
        }

        const avatarData = await avatarRes.json();
        setAvatar(avatarData.avatar);
        setMessage("Avatar aggiornato con successo!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Errore durante il salvataggio dei dati.");
    }
  };

  return (
    <div>
      <h2>{authorId ? "Modifica Autore" : "Crea Nuovo Autore"}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cognome:</label>
          <input
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data di nascita:</label>
          <input
            type="date"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
        {avatar && (
          <div>
            <p>Anteprima Avatar:</p>
            <img
              src={avatar}
              alt="avatar"
              width="120"
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
        <button type="submit">{authorId ? "Aggiorna" : "Crea"}</button>
      </form>
    </div>
  );
}
