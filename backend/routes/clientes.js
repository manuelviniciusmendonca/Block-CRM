const express = require("express");
const {
    listarClientes,
    criarCliente,
    excluirCliente,
    atualizarCliente
} = require("../controllers/clienteController");

const router = express.Router();

router.get("/", listarClientes);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.delete("/:id", excluirCliente);

module.exports = router;