import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },

    apellido: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    contrasena: {
      type: String,
      required: true
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Usuario",
  usuarioSchema
);