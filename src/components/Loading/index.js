import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styled";

export default function Loading({ isLoading }) {
  if (!isLoading) return <div></div>;

  return (
    <Container>
      <div />
      <span>Carregando...</span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.ProTypes = {
  isLoading: PropTypes.bool,
};
