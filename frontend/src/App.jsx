import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import FormCliente from "./components/FormCliente";
import ListaClientes from "./components/ListaClientes";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import api from "./services/api";
import { estaLogado, logout, pegarUsuario } from "./services/auth";

function App() {

    const [logado, setLogado] = useState(estaLogado());
    const [tela, setTela] = useState("login");

    const [clientes, setClientes] = useState([]);
    const [clienteEditando, setClienteEditando] = useState(null);

    const buscarClientes = async () => {

        try {

            const response = await api.get("/clientes");

            setClientes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (logado) {
            buscarClientes();
        }

    }, [logado]);

    const sair = () => {
        logout();
        setLogado(false);
        setTela("login");
        setClientes([]);
    };

    const excluirConta = async () => {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir sua conta? Todos os seus clientes cadastrados serão apagados permanentemente. Essa ação não pode ser desfeita."
        );

        if (!confirmar) return;

        try {

            await api.delete("/usuarios/me");

            alert("Conta excluída com sucesso.");

            sair();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir conta.");

        }

    };

    if (!logado) {

        if (tela === "cadastro") {
            return (
                <Cadastro
                    irParaLogin={() => setTela("login")}
                />
            );
        }

        return (
            <Login
                aoLogar={() => setLogado(true)}
                irParaCadastro={() => setTela("cadastro")}
            />
        );

    }

    const usuario = pegarUsuario();

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-slate-900 text-white shadow-lg">

                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Block CRM
                        </h1>

                        <p className="text-slate-300 mt-2">
                            Gerencie seus clientes de forma simples.
                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        {usuario && (
                            <span className="text-slate-300">
                                Olá, {usuario.nome}
                            </span>
                        )}

                        <button
                            onClick={sair}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
                        >
                            <LogOut size={18} />
                            Sair
                        </button>

                        <button
                            onClick={excluirConta}
                            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition"
                        >
                            Excluir conta
                        </button>

                    </div>

                </div>

            </header>

            <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">

                    <FormCliente
                        buscarClientes={buscarClientes}
                        clienteEditando={clienteEditando}
                        setClienteEditando={setClienteEditando}
                    />

                </div>

                <div className="lg:col-span-2">

                    <ListaClientes
                        clientes={clientes}
                        buscarClientes={buscarClientes}
                        setClienteEditando={setClienteEditando}
                    />

                </div>

            </main>

        </div>
    );
}

export default App;