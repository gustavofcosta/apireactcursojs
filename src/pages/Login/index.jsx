import { Container } from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({ type: "BOTAO_CLICADO" });
  };

  return (
    <Container>
      <h1>Login</h1>
      <small>dkjhasdkasj</small>
      <button type="button" onClick={handleClick}>
        enviar
      </button>
    </Container>
  );
};
export default Login;
