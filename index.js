import verificarToken from "./middlewares/auth.js";
import bcrypt from "bcrypt";
import conectarDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes.js";
import Usuario from "./models/Usuario.js";
import Producto from "./models/Producto.js";
import Venta from "./models/Venta.js";

dotenv.config();
await conectarDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API DigitalStore funcionando correctamente");
});



// GET usuarios
app.get("/usuarios", async (req, res) => {
  try {

    const usuarios = await Usuario.find();

    res.json(usuarios);

  } catch (error) {

    res.status(500).json({
      error: "Error al leer usuarios"
    });

  }
});

// GET productos
app.get("/productos", async (req, res) => {
  try {

    const productos = await Producto.find();

    res.json(productos);

  } catch (error) {

    res.status(500).json({
      error: "Error al leer productos"
    });

  }
});

// GET ventas
app.get("/ventas", async (req, res) => {
  try {

    const ventas = await Venta.find();

    res.json(ventas);

  } catch (error) {

    res.status(500).json({
      error: "Error al leer ventas"
    });

  }
});

// POST usuario
app.post("/usuarios", async (req, res) => {
  try {

    const {
      nombre,
      apellido,
      email,
      contrasena
    } = req.body;

    const passwordHash =
      await bcrypt.hash(contrasena, 10);

    const nuevoUsuario =
      await Usuario.create({
        nombre,
        apellido,
        email,
        contrasena: passwordHash
      });

    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: nuevoUsuario
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

// POST venta
app.post("/ventas", verificarToken, async (req, res) => {

  try {

    const nuevaVenta =
      await Venta.create(req.body);

    res.status(201).json(nuevaVenta);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
// PUT usuario
app.put("/usuarios/:id", async (req, res) => {

  try {

    const usuario =
      await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario actualizado",
      usuario
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
// DELETE usuario
app.delete("/usuarios/:id", async (req, res) => {

  try {

    const usuario =
      await Usuario.findById(
        req.params.id
      );

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }
const ventas =
  await Venta.find({
    id_usuario: req.params.id
  });

if (ventas.length > 0) {
  return res.status(400).json({
    error:
      "No se puede eliminar un usuario con ventas asociadas"
  });
}
    await Usuario.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Usuario eliminado"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
app.listen(PORT, () => {

  console.log("=================================");
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log("=================================");

});