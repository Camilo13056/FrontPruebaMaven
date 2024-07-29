import React, { useEffect, useState } from 'react';
import '../Styles/StylesCrud.css'; 
import axios from 'axios';
import logo from '../logoprueba.png';

const CrudUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users') 
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:3001/users/${userId}`)
            .then(response => {
                setUsers(users.filter(user => user.id !== userId));
                alert('Usuario eliminado exitosamente');
            })
            .catch(error => {
                console.error('Error al eliminar el usuario', error);
                alert('Error al eliminar el usuario');
            });
    };

    const handleEdit = (userId) => {
        window.location.href = `/edit-user/${userId}`;
    };

    return (
        <div className="page-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="navbar-links">
                    <li><a href='/users'>Usuarios</a></li>
                </ul>
            </nav>
            <main className="content">
                <h1>Usuarios Registrados</h1>
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
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.status ? 'Activo' : 'Inactivo'}</td>
                                <td>{typeof user.role === 'object' ? user.role.name : user.role}</td> {/* Ajuste aquí */}
                                <td>
                                    <button className="button-editar" onClick={() => handleEdit(user.id)}>Editar</button>
                                    <button className="button-eliminar" onClick={() => handleDelete(user.id)}>Eliminar</button>
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
