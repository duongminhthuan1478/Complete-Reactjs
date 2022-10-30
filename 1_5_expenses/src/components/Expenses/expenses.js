import { useState } from "react";
import Card from "../UI/card";
import "./expenses.css";
import ExpensesChart from "./expensesChart";
import ExpensesFilter from "./expensesFilter";
import ExpensesList from "./expensesList";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChanged = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter(
    (item) => item.date.getFullYear().toString() === filteredYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChanged} />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
