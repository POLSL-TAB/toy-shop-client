import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 50px;
  background: white;
`
const LoginField = styled(TextField)`
  width: 100%;
`
const LoginButton = styled(Button)`
&&{
    margin-top: 20px;
    height: 40px;
    width: 100%;
    font-weight: bold;
    color: white;
    background: var(--color-primary);
    &:hover {
        background-color: var(--color-primary-accent);
    }
}
`
const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();
      window.localStorage.setItem("user", JSON.stringify({email: email, password: password}))
      setUser({email: email, password: password})
      navigate(-1)
    };

  return (
    <Container>
      <Wrapper>
        <h2>FORMULARZ LOGOWANIA</h2>
        <form onSubmit={login}>
          <LoginField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
          />
          <LoginField
            label="Hasło"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
          />
          <LoginButton variant="contained" type="submit">
            ZALOGUJ
          </LoginButton>
        </form>
      </Wrapper>
    </Container>
  );
};

export default Login;
