import fs from "fs/promises";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Producto from "../models/Producto.js";

dotenv.config({
  path: "./.env"
});

await mongoose.connect(process.env.MONGODB_URI);
try {

  const data = await fs.readFile(
    "./data/productos.json",
    "utf-8"
  );

  const productos = JSON.parse(data);

  await Producto.insertMany(productos);

  console.log("✅ Productos migrados");

} catch (error) {

  console.error(error);

} finally {

  mongoose.connection.close();

}