const express = require("express");
const router = express.Router();
const { cadastrarUsuario, login, excluirConta } = require("../controllers/usuarioController");
const verificarToken = require("../middlewares/authMiddleware");

router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);
router.delete("/me", verificarToken, excluirConta);

module.exports = router;