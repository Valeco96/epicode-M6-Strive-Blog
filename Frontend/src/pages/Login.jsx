import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../data/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const googleLogin = () => {
    window.location.href =
      import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GOOGLE_PATH;
  };

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
    <div className="py-5">
      <h2>Accedi</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entra</button>
        <button type="submit" onClick={googleLogin}>
          Login con Google
        </button>
        <div className="login-footer my-4">
          <p>Non hai un account?</p>
          <button onClick={() => navigate("/register")}>Crea un account</button>
        </div>
      </form>
    </div>
  );
}
