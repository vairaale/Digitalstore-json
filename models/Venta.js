import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    id_usuario: Number,

    fecha: String,

    total: Number,

    direccion: String,

    pagado: Boolean,

    productos: [
      {
        id: Number,
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