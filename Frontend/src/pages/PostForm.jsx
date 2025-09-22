import Form from "react-bootstrap/Form";
import { createPost, editPost, getSinglePost } from "../data/post";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PostForm({ token }) {
  const { id } = useParams();
  const isEdited = !!id; // true se stiamo modificando il post

  const [formData, setFormData] = useState({
    titolo: "",
    categoria: "",
    autore: "",
    descrizione: "",
    readTime: {
      value: "",
      unit: "",
    },
  });

  const [cover, setCover] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //precompilazione dati se stiamo modificando
  useEffect(() => {
    if (isEdited) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token"); //recupero il token
          const data = await getSinglePost(id, token); //restituisce direttamente response
          console.log("Post ricevuto:", data);

          if (!data) {
            console.error("Nessun post trovato.");
            return;
          }

          setFormData({
            titolo: data.titolo,
            categoria: data.categoria,
            autore: data.autore,
            descrizione: data.descrizione,
            readTime: data.readTime || { value: "", unit: "" },
          });
        } catch (error) {
          console.error("Errore nel caricamento del post:", error);
        }
      };
      fetchData();
    }
  }, [id, isEdited, token]);

  const handleChange = (e) => {
    if (e.target.name == "value" || e.target.name == "unit") {
      setFormData({
        ...formData,
        readTime: {
          ...formData.readTime,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;
      const token = localStorage.getItem("token"); //recupero il token

      if (!isEdited) {
        const response = await createPost(formData, token);
        data = response; //assumendo che createPost ritorni response.data
        console.log("Post creato:", data);
        alert("Post pubblicato con successo!");
         navigate("/");

         if (!token) {
          alert("Solo gli account registrati possono pubblicare un post!");
         }
      } else {
        const response = await editPost(id, formData, token); //restituisce direttamente response
        data = response;
        console.log("Post modificato:", data);
        alert("Post modificato con successo!");
        navigate("/");
      }

      //Aggiornamento della cover se selezionata
      if (cover) {
        const formCover = new FormData();
        formCover.append("cover", cover);

        const coverRes = await fetch(
          `http://localhost:4000/posts/${data._id}/cover`,
          {
            method: "PATCH",
            body: formCover,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!coverRes.ok)
          throw new Error("Errore nell'aggiornamento della cover.");

        const coverData = await coverRes.json();
        setFormData((prev) => ({ ...prev, cover: coverData.cover }));
        setMessage("Cover aggiornata con successo");
      }
    } catch (error) {
      console.error("Errore nel caricamento del post:", error);
      setMessage("Errore nel caricamento del post.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-5">
      <Form.Group className="mb-3">
        <Form.Label>Titolo del blog:</Form.Label>
        <Form.Control
          name="titolo"
          value={formData.titolo}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoria:</Form.Label>
        <Form.Control
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Autore:</Form.Label>
        <Form.Control
          name="autore"
          value={formData.autore}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descrizione del post:</Form.Label>
        <Form.Control
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Copertina del blog:</Form.Label>
        <Form.Control
          name="cover"
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tempo di lettura:</Form.Label>
        <Form.Control
          type="number"
          name="value"
          value={formData.readTime.value}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tempo in minuti/ore:</Form.Label>
        <Form.Control
          name="unit"
          value={formData.readTime.unit}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className="mt-3" type="submit">{isEdited ? "Aggiorna Post" : "Crea Post"}</Button>
      {message && <p>{message}</p>}
    </Form>
  );
}

export default PostForm;
