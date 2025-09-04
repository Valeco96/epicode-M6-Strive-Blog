import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SinglePost({ post, withLinks }) {
  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={post.cover} />
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
