import React, { useEffect, useState } from "react";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Form, Title } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos({ match }) {
  const dispatch = useDispatch();

  const id = get(match, "params.id", "");
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, "Fotos[0].url", ""));
      } catch (error) {
        toast.error("Erro ao obter imagem");
        history.push("/");
      }
      setIsLoading(false);
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const foto = e.target.files[0];
    const fotoURL = URL.createObjectURL(foto);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("foto", foto);

    try {
      setIsLoading(true);
      await axios.post(`/fotos/`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      toast.success("Foto envida com sucesso!");
    } catch (error) {
      const { status } = get(error, "response", "");
      toast.error("Erro ao enviar a foto");

      if (status === 401) dispatch(actions.loginFailure());
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt="Foto" />
          ) : (
            "Selecionar"
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.protoType = {
  match: PropTypes.shape({}).isRequired,
};
