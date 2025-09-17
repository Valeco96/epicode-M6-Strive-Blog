import Form from "react-bootstrap/Form";
import { createPost } from "../data/post";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostForm({ token }) {
  const { id } = useParams();
  const postId = id; // se esiste -> PATCH, se non esiste -> POST

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

  const [cover, setCover] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (postId) {
      const response = fetch(`http://localhost:4000/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            titolo: data.titolo,
            categoria: data.categoria,
            autore: data.autore,
            descrizione: data.descrizione,
            readTime: data.readTime || { value: "", unit: "" },
          });
        })
        .catch((error) => console.error(error));
    }
  }, [postId]);

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
      let response, data;

      if (!postId) {
        const result = await createPost(formData);
        console.log(result);
        if (result) {
          alert("Post pubblicato con successo!");
        } else {
          alert("Errore nella creazione del post.");
        }
      } else {
        await fetch(`http://localhost:4000/posts/${postId}`, {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio del post.");
      }

      data = await response.json();
      setMessage("Post salvato con successo");

      //Aggiornamento della cover se selezionata
      if (cover) {
        const formCover = new FormData();
        formCover.append("cover", cover);
      }

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
    } catch (error) {
      response
        .status(500)
        .json({ message: "Errore nel caricamento del post." });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button type="submit">{postId ? "Aggiorna Post" : "Crea Post"}</Button>
      {message && <p>{message}</p>}
    </Form>
  );
}

export default PostForm;
