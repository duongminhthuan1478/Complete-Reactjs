import { useState } from "react";
import Card from "../UI/card";
import ExpenseDate from "./expenseDate";
import "./expenseItem.css";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  const clickHandler = () => {
    // setTitle("Title Updated!");
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
        <button onClick={clickHandler}>Change Title</button>
      </Card>
    </li>
  );
}

export default ExpenseItem;
