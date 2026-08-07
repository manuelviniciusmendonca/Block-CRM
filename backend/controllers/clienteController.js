const db = require("../database/db");

const listarClientes = (req, res) => {

    res.set("Cache-Control", "no-store");

    const usuarioId = req.usuario.id;

    db.query(
        "SELECT * FROM clientes WHERE usuario_id = ? ORDER BY id ASC",
        [usuarioId],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    erro: "Erro ao buscar clientes"
                });
            }

            res.json(results);

        }
    );

};

const criarCliente = (req, res) => {

    const { nome, email, telefone } = req.body;
    const usuarioId = req.usuario.id;

    const sql = `
        INSERT INTO clientes (nome, email, telefone, usuario_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nome, email, telefone, usuarioId], (err, result) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro ao cadastrar cliente"
            });
        }

        res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            id: result.insertId
        });

    });

};

const atualizarCliente = (req, res) => {

    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const usuarioId = req.usuario.id;

    const sql = `
        UPDATE clientes
        SET nome = ?, email = ?, telefone = ?
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(sql, [nome, email, telefone, id, usuarioId], (err, result) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro ao atualizar cliente"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json({
            mensagem: "Cliente atualizado com sucesso!"
        });

    });

};

const excluirCliente = (req, res) => {

    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const sql = "DELETE FROM clientes WHERE id = ? AND usuario_id = ?";

    db.query(sql, [id, usuarioId], (err, result) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro ao excluir cliente"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json({
            mensagem: "Cliente excluído com sucesso!"
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
    listarClientes,
    criarCliente,
    atualizarCliente,
    excluirCliente
};