import { useState } from "react";
import { LogIn } from "lucide-react";
import api from "../services/api";
import { salvarToken } from "../services/auth";

function Login({ aoLogar, irParaCadastro }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const fazerLogin = async () => {

        try {

            const response = await api.post("/usuarios/login", {
                email,
                senha
            });

            salvarToken(response.data.token, response.data.usuario);

            aoLogar();

        } catch (error) {

            console.error(error);

            alert("E-mail ou senha inválidos.");

        }

    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                <div className="flex items-center gap-3 mb-6">

                    <LogIn className="text-blue-600" size={28} />

                    <h2 className="text-2xl font-bold">
                        Entrar
                    </h2>

                </div>

                <div className="space-y-4">

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
                        onClick={fazerLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Entrar
                    </button>

                    <p className="text-center text-gray-600">
                        Não tem conta?{" "}
                        <button
                            onClick={irParaCadastro}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Cadastre-se
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;