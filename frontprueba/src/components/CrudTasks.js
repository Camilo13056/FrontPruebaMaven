import React, { useEffect, useState } from "react";
import "../Styles/StylesCrud.css";
import axios from "axios";
import logo from "../logoprueba.png";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importar Bootstrap Icons

const CrudTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3001/tasks/${taskId}`)
      .then((response) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        alert("Tarea eliminada exitosamente");
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea", error);
        alert("Error al eliminar la tarea");
      });
  };

  const handleEdit = (taskId) => {
    window.location.href = `/edittasks/${taskId}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (searchCriteria === "title") {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCriteria === "user") {
      return (
        task.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
        <h1>Tareas Asignadas</h1>
        <div className="search-bar">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select onChange={handleCriteriaChange} value={searchCriteria}>
              <option value="title">Título</option>
              <option value="user">Usuario</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de Entrega</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.status ? "Entregado" : "Pendiente"}</td>
                <td>
                  {task.user.name} {task.user.lastName}
                </td>
                <td>
                  <button
                    className="button-editar"
                    onClick={() => handleEdit(task.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="button-eliminar"
                    onClick={() => handleDelete(task.id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
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

export default CrudTasks;
