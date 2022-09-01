import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get } from "lodash";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";

import { Container } from "../../styles/GlobalStyles";

import axios from "../../services/axios";
import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";

import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const { data } = await axios.get("/alunos");
      setAlunos(data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;

    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    setIsLoading(true);
    e.persist();
    try {
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Voce precisa fazer login");
      } else {
        toast.error("Houve um erro ao excluir o aluno");
      }
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => {
          const { id, nome, email } = aluno;
          return (
            <div key={String(id)}>
              <ProfilePicture>
                {get(aluno, "Fotos[0].url", false) ? (
                  <img
                    crossOrigin="anonymous"
                    src={aluno.Fotos[0].url}
                    alt={nome}
                  />
                ) : (
                  <FaUserCircle size={36} />
                )}
              </ProfilePicture>
              <span>{nome}</span>
              <span>{email}</span>

              <Link to={`/aluno/${id}/edit`}>
                <FaEdit size={16} />
              </Link>
              <Link to={`/aluno/${id}/delete`} onClick={handleDeleteAsk}>
                <FaWindowClose size={16} />
              </Link>
              <FaExclamation
                size={16}
                display="none"
                cursor="pointer"
                onClick={(e) => handleDelete(e, aluno.id, index)}
              />
            </div>
          );
        })}
      </AlunoContainer>
    </Container>
  );
}
