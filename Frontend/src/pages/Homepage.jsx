import { useEffect, useState } from "react";
import { getAllPosts } from "../data/post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const resultPost = await getAllPosts();
    setPosts(resultPost.data);
  }

  return (
    <Container>
      <Row>
        {posts && (
          <>
            {posts.map((post) => (
              <Col key={post._id}>
                <SinglePost post={post} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}

export default Homepage;
