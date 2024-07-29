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
                console.error('Error al obtener usuarios', error);
            });
    }, []);

    return (
        <div className="page-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="navbar-links">
                    <li><a href='/login'>Inicio de Sesión</a></li>
                    <li><a href='/'>Registro</a></li>
                    <li><a href='/crud'>Usuarios</a></li>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default CrudUsers;
