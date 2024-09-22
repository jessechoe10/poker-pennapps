import React, { useState } from "react";

function Play() {
  const [rows, setRows] = useState([{ color: "", cashValue: "" }]);
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [isBuyIn, setIsBuyIn] = useState(true);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || {}
  );
  const [profit, setProfit] = useState(null);

  const handleAddRow = () => {
    setRows([...rows, { color: "", cashValue: "" }]);
  };

  const handleRowChange = (index, e) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [e.target.name]: e.target.value } : row
    );
    setRows(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!picture || !["image/jpeg", "image/png"].includes(picture.type)) {
      setError("Please upload a valid picture (jpg or png).");
      return;
    }

    if (!firstName || !lastName) {
      setError("Please enter both first and last names.");
      return;
    }

    setError("");

    const fullName = `${firstName} ${lastName}`;

    // Ensure alternating buy-in and cash-out
    const userTransactions = transactions[fullName] || [];
    const lastTransaction = userTransactions[userTransactions.length - 1];
    if (lastTransaction) {
      const lastType = Object.keys(lastTransaction)[0]; // Either "Buy In" or "Cash Out"
      if ((lastType === "Buy In" && isBuyIn) || (lastType === "Cash Out" && !isBuyIn)) {
        setError(`You must ${isBuyIn ? "cash out" : "buy in"} before ${isBuyIn ? "buying in" : "cashing out"} again.`);
        return;
      }
    }

    const transactionType = isBuyIn ? "Buy In" : "Cash Out";
    const newTransaction = { [transactionType]: parseFloat(amount) };

    const updatedTransactions = {
      ...transactions,
      [fullName]: [...(transactions[fullName] || []), newTransaction],
    };

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    // Calculate profit if cashing out
    if (!isBuyIn) {
      const totalBuyIns = userTransactions
        .filter((t) => t["Buy In"])
        .reduce((acc, t) => acc + t["Buy In"], 0);
      const totalCashOuts = userTransactions
        .filter((t) => t["Cash Out"])
        .reduce((acc, t) => acc + t["Cash Out"], 0);

      const currentProfit = totalCashOuts + parseFloat(amount) - totalBuyIns;
      setProfit(currentProfit);
    } else {
      setProfit(null); // Reset profit if a buy-in occurs
    }

    console.log("Transactions Updated", updatedTransactions);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-white bg-opacity-20 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-6">Go All In</h1>

        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 font-bold rounded-lg ${isBuyIn ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setIsBuyIn(true)}
          >
            Buy In
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg ml-4 ${!isBuyIn ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setIsBuyIn(false)}
          >
            Cash Out
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-200 font-bold mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-bold mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-bold mb-2">Picture (jpg or png)</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setPicture(e.target.files[0])}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-bold mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
            >
              {isBuyIn ? "Buy In" : "Cash Out"}
            </button>
          </div>
        </form>

        {profit !== null && (
          <div className="text-green-500 text-center mt-4">
            Profit: ${profit.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Play;