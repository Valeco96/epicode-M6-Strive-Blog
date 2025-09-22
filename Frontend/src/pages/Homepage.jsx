import { useEffect, useState } from "react";
import { getAllPosts } from "../data/post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SinglePost from "../components/SinglePost";

function Homepage({ token }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching posts...");
    let isMounted = true; // flag per evitare aggiornamenti su component smontato

    async function fetchPosts() {
      try {
        const postsFromAPI = await getAllPosts(); //passo il token, fa il check se il backend lo accetta oppure no
        console.log("Posts fetched from API:", postsFromAPI);
        if (isMounted) setPosts(postsFromAPI);
      } catch (error) {
        console.error("Errore nel fetch dei post:", error);
        setError("Errore nel recupero dei post.");
      }
    }

    fetchPosts();

    return () => {
      isMounted = false; // impedisce duplicati durante double-mount in dev
    };
  }, []);

  return (
    <Container className="mt-4">
      {error && <p className="text-danger">{error}</p>}
      {!token && (
        <>
          <h1 className="text-primary-emphasis m-5 pb-2">Benvenuto su Strive Blog!</h1>
        </>
      )}
      {token && (
        <>
          <h1>I post piú recenti:</h1>
        </>
      )}
      <Row className="align-items-stretch">
        {posts && posts.length === 0 && <p>Nessun post disponibile</p>}
        {posts &&
          posts.map((post) => (
            <Col key={post._id} sm={12} md={6} lg={4} className="mb-4">
              <SinglePost
                post={post}
                canEdit={!!localStorage.getItem("token")} // modifica ed eliminazione post protetta
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Homepage;
