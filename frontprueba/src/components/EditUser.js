import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/StylesEdit.css';
import axios from 'axios';
import logo from '../logoprueba.png';

const EditUser = () => {
    const { id } = useParams();
    /* const [user, setUser] = useState(null);*/
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [role, setRole] = useState('');
    const roles = ['usuario', 'admin', 'superadmin'];
    const estados = ['Activo', 'Inactivo'];

    useEffect(() => {
        axios.get(`http://localhost:3001/users/${id}`)
            .then(response => {
                const userData = response.data;
                /* setUser(userData);*/
                setName(userData.name);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setAddress(userData.address);
                setPhone(userData.phone);
                setStatus(userData.status ? 'Activo' : 'Inactivo');
                setRole(userData.role);
            })
            .catch(error => {
                console.error('Error al cargar usuarios:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            name,
            lastName,
            email,
            address,
            phone,
            status: status === 'Activo',
            role
        };

        axios.put(`http://localhost:3001/users/${id}`, updatedUser)
            .then(response => {
                alert('Usuario actualizado exitosamente');
                window.location.href = '/users';
            })
            .catch(error => {
                console.error('Error al actualizar usuario', error);
                alert('Error al actualizar el usuario');
            });
    };

    return (
        <div className="edit-page-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="navbar-links">
                    <li><a href='/users'>Usuarios</a></li>
                </ul>
            </nav>
            <main className="edit-content">
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group-edit">
                    <h1>Editar Usuario</h1>

                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit">
                        <label htmlFor="lastName">Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-edit">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            {estados.map(estado => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-edit">
                        <label htmlFor="role">Rol</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="button-save">Guardar Cambios</button>
                </form>
            </main>
        </div>
    );
};

export default EditUser;
