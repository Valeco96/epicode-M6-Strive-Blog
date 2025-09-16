import Form from "react-bootstrap/Form";
import { createPost } from "../data/post";
import { Button } from "react-bootstrap";
import { useState, useParams } from "react";

function AddPost() {
  //const { id } = useParams;
  // isEdited = !!id;

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

  //const fetchPost = async () => {
  //try {
  //const post = await axios.get(`/posts/${id}`);
  //console.log("Stiamo modificando:", post);
  //setFormData({ autore: post.data.autore, ...post.data });
  //} catch (error) {
  //  console.log("Errore nell'identificazione del post da modificare", error);
  //}
  //};
  //useEffect(() => {
  //if (isEdited && id) {
  //fetchPost();
  //} else {
  //setFormData({
  //titolo: "",
  // categoria: "",
  // autore: "",
  // descrizione: "",
  // readTime: {
  // value: "",
  // unit: "",
  //  },
  // }),
  //   [isEdited, id];
  //  }
  //});

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

    const result = await createPost(formData);
    console.log(result);
    if (result) {
      alert("Post pubblicato con successo!");
    } else {
      alert("Errore nella creazione del post.");
    }
  };

  const [cover, setCover] = useState();

  const addCover = (e) => {
    setCover(e.target.files[0]);
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
          type="file"
          value={formData.cover}
          onChange={addCover}
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
      <Button onClick={handleSubmit}>Crea post</Button>
    </Form>
  );
}

export default AddPost;
