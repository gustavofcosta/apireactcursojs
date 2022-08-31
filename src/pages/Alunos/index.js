import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";

import { Container } from "../../styles/GlobalStyles";

import axios from "../../services/axios";
import { AlunoContainer, ProfilePicture } from "./styled";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/alunos");
      setAlunos(data);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => {
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
              <Link to={`/aluno/${id}/delete`}>
                <FaWindowClose size={16} />
              </Link>
            </div>
          );
        })}
      </AlunoContainer>
    </Container>
  );
}
