import { useState } from "react";
import ExpenseForm from "./expenseForm";
import "./newExpense.css";

const NewExpense = (props) => {
  const [isEdditing, setIsEditting] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      id: Math.trunc(Math.random()).toString(),
      ...enteredExpenseData,
    };
    props.onAddExpense(expenseData);
  };

  const startEditingHandler = () => {
    setIsEditting(true);
  };

  const stopEditingHandler = () => {
    setIsEditting(false);
  };

  return (
    <div className="new-expense">
      {!isEdditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEdditing && (
        <ExpenseForm
          onCancel={stopEditingHandler}
          onSaveExpenseData={saveExpenseDataHandler}
        ></ExpenseForm>
      )}
    </div>
  );
};

export default NewExpense;
