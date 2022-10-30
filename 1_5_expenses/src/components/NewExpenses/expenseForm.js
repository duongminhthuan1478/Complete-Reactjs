import { useState } from "react";
import "./expenseForm.css";

const ExpenseForm = (props) => {
  //   const [titleInput, setTitleInput] = useState("");
  //   const [amountInput, setAmountInput] = useState(0);
  //   const [dateInput, setDateInput] = useState("");

  // Use 1 state object instead of seperated for 3 input above
  const [userInput, setUserInput] = useState({
    titleInput: "",
    amountInput: "",
    dateInput: "",
  });

  const titleChangeHandler = (event) => {
    setUserInput((preState) => {
      return { ...preState, titleInput: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    setUserInput((preState) => {
      return { ...preState, amountInput: event.target.value };
    });
  };

  const datetChangeHandler = (event) => {
    setUserInput((preState) => {
      return { ...preState, dateInput: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      title: userInput.titleInput,
      amount: Number(userInput.amountInput),
      date: new Date(userInput.dateInput),
    };
    console.log("data", data);
    resetUserInput();

    //emit data bottom-up (child-parent, output Angular)
    props.onSaveExpenseData(data);
  };

  const resetUserInput = () => {
    setUserInput(() => {
      return {
        titleInput: "",
        amountInput: "",
        dateInput: "",
      };
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.titleInput}
            onChange={titleChangeHandler}
          />
        </div>

        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.amountInput}
            onChange={amountChangeHandler}
          />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={userInput.dateInput}
            onChange={datetChangeHandler}
          />
        </div>

        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
