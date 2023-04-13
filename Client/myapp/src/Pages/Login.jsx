import React, { useState } from "react";
import { Alert, Button, TextField, styled } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useLoginMutation } from "../app/auth/userAuthApi";
import { getLocalData, saveLocalData } from "../Utils/LocalStorage";
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
  const [d,setD] = useState("")
  const navigate = useNavigate()
  const [login] = useLoginMutation();
  // const l_token = getLocalData("token")
  //console.log(l_token)

  const loginHandler = async (e) => {
    e.preventDefault();
    const {data} = await login({ email, password });
    console.log(data)
    setD(data.message)
    saveLocalData("token",data.token)
    saveLocalData("name",data.name)
    saveLocalData("userId",data.userId)
    navigate("/expense-tracker")
  };

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
        {<span>{d.message}</span>}
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </StyledButton>
      </StyledForm>
      <Alert severity="success">{d}</Alert>
    </>
  );
};

export default Login;
