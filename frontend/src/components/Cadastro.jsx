import { useState } from "react";
import { UserPlus } from "lucide-react";
import api from "../services/api";

function Cadastro({ irParaLogin }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const fazerCadastro = async () => {

        try {

            await api.post("/usuarios/cadastro", {
                nome,
                email,
                senha
            });

            alert("Cadastro realizado com sucesso! Agora faça login.");

            irParaLogin();

        } catch (error) {

            console.error(error);

            const mensagem = error.response?.data?.erro || "Erro ao cadastrar usuário.";

            alert(mensagem);

        }

    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                <div className="flex items-center gap-3 mb-6">

                    <UserPlus className="text-blue-600" size={28} />

                    <h2 className="text-2xl font-bold">
                        Criar Conta
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
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={fazerCadastro}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Cadastrar
                    </button>

                    <p className="text-center text-gray-600">
                        Já tem conta?{" "}
                        <button
                            onClick={irParaLogin}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Fazer login
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Cadastro;