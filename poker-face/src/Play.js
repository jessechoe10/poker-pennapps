import React, { useState } from "react";

function Play() {
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [isBuyIn, setIsBuyIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [totalValue, setTotalValue] = useState(null);
  const [rows, setRows] = useState([{ color: "", value: "" }]); // Array for rows

  const handleAddRow = () => {
    setRows([...rows, { color: "", value: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
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

    // Check the picture name and assign the corresponding total value
    const pictureName = picture.name.toLowerCase();
    if (pictureName === "r2.jpg") {
      setTotalValue(0.4);
    } else if (pictureName === "r8.png") {
      setTotalValue(1.6);
    } else if (pictureName === "r18.png") {
      setTotalValue(3.6);
    } else {
      setError("Invalid picture name. Please use r2.JPG, r8.png, or r18.png.");
      return;
    }

    setError("");
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

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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

          {/* Rows for colors and values */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">Chips</label>
            {rows.map((row, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="Color"
                  value={row.color}
                  onChange={(e) => handleRowChange(index, "color", e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => handleRowChange(index, "value", e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddRow}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors"
            >
              Add Row
            </button>
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

        {totalValue !== null && (
          <div className="text-green-500 text-center mt-4">
            Total Value of Chips: ${totalValue}
          </div>
        )}
      </div>
    </div>
  );
}

export default Play;