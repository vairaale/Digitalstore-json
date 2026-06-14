import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    id_usuario: String,

    fecha: String,

    total: Number,

    direccion: String,

    pagado: Boolean,

    productos: [
  {
    id: String,
    cantidad: Number
  }
]
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Venta",
  ventaSchema
);