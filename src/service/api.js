import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const buscarUsuario = (id) => api.get(`/usuarios/${id}`);

export const atualizarUsuario = (id, dados) => api.put(`/usuarios/${id}`, dados);