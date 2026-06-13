import { Router } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();



// =========================
// GENERAR TOKEN
// =========================
const generarToken = (usuario) => {
  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// =========================
// MIDDLEWARE VALIDAR LOGIN
// =========================
const validar = async (req, res, next) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({
      email
    });

    if (!usuario) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const passwordCorrecta =
      await bcrypt.compare(
        password,
        usuario.contrasena
      );

    if (!passwordCorrecta) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    req.user = usuario;

    next();

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// =========================
// LOGIN
// =========================
router.post("/validar", validar, (req, res) => {
  const token = generarToken(req.user);

  res.json({
    message: "Login exitoso",
    token,
    client: {
      id: req.user.id,
      nombre: req.user.nombre,
      email: req.user.email
    }
  });
});

export default router;