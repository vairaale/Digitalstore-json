import fs from "fs/promises";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Usuario from "../models/Usuario.js";

dotenv.config({
  path: "./.env"
});
console.log(process.env.PORT);
console.log(process.env.JWT_SECRET);
console.log(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
await mongoose.connect(
  "mongodb://localhost:27017/digitalstore_db"
);
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