import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("picture", data.picture[0]);
    formData.append("address", data.address);
    formData.append("zipcode", data.zipcode);
    formData.append("town", data.town);
    formData.append("coord", data.coord);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert(
        "Erreur lors de l'inscription: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            {...register("name", { required: "Pseudo obligatoire" })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Adresse mail obligatoire" })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            {...register("password", {
              required: "Mot de passe obligatoire",
              minLength: {
                value: 8,
                message: "Longueur minimale de 8 caractères",
              },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                message:
                  "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            {...register("picture", { required: "Image obligatoire" })}
          />
          {errors.picture && (
            <p className="error-message">{errors.picture.message}</p>
          )}
        </div>
        <div>
          <label>Adresse:</label>
          <input
            type="address"
            {...register("address", { required: "Adresse obligatoire" })}
          />
          {errors.address && (
            <p className="error-message">{errors.address.message}</p>
          )}
        </div>
        <div>
          <label>Code Postal:</label>
          <input
            type="text"
            {...register("zipcode", { required: "Code Postal obligatoire" })}
          />
          {errors.zipcode && (
            <p className="error-message">{errors.zipcode.message}</p>
          )}
        </div>
        <div>
          <label>Ville:</label>
          <input
            type="text"
            {...register("town", { required: "Ville obligatoire" })}
          />
          {errors.town && (
            <p className="error-message">{errors.town.message}</p>
          )}
        </div>
        <div>
          <label>Coordonnées Géographique:</label>
          <input
            type="text"
            {...register("coords", {
              required: "Coordonnées Géographique obligatoires",
            })}
          />
          {errors.coord && (
            <p className="error-message">{errors.coord.message}</p>
          )}
        </div>
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default Register;
