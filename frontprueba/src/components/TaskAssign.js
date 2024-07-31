import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/StylesTask.css'; 
import logo from '../logoprueba.png'; 

const endpoint = 'http://localhost:3001';  

const TaskAssign = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pendiente');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${endpoint}/users`);
                const filteredUsers = response.data.filter(user => user.role.id === 1);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error al obtener usuarios', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/tasks`, {
                user: { id: selectedUser },
                title,
                description,
                dueDate,
                status
            });
            console.log(response.data);
            alert('Tarea asignada exitosamente'); 
            window.location.href = "/users";
        } catch (error) {
            console.error('Error al asignar la tarea', error);
            alert('Error en la asignación de tarea'); 
        }
    };

    return (
        <div className="task-page-container">
            <nav className="task-navbar">
                <div className="task-navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="task-navbar-links">
                    <li><a href='/login'>Inicio de Sesión</a></li>
                    <li><a href='/'>Registro</a></li>
                </ul>
            </nav>
            <main className="task-content">
                <div className="task-container">
                    <h2>Asignación de Tareas</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="task-form-group">
                            <label htmlFor="user">Usuario</label>
                            <select id="user" name="user" required 
                                    value={selectedUser} 
                                    onChange={(e) => setSelectedUser(e.target.value)}>
                                <option value="">Seleccione un usuario</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="task-form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" id="title" name="title" required 
                                   value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="task-form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea id="description" name="description" required 
                                      value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="task-form-group">
                            <label htmlFor="dueDate">Fecha de Entrega</label>
                            <input type="date" id="dueDate" name="dueDate" required 
                                   value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                        <div className="task-form-group">
                            <label htmlFor="status">Estado</label>
                            <select id="status" name="status" required 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}>
                                <option value="pendiente">Pendiente</option>
                                <option value="entregado">Entregado</option>
                            </select>
                        </div>
                        <div className="task-button-container">
                            <button type="submit">Asignar Tarea</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    ); 
};

export default TaskAssign;
