import React, { useState } from "react";
import "../Styles/StylesLogin.css";
import logo from "../logoprueba.png";
import axios from "axios";

const endpoint = "http://localhost:3004/users"; // Cambia el puerto según sea necesario

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email,
        password,
      });
      console.log(response.data); // Maneja la respuesta aquí
      // Redirige al usuario según la respuesta
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <a href="/">Registro</a>
          </li>
        </ul>
      </nav>
      <main className="content">
        <div className="login-container">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit">Iniciar Sesión</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
