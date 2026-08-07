import { User, Mail, Phone, Pencil, Trash2 } from "lucide-react";
import api from "../services/api";

function ListaClientes({
    clientes,
    buscarClientes,
    setClienteEditando
}) {

    const excluirCliente = async (id) => {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este cliente?"
        );

        if (!confirmar) return;

        try {

            await api.delete(`/clientes/${id}`);

            alert("Cliente excluído com sucesso!");

            buscarClientes();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir cliente.");

        }

    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
                Clientes
            </h2>

            <div className="space-y-4">

                {clientes.map((cliente) => (

                    <div
                        key={`${cliente.id}-${cliente.email}-${cliente.telefone}`}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition duration-300"
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <div className="flex items-center gap-2 mb-2">

                                    <User size={20} className="text-blue-600" />

                                    <h3 className="font-bold text-lg">
                                        {cliente.nome}
                                    </h3>

                                </div>

                                <p className="flex items-center gap-2 text-gray-600">

                                    <Mail size={16} />

                                    {cliente.email}

                                </p>

                                <p className="flex items-center gap-2 text-gray-600 mt-2">

                                    <Phone size={16} />

                                    {cliente.telefone}

                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => setClienteEditando(cliente)}
                                    className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                                >
                                    <Pencil
                                        size={18}
                                        className="text-yellow-700"
                                    />
                                </button>

                                <button
                                    onClick={() => excluirCliente(cliente.id)}
                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                                >
                                    <Trash2
                                        size={18}
                                        className="text-red-700"
                                    />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ListaClientes;