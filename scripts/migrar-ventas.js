import fs from "fs/promises";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Venta from "../models/Venta.js";

dotenv.config({
  path: "./.env"
});

await mongoose.connect(process.env.MONGODB_URI);
try {

  const data = await fs.readFile(
    "./data/ventas.json",
    "utf-8"
  );

  const ventas = JSON.parse(data);

  await Venta.insertMany(ventas);

  console.log("✅ Ventas migradas");

} catch (error) {

  console.error(error);

} finally {

  mongoose.connection.close();

}