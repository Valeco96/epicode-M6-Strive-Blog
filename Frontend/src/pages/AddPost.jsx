import Form from "react-bootstrap/Form";
import { createPost } from "../data/post";
import { Button } from "react-bootstrap";
import { useState } from "react";

function AddPost() {
  const [formData, setFormData] = useState({
    titolo: "",
    categoria: "",
    autore: "",
    descrizione: "",
    cover: "",
    readTime: {
      value: "",
      unit: "",
    },
  });

  const handleChange = (e) => {
    if (e.target.name == "value" || e.target.name == "unit") {
      setFormData({
        ...formData.readTime,
        readTime: {
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

    const result = await createPost(formData);
    console.log(result);
  };

  return (
    <Form>
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
          value={formData.cover}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tempo di lettura:</Form.Label>
        <Form.Control
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tempo in minuti/ore:</Form.Label>
        <Form.Control
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        />
      </Form.Group>
      <Button onClick={handleSubmit}>Crea post</Button>
    </Form>
  );
}

export default AddPost;
