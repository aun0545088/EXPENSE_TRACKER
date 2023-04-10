import React, { useState } from "react";
import { Button, TextField, styled } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useSignupMutation } from "../app/auth/userAuthApi";
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  

  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await signup({ email, name, password, phone }).unwrap();
    console.log(result);
    //setData(result.data.message)
    //setToken(result.data.token)
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <StyledForm onSubmit={loginHandler}>
        <StyledTextField
          label="Name"
          variant="outlined"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <StyledTextField
          label="Phone"
          variant="outlined"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        {/* {<span>{data}</span>} */}
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          SignUp
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default SignUp;
