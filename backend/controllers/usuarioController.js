const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            erro: "Nome, e-mail e senha são obrigatórios"
        });
    }

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [nome, email, senhaCriptografada], (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        erro: "Este e-mail já está cadastrado"
                    });
                }

                console.error(err);

                return res.status(500).json({
                    erro: "Erro ao cadastrar usuário"
                });
            }

            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!"
            });

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao processar cadastro"
        });

    }

};

const login = (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: "E-mail e senha são obrigatórios"
        });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                erro: "Erro ao buscar usuário"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos"
            });
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos"
            });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    });

};

const excluirConta = (req, res) => {

    const usuarioId = req.usuario.id;

    db.query("DELETE FROM clientes WHERE usuario_id = ?", [usuarioId], (err) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                erro: "Erro ao excluir clientes do usuário"
            });
        }

        db.query("DELETE FROM usuarios WHERE id = ?", [usuarioId], (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    erro: "Erro ao excluir conta"
                });
            }

            res.json({
                mensagem: "Conta excluída com sucesso!"
            });

        });

    });

};

module.exports = {
    cadastrarUsuario,
    login,
    excluirConta
};