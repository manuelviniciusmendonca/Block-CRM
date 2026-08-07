const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./database/db");

const clientesRoutes = require("./routes/clientes");
const usuariosRoutes = require("./routes/usuarios");
const verificarToken = require("./middlewares/authMiddleware");

const app = express();

app.set("etag", false);

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/clientes", verificarToken, clientesRoutes);

app.get("/", (req, res) => {
  res.send("API Mini CRM funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});