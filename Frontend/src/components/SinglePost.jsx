import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function SinglePost({ post, withLinks, canEdit }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/PostForm/${post._id}`); //naviga al form per modificare il post
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro/a di voler eliminare questo post?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await deletePost(post._id, token); //richiamo della funzione axios
      if (response) {
        alert("Il Post é stato eliminato.");
        window.location.reload(); //ricarica la pagina per aggiornare il post
        } else {
          alert("Errore nell'eliminazione del post.")
        }
      } catch (error) {
      console.error(error);
      alert("Errore nella richiesta di eliminazione del post.");
    }
  };

  return (
    <Col>
      <Card style={{ height: "100%" }}>
        <Card.Img
          id="card-img"
          alt={post.titolo}
          variant="top"
          src={post.cover}
        />
        <Card.Body>
          <Card.Title>{post.titolo}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.categoria}
          </Card.Subtitle>
          <Card.Text>
            <strong>Autore:</strong> {post.autore}
          </Card.Text>
          <Card.Text>{post.descrizione}</Card.Text>
          <Card.Text>
            <em>
              Tempo di lettura: {post.readTime.value} {post.readTime.unit}
            </em>
          </Card.Text>
          {canEdit && (
            <>
              <Button variant="warning" onClick={handleEdit} className="me-2">
                Modifica
              </Button>
              <Button variant="danger" onClick={handleDelete}>
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
