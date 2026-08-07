import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import api from "../services/api";

function FormCliente({
    buscarClientes,
    clienteEditando,
    setClienteEditando
}) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    useEffect(() => {

        if (clienteEditando) {
            setNome(clienteEditando.nome);
            setEmail(clienteEditando.email);
            setTelefone(clienteEditando.telefone);
        }

    }, [clienteEditando]);

    const cadastrarCliente = async () => {

        try {

            if (clienteEditando) {

                await api.put(`/clientes/${clienteEditando.id}`, {
                    nome,
                    email,
                    telefone
                });

                await buscarClientes();

                alert("Cliente atualizado com sucesso!");

                setClienteEditando(null);

                setNome("");
                setEmail("");
                setTelefone("");

                return;
            }

            await api.post("/clientes", {
                nome,
                email,
                telefone
            });

            await buscarClientes();

            alert("Cliente cadastrado com sucesso!");

            setNome("");
            setEmail("");
            setTelefone("");

        } catch (error) {

            console.error(error);

            alert("Erro ao salvar cliente.");

        }

    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

                <UserPlus className="text-blue-600" size={28} />

                <h2 className="text-2xl font-bold">
                    {clienteEditando
                        ? "Editar Cliente"
                        : "Novo Cliente"}
                </h2>

            </div>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={cadastrarCliente}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                    {clienteEditando
                        ? "Salvar Alterações"
                        : "Cadastrar Cliente"}
                </button>

            </div>

        </div>
    );
}

export default FormCliente;