import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import * as yup from "yup";
import "../css/LoginForm.css";

import logo from "../assets/logo2.svg"; 

export default function LoginForm() {
    const navigate = useNavigate();
    const erroUsuarioRef = useRef(null);
    const erroSenhaRef = useRef(null);

    // Esquema de validação com Yup
    const validationLogin = yup.object().shape({
        usuario: yup.string().required("Usuário é obrigatório."),
        senha: yup.string().required("Senha é obrigatória."),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        erroUsuarioRef.current.textContent = "";
        erroSenhaRef.current.textContent = "";

        const { usuario, senha } = e.target.elements;
        const dados = {
            usuario: usuario.value.trim(),
            senha: senha.value,
        };

        try {
            // Validação com Yup
            await validationLogin.validate(dados);

            // Enviar dados ao servidor
            const res = await axios.post("http://localhost:3001/adm", dados);
            console.log(res);
            navigate("/painel-main");

        } catch (err) {
            // 1. Erros de validação Yup
            if (err.name === "ValidationError") {
                if (err.path === "usuario" || err.path === "senha") erroUsuarioRef.current.textContent = err.message;
                return;
            }

            // 2. Erros do servidor (axios)
            if (axios.isAxiosError(err) && err.response) {
                const { campo, mensagem } = err.response.data;
                if (campo === "usuario") erroUsuarioRef.current.textContent = mensagem;
                if (campo === "senha") erroSenhaRef.current.textContent = mensagem;
                return;
            }

            console.error(err);
            alert("Erro no servidor. Tente novamente.");
        }
    };

    return (
        <div className="login-container" >
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src={logo} alt="Logo Adotaqui" />
                </div>

                <div>
                    <label>Usuário:</label>
                    <input type="text" name="usuario" autoComplete="on" required />
                    <p ref={erroUsuarioRef} />
                </div>

                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" autoComplete="off" required />
                    <p ref={erroSenhaRef} />
                </div>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}