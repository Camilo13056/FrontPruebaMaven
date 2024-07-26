import React, { useEffect, useState } from 'react';
import '../Styles/StylesCrud.css'; 
import axios from 'axios';
import logo from '../logoprueba.png'; // Asegúrate de que la ruta sea correcta

const CrudUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState(['usuario', 'admin', 'superadmin']); // Opciones de roles
    const [statuses, setEstados] = useState([{ value: true, label: 'Activo' }, { value: false, label: 'Inactivo' }]); // Opciones de estados

    useEffect(() => {
        axios.get('http://localhost:3001/users') 
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleRoleChange = (userId, newRole) => {
        axios.put(`http://localhost:3001/users/${userId}`, { role: newRole })
            .then(response => {
                setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
                alert('Rol actualizado exitosamente');
            })
            .catch(error => {
                console.error('Error updating role:', error);
                alert('Error al actualizar el rol');
            });
    };

    const handleStatusChange = (userId, newStatus) => {
        axios.put(`http://localhost:3001/users/${userId}`, { status: newStatus })
            .then(response => {
                setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
                alert('Estado actualizado exitosamente');
            })
            .catch(error => {
                console.error('Error updating status:', error);
                alert('Error al actualizar el estado');
            });
    };

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:3001/users/${userId}`)
            .then(response => {
                setUsers(users.filter(user => user.id !== userId));
                alert('Usuario eliminado exitosamente');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('Error al eliminar el usuario');
            });
    };

    const handleEdit = (userId) => {
        // Pag edicion
        console.log('Editar usuario por id:', userId);
        alert('En proceso');
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
                                <td>
                                    <select 
                                        value={user.status} 
                                        onChange={(e) => handleStatusChange(user.id, e.target.value === 'true')}
                                    >
                                        {statuses.map(status => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
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
