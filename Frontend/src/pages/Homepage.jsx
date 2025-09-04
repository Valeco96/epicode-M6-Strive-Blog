import { useEffect, useState } from "react";
import { getAllPosts } from "../data/post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SinglePost from "../components/SinglePost";

function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Fetching posts...");
    let isMounted = true; // flag per evitare aggiornamenti su component smontato

    async function fetchPosts() {
      try {
        const postsFromAPI = await getAllPosts();
        console.log("Posts fetched from API:", postsFromAPI);
        if (isMounted) setPosts(postsFromAPI);
      } catch (error) {
        console.error("Errore nel fetch dei post:", error);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false; // impedisce duplicati durante double-mount in dev
    };
  }, []);

  return (
    <Container className="mt-4">
      <Row className="align-items-stretch">
        {posts.length === 0 && <p>Nessun post disponibile</p>}
        {posts.map((post) => (
          <Col key={post._id} sm={12} md={6} lg={4} className="mb-4">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Homepage;
