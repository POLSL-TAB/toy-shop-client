import React, { useState } from 'react';
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
const RegisterField = styled(TextField)`
  width: 100%;
`
const RegisterButton = styled(Button)`
&&{
    margin-top: 20px;
    height: 60px;
    width: 100%;
    font-weight: bold;
    color: white;
    background: var(--color-primary);
    &:hover {
        background-color: var(--color-primary-accent);
    }
}
`
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const register = (e) => {
    e.preventDefault();
    // REJESTRUJE + dodatkowo robi to samo co login
    
    // Perform register logic
    // console.log('Email:', email);
    // console.log('Password:', password);
    // window.localStorage.setItem("user", JSON.stringify({name: "Wojtek"}))
    // window.location.reload()
  };

  return (
    <Container>
      <Wrapper>
        <h2>FURMULARZ REJESTRACJI</h2>
        <form onSubmit={register}>
          <RegisterField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
          />
          <RegisterField
            label="Hasło"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
          />
          <RegisterButton variant="contained" type="submit">
            ZAREJESTRUJ
          </RegisterButton>
        </form>
      </Wrapper>
    </Container>
  );
};

export default Register;
