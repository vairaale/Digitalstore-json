const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Leer JSON
const getData = (path) => JSON.parse(fs.readFileSync(path));
const saveData = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// GET usuarios
app.get("/usuarios", (req, res) => {
  const usuarios = getData("./data/usuarios.json");
  res.json(usuarios);
});

// GET productos
app.get("/productos", (req, res) => {
  const productos = getData("./data/productos.json");
  res.json(productos);
});

// POST usuario
app.post("/usuarios", (req, res) => {
  const usuarios = getData("./data/usuarios.json");

  const nuevo = {
    id: usuarios.length + 1,
    ...req.body
  };

  usuarios.push(nuevo);
  saveData("./data/usuarios.json", usuarios);

  res.json(nuevo);
});

// PUT usuario
app.put("/usuarios/:id", (req, res) => {
  let usuarios = getData("./data/usuarios.json");

  usuarios = usuarios.map(u =>
    u.id == req.params.id ? { ...u, ...req.body } : u
  );

  saveData("./data/usuarios.json", usuarios);

  res.json({ mensaje: "Usuario actualizado" });
});

// DELETE usuario (con validación)
app.delete("/usuarios/:id", (req, res) => {
  const usuarios = getData("./data/usuarios.json");
  const ventas = getData("./data/ventas.json");

  const tieneVentas = ventas.some(v => v.id_usuario == req.params.id);

  if (tieneVentas) {
    return res.status(400).json({
      error: "No se puede eliminar, tiene ventas"
    });
  }

  const nuevos = usuarios.filter(u => u.id != req.params.id);

  saveData("./data/usuarios.json", nuevos);

  res.json({ mensaje: "Usuario eliminado" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// POST venta
app.post("/ventas", (req, res) => {
  const ventas = getData("./data/ventas.json");

  const nuevaVenta = {
    id: ventas.length + 1,
    ...req.body
  };

  ventas.push(nuevaVenta);
  saveData("./data/ventas.json", ventas);

  res.json(nuevaVenta);
});

app.get("/ventas", (req, res) => {
  const ventas = getData("./data/ventas.json");
  res.json(ventas);
});