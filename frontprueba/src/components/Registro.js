import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../Styles/StylesRegistro.css";
import logo from "../logoprueba.png";
import axios from "axios";

const endpoint = "http://localhost:3001";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("El correo no es válido")
    .required("El correo es obligatorio"),
  address: yup.string().required("La dirección es obligatoria"),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15, "El teléfono no puede tener más de 15 dígitos"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const Registro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${endpoint}/users`, data);
      console.log(response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar el usuario", error);
      alert("Error en el registro");
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
            <a href="/login">Inicio de Sesión</a>
          </li>
        </ul>
      </nav>
      <main className="content">
        <div className="registro-container">
          <h2>Registro</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                {...register("name")}
              />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                {...register("address")}
              />
              {errors.address && <p className="error-message">{errors.address.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {errors.phone && (
                <>
                  {errors.phone.type === "required" && (
                    <p className="error-message">El teléfono es obligatorio</p>
                  )}
                  {errors.phone.type === "matches" && (
                    <p className="error-message">El teléfono debe contener solo números</p>
                  )}
                  {errors.phone.type === "min" && (
                    <p className="error-message">El teléfono debe tener al menos 10 dígitos</p>
                  )}
                  {errors.phone.type === "max" && (
                    <p className="error-message">El teléfono no puede tener más de 15 dígitos</p>
                  )}
                </>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                {...register("password")}
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="button-container">
              <button type="submit">Registrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registro;
