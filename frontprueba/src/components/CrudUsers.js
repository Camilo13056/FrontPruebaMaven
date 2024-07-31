import React, { useEffect, useState } from "react";
import "../Styles/StylesCrud.css";
import axios from "axios";
import logo from "../logoprueba.png";
import "bootstrap-icons/font/bootstrap-icons.css"; 

const CrudUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId));
        alert("Usuario eliminado exitosamente");
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario", error);
        alert("Error al eliminar el usuario");
      });
  };

  const handleEdit = (userId) => {
    window.location.href = `/edit-user/${userId}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    if (searchCriteria === "name") {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCriteria === "phone") {
      return user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true; 
  });

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
        <li>
            <a href="/tasks">Tareas</a>
          </li>
          <li>
            <a href="/users">Usuarios</a>
          </li>
        </ul>
      </nav>
      <main className="content">
        <h1>Usuarios del Sistema</h1>
        <div className="search-bar">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select onChange={handleCriteriaChange} value={searchCriteria}>
              <option value="name">Nombre</option>
              <option value="phone">Teléfono</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.status ? "Activo" : "Inactivo"}</td>
                <td>
                  {typeof user.role === "object" ? user.role.name : user.role}
                </td>
                <td>
                  <button
                    className="button-editar"
                    onClick={() => handleEdit(user.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="button-eliminar"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CrudUsers;
