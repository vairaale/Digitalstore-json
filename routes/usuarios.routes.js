import { Router } from "express";
import { readFile } from "fs/promises";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Leer usuarios
const usuarios = JSON.parse(
  await readFile("./data/usuarios.json", "utf-8")
);

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
const validar = (req, res, next) => {
  const { email, password } = req.body;

  const usuario = usuarios.find(
    (u) =>
      u.email === email &&
      u.contrasena === password
  );

  if (usuario) {
    req.user = usuario;
    next();
  } else {
    res.status(401).json({
      message: "Credenciales inválidas"
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