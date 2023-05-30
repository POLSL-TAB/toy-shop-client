import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import ConfirmationModal from '../components/ConfirmationModal';

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
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const register = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API+"/api/auth/signup", requestOptions)
      .then(response => response.text())
      .then(result => {
        setSuccess(true)
        setOpen(true)
        console.log(result)
      })
      .catch(error => {
        setSuccess(false)
        setOpen(true)
        console.log('error', error)
      });
  };

  return (
    <>
    <ConfirmationModal open={open} setOpen={setOpen} success={success} navigate={()=>navigate(-1)}/>
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
    </>
  );
};

export default Register;
