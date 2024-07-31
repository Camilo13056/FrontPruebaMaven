import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../logoprueba.png";

import "../Styles/StylesEdit.css";
import axios from "axios";

const EditTasks = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const statuses = ["Pendiente", "Entregado"];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tasks/${id}`)
      .then((response) => {
        const taskData = response.data;
        setTitle(taskData.title);
        setDescription(taskData.description);
        setDueDate(taskData.dueDate);
        setStatus(taskData.status ? "Pendiente" : "Entregado");
      })
      .catch((error) => {
        console.error("Error al cargar la tarea:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title,
      description,
      dueDate,
      status: status === "entregado",
    };

    axios
      .put(`http://localhost:3001/tasks/${id}`, updatedTask)
      .then((response) => {
        alert("Tarea actualizada exitosamente");
        window.location.href = "/crudtasks";
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea", error);
        alert("Error al actualizar la tarea");
      });
  };

  return (
    <div className="edit-page-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <a href="/tasks">Tareas</a>
          </li>
        </ul>
      </nav>
      <main className="edit-content">
        <form onSubmit={handleSubmit} className="edit-form">
          <h1>Editar Tarea</h1>
          <div className="form-group-edit">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group-edit">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group-edit">
            <label htmlFor="dueDate">Fecha de Entrega</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group-edit">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {statuses.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button-save">
            Guardar Cambios
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditTasks;
