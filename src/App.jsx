
import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");

  const addTransaction = () => {
    const numericAmount = Number(amount);

    if (title.trim() === "" || !amount || numericAmount <= 0) {
      alert("Please enter a valid title and amount!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      type: type,
    };

    setTransactions((previous) => [...previous, newTransaction]);

    setTitle("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Manage your money, track your spending!</p>
      </header>

      <main className="container">
        <section className="summary">
          <div className="card balance-card">
            <h3>Total Balance</h3>
            <h2>₹{balance.toFixed(2)}</h2>
          </div>

          <div className="card income-card">
            <h3>Total Income</h3>
            <h2>₹{income.toFixed(2)}</h2>
          </div>

          <div className="card expense-card">
            <h3>Total Expenses</h3>
            <h2>₹{expenses.toFixed(2)}</h2>
          </div>
        </section>

        <section className="form-section">
          <h2>Add Transaction</h2>

          <input
            type="text"
            placeholder="Enter transaction title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <button type="button" onClick={addTransaction}>
            Add Transaction
          </button>
        </section>

        <section className="history-section">
          <h2>Transaction History</h2>

          {transactions.length === 0 ? (
            <p className="empty-message">
              No transactions yet. Add your first transaction!
            </p>
          ) : (
            transactions.map((item) => (
              <div className="transaction" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.type}</p>
                </div>

                <div className="transaction-right">
                  <strong className={item.type.toLowerCase()}>
                    {item.type === "Income" ? "+" : "-"}
                    ₹{item.amount.toFixed(2)}
                  </strong>

                  <button
                    className="delete-button"
                    onClick={() => deleteTransaction(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <footer>
        <p>© 2026 Expense Tracker</p>
      </footer>
    </div>
  );
}

export default App;
