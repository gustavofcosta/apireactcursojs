import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { isEmail, isInt, isFloat } from "validator";
import axios from "../../services/axios";
import history from "../../services/history";
import { useDispatch } from "react-redux";
import { FaEdit, FaUserCircle } from "react-icons/fa";

import { Container } from "../../styles/GlobalStyles";
import { Form, ProfilePicture, Title } from "./styled";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import * as actions from "../../store/modules/auth/actions";
import { Link } from "react-router-dom";
export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, "params.id", "");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [foto, setFoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, "Fotos[0].url", "");

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setFoto(Foto);
      } catch (error) {
        const status = get(error, "response.status", 0);
        const errors = get(error, "response.data.errors", []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push("/");
        }
      }
      setIsLoading(false);
    };

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error("Nome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error("Sobrenome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error("Email inválido");
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error("Idade inválida");
      formErrors = true;
    }

    if (!isFloat(String(idade))) {
      toast.error("Idade inválida");
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error("Peso inválido");
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error("Altura inválida");
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // Editando existente
        await axios.patch(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) editado com sucesso!");
      } else {
        // Criar Novo
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) criado com sucesso!");
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, "response.status", 0);
      const data = get(err, "response.data", {});
      const errors = get(data, "errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Loading isLoading={isLoading} />

      <Title>{id ? "Editar aluno" : "Novo aluno"}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} crossOrigin="anonymous" />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Seu sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Sua idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Seu peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Sua altura"
        />

        <button type="submit">enviar</button>
      </Form>
    </Container>
  );
}

Aluno.prototype = {
  match: PropTypes.shape({}).isRequired,
};
