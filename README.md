# DigitalStore - Aplicaciones Web II

## 🔗 Repositorios del proyecto

### Frontend
👉 https://github.com/vairaale/digitalstore-frontend.git

### Backend / API JSON
👉 https://github.com/vairaale/Digitalstore-json.git

---
Este proyecto corresponde a la primera entrega de la materia Aplicaciones Web II.

Estructura del Proyecto
DigitalStore-json/
│── data/
│   ├── usuarios.json
│   ├── productos.json
│   └── ventas.json

Descripción
Simula una tienda online de productos tecnológicos.

Relaciones
- ventas.id_usuario → usuarios.id
- ventas.productos[].id → productos.id


TechStore API

Este proyecto corresponde a la segunda entrega de la materia Aplicaciones Web II.

El sistema simula una tienda online de productos tecnológicos utilizando archivos JSON y un servidor desarrollado con Node.js y Express.js aplicando JavaScript moderno (ES6).

Estructura del proyecto

DigitalStore/
│── data/
│   ├── usuarios.json
│   ├── productos.json
│   └── ventas.json
│
│── .env
│── .gitignore
│── index.js
│── package.json
│── README.md

Tecnologías utilizadas
Node.js
Express.js
JavaScript ES6
Nodemon
Dotenv
JSON

Instalar dependencias
npm install
Ejecutar servidor
npm run dev

Servidor disponible en:

http://localhost:3000


Endpoints
🔹 GET
/usuarios → obtener usuarios
/productos → obtener productos
/ventas → obtener ventas
🔹 POST
/usuarios → crear usuario
/ventas → registrar venta
🔹 PUT
/usuarios/:id → actualizar usuario
🔹 DELETE
/usuarios/:id → eliminar usuario


Regla de integridad

No se puede eliminar un usuario si tiene ventas asociadas.

Esto garantiza la consistencia de los datos evitando referencias inválidas.

Características implementadas
Uso de JavaScript moderno (ES6)
Uso de import/export
Variables de entorno con dotenv
Lectura y escritura de archivos JSON
Uso de async/await
Manejo de errores con try/catch
Validaciones básicas
API REST con Express.js