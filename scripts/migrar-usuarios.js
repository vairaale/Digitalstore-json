import fs from "fs/promises";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

  await Usuario.insertMany(usuarios);

  console.log("✅ Usuarios migrados");

} catch (error) {

  console.error(error);

} finally {

  mongoose.connection.close();

}