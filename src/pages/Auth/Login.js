import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert(
        "Erreur lors de la connexion: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("password", { required: "Mot de passe obligatoire" })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Login;
