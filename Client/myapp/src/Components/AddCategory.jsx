import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "./Navbar";

const CreateCategoryForm = () => {
  const [name, setName] = useState("");
  const [expenses, setExpenses] = useState([{ name: "", amount: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedExpenses = expenses.map((expense) => ({
        ...expense,
        amount: parseInt(expense.amount),
      }));
      const res = await axios.post("http://localhost:3004/categories", {
        name,
        expenses: parsedExpenses,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleExpenseChange = (id) => (e) => {
    const newExpenses = [...expenses];
    newExpenses[id][e.target.name] = e.target.value;
    setExpenses(newExpenses);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const handleRemoveExpense = (id) => () => {
    setExpenses(expenses.filter((expense, i) => i !== id));
  };

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <TextFieldWrapper>
          <TextField
            label="Category Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </TextFieldWrapper>
        {expenses.map((expense, id) => (
          <ExpenseWrapper key={id}>
            <TextFieldWrapper>
              <TextField
                label="Expense Name"
                variant="outlined"
                name="name"
                value={expense.name}
                onChange={handleExpenseChange(id)}
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <TextField
                label="Expense Amount"
                variant="outlined"
                name="amount"
                type="number"
                value={expense.amount}
                onChange={handleExpenseChange(id)}
              />
            </TextFieldWrapper>
            <Button variant="contained" onClick={handleRemoveExpense(id)}>
              Remove Expense
            </Button>
          </ExpenseWrapper>
        ))}
        <ButtonWrapper>
          <Button variant="contained" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </ButtonWrapper>
      </Form>
    </>
  );
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  margin: "2rem auto",
  maxWidth: "800px",
});

const TextFieldWrapper = styled("div")({
  width: "100%",
});

const ExpenseWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  margin: "1rem 0",
  padding: "1rem",
  backgroundColor: "#eee",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
});

const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "1rem 0",
});

export default CreateCategoryForm;
