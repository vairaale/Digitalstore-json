import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: String,
    desc: String,
    precio: Number,
    imagen: String,
    stock: Number,
    disponible: Boolean,
    categoria: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Producto",
  productoSchema
);