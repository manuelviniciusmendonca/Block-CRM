export const salvarToken = (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
};

export const pegarToken = () => {
    return localStorage.getItem("token");
};

export const pegarUsuario = () => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};

export const estaLogado = () => {
    return !!pegarToken();
};
