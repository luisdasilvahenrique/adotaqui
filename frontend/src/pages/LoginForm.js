import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import * as yup from "yup";

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
      navigate("/panel");

    } catch (err) {
      // 1. Erros de validação Yup
      if (err.name === "ValidationError") {
        if (err.path === "usuario") erroUsuarioRef.current.textContent = err.message;
        if (err.path === "senha") erroSenhaRef.current.textContent = err.message;
        return;
      }

      // 2. Erros do servidor (axios)
      if (axios.isAxiosError(err) && err.response) {
        const { campo, mensagem } = err.response.data;
        if (campo === "usuario") erroUsuarioRef.current.textContent = mensagem;
        if (campo === "senha") erroSenhaRef.current.textContent = mensagem;
        return;
      }

      // 3. Erros inesperados
      console.error(err);
      alert("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Usuário:</label>
        <input type="text" name="usuario" />
        <p ref={erroUsuarioRef} style={{ color: "red", margin: 0 }} />
      </div>

      <div>
        <label>Senha:</label>
        <input type="password" name="senha" />
        <p ref={erroSenhaRef} style={{ color: "red", margin: 0 }} />
      </div>

      <button type="submit">Entrar</button>
    </form>
  );
}
