import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../data/post";
import { useEffect, useState } from "react";

function SinglePost({ post, withLinks, canEdit }) {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  //naviga via solo dopo che isDeleted diventa true
  useEffect(() => {
    if (isDeleted) {
      alert("Il post é stato eliminato.");
      navigate("/");
    }
  }, [isDeleted, navigate]);

  const handleEdit = () => {
    navigate(`/PostForm/${post._id}`); //naviga al form per modificare il post
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro/a di voler eliminare questo post?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await deletePost(post._id, token); //richiamo della funzione axios
      if (response) {
        setIsDeleted(true);
      } else {
        alert("Errore nell'eliminazione del post.");
      }
    } catch (error) {
      console.error(error);
      alert("Errore nella richiesta di eliminazione del post.");
    }
  };

  return (
    <Col>
      <Card
        style={{
          height: "100%",
          border: "1px solid #052C65",
          borderRadius: "5px",
        }}
      >
        <Card.Img
          id="card-img"
          alt={post.titolo}
          variant="top"
          src={post.cover}
        />
        <Card.Body>
          <Card.Title className="my-3" style={{ color: "#052C65" }}>
            {post.titolo}
          </Card.Title>
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ color: "#052C65" }}
          >
            {post.categoria}
          </Card.Subtitle>
          <Card.Text style={{ color: "#052C65" }}>
            <strong>Autore:</strong> {post.autore.nome}
            {post.autore.cognome}
          </Card.Text>
          <Card.Text style={{ color: "#052C65" }}>{post.descrizione}</Card.Text>
          <Card.Text style={{ color: "#052C65" }}>
            <em>
              Tempo di lettura: {post.readTime.value} {post.readTime.unit}
            </em>
          </Card.Text>
          {canEdit && (
            <>
              <Button
                variant="warning"
                onClick={() => handleEdit(post._id)}
                className="me-2"
              >
                Modifica
              </Button>
              <Button variant="danger" onClick={() => handleDelete(post._id)}>
                Elimina
              </Button>
            </>
          )}
        </Card.Body>
        {!withLinks && (
          <Card.Body>
            <Card.Link as={Link} to={`/posts/${post._id}`}>
              Mostra dettagli del post
            </Card.Link>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
}

export default SinglePost;
