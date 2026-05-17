import express from "express";
import fs from "fs/promises";
import dotenv from "dotenv";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API DigitalStore funcionando correctamente");
});


const archivoUsuarios = "./data/usuarios.json";
const archivoProductos = "./data/productos.json";
const archivoVentas = "./data/ventas.json";

// FUNCIONES

const leerJSON = async (ruta) => {
  const data = await fs.readFile(ruta, "utf-8");
  return JSON.parse(data);
};

const guardarJSON = async (ruta, data) => {
  await fs.writeFile(ruta, JSON.stringify(data, null, 2));
};

// GET usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await leerJSON(archivoUsuarios);
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
    const productos = await leerJSON(archivoProductos);
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
    const ventas = await leerJSON(archivoVentas);
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
    const usuarios = await leerJSON(archivoUsuarios);

    const nuevoUsuario = req.body;

    if (!nuevoUsuario.nombre) {
      return res.status(400).json({
        error: "El nombre es obligatorio"
      });
    }

    nuevoUsuario.id =
      usuarios.length > 0
        ? usuarios.at(-1).id + 1
        : 1;

    usuarios.push(nuevoUsuario);

    await guardarJSON(archivoUsuarios, usuarios);

    res.status(201).json(nuevoUsuario);

  } catch (error) {
    res.status(500).json({
      error: "Error al crear usuario"
    });
  }
});

// POST venta
app.post("/ventas", async (req, res) => {
  try {
    const ventas = await leerJSON(archivoVentas);

    const nuevaVenta = req.body;

    nuevaVenta.id =
      ventas.length > 0
        ? ventas.at(-1).id + 1
        : 1;

    ventas.push(nuevaVenta);

    await guardarJSON(archivoVentas, ventas);

    res.status(201).json(nuevaVenta);

  } catch (error) {
    res.status(500).json({
      error: "Error al crear venta"
    });
  }
});

// PUT usuario
app.put("/usuarios/:id", async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    let usuarios = await leerJSON(archivoUsuarios);

    const index = usuarios.findIndex(
      (u) => u.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    usuarios[index] = {
      ...usuarios[index],
      ...req.body
    };

    await guardarJSON(archivoUsuarios, usuarios);

    res.json({
      mensaje: "Usuario actualizado",
      usuario: usuarios[index]
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar usuario"
    });
  }
});

// DELETE usuario
app.delete("/usuarios/:id", async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    let usuarios = await leerJSON(archivoUsuarios);

    const ventas = await leerJSON(archivoVentas);

    const tieneVentas = ventas.some(
      (v) => v.id_usuario === id
    );

    if (tieneVentas) {
      return res.status(400).json({
        error: "No se puede eliminar un usuario con ventas asociadas"
      });
    }

    const index = usuarios.findIndex(
      (u) => u.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    const eliminado = usuarios.splice(index, 1);

    await guardarJSON(archivoUsuarios, usuarios);

    res.json({
      mensaje: "Usuario eliminado",
      usuario: eliminado[0]
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar usuario"
    });
  }
});

app.listen(PORT, () => {

  console.log("=================================");
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log("=================================");

});