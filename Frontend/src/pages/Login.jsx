import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../data/auth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const googleLogin = () => {
    //Reindirizza al backend che avvia OAuth
    window.location.href = import.meta.env.VITE_BASE_URL + "/auth/login-google";
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      //rimuove il query param dall'URL
      alert("Login effettuato con successo!");
      window.history.replace({}, document.title, "/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setMessage("Login effettuato con successo!");
      navigate("/"); // homepage loggata
    } catch (error) {
      setMessage("Email o password non corretti.");
    }
  };

  return (
    <div id="wrapper">
      <h2 style={{ color: "#052C65" }}>Accedi</h2>
      {message && <p>{message}</p>}
      <Form onSubmit={handleSubmit}>
        <div className="my-3">
          <Form.Label className="form-label">Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <Form.Label className="form-label">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid gap-2 col-8 mx-auto">
          <button className="btn btn-outline-primary" type="submit">
            Entra
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={googleLogin}
          >
            Login con Google
          </button>
        </div>
        <hr />
        <div className="login-footer my-4">
          <p>Non hai un account?</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/register")}
          >
            Crea un account
          </button>
        </div>
      </Form>
    </div>
  );
}
