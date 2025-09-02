import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function SinglePost({ post, withLinks }) {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={post.cover} />
            <Card.Body>
              <Card.Title>{post.titolo}</Card.Title>
              <Card.Title>{post.categoria}</Card.Title>
              <Card.Text>{post.autore}</Card.Text>
              <Card.Text>{post.descrizione}</Card.Text>
              <Card.Text>{post.readTime.value}</Card.Text>
            </Card.Body>
            {!withLinks && (
              <Card.Body>
                <Card.Link to={`/posts/${post._id}`} as={Link}>
                  Mostra dettagli del post
                </Card.Link>
              </Card.Body>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SinglePost;
