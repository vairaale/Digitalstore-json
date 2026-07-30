import fs from "fs/promises";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Usuario from "../models/Usuario.js";

dotenv.config({
  path: "./.env"
});

await mongoose.connect(process.env.MONGODB_URI);

try {

  const data = await fs.readFile(
    "./data/usuarios.json",
    "utf-8"
  );

  const usuarios = JSON.parse(data);

  const usuariosConHash = await Promise.all(
    usuarios.map(async (usuario) => ({
      ...usuario,
      contrasena: await bcrypt.hash(usuario.contrasena, 10)
    }))
  );

  await Usuario.insertMany(usuariosConHash);

  console.log("✅ Usuarios migrados correctamente");

} catch (error) {

  console.error(error);

} finally {

  mongoose.connection.close();

}