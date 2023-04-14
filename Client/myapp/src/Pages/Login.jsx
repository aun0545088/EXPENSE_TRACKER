import React, { useState } from "react";
import { Alert, Button, TextField, styled } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useLoginMutation } from "../app/auth/userAuthApi";
import { saveLocalData } from "../Utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "32px",
});

const StyledTextField = styled(TextField)({
  margin: "8px",
  width: "50%",
});

const StyledButton = styled(Button)({
  margin: "24px 0 16px",
  width: "50%",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await login({ email, password }).unwrap();
    console.log(result);
    setStatus((prevStatus) => result?.status);
    setMessage((prevMessage) => result?.message);
    if (result?.status === 200) {
      saveLocalData("token", result.token);
      saveLocalData("name", result.name);
      saveLocalData("userId", result.userId);
      setTimeout(() => {
        navigate("/expense-tracker", { replace: true });
      }, 1000);
    }
  };
  let alertComponent = null;
  if (status && status !== 200) {
    alertComponent = (
      <Alert
        severity="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "45.8%",
          margin: "auto",
        }}
      >
        {message}
      </Alert>
    );
  } else if (status === 200) {
    alertComponent = (
      <Alert
        severity="success"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "45.8%",
          margin: "auto",
        }}
      >
        {message}
      </Alert>
    );
  }

  return (
    <>
      <Navbar />
      <StyledForm onSubmit={loginHandler}>
        <StyledTextField
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </StyledButton>
      </StyledForm>

      {alertComponent}
    </>
  );
};

export default Login;
