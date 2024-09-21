import React, { useState } from "react";

function App() {
  const [playerVenmo, setPlayerVenmo] = useState("");
  const [houseVenmo, setHouseVenmo] = useState("");
  const [rows, setRows] = useState([{ color: "", cashValue: "" }]);
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");

  // Handler for adding a new row
  const handleAddRow = () => {
    setRows([...rows, { color: "", cashValue: "" }]);
  };

  // Handler for changing row inputs
  const handleRowChange = (index, e) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [e.target.name]: e.target.value } : row
    );
    setRows(newRows);
  };

  // Handler for deleting a row
  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  // Handler for form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if picture is present and is jpg or png
    if (!picture || !["image/jpeg", "image/png"].includes(picture.type)) {
      setError("Please upload a valid picture (jpg or png).");
      return;
    }

    // Check if Venmo usernames are filled
    if (!playerVenmo || !houseVenmo) {
      setError("Please provide both your Venmo and the House Venmo username.");
      return;
    }

    setError("");
    
    // Handle the form data (for now, log it)
    console.log({
      picture,
      playerVenmo,
      houseVenmo,
      rows,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500 p-6">
      <div className="max-w-lg w-full bg-white bg-opacity-20 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-6">Go All In</h1>
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Picture Input */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">Picture (jpg or png)</label>
            <input
              type="file"
              accept="image/jpeg, image/png;capture=camera" // Camera capture allowed, jpg and png only
              onChange={(e) => setPicture(e.target.files[0])}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
            />
          </div>

          {/* Player Venmo Username */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">
              Your Venmo Username
            </label>
            <input
              type="text"
              value={playerVenmo}
              onChange={(e) => setPlayerVenmo(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
              placeholder="Enter your Venmo username"
            />
          </div>

          {/* Dynamic Rows (Color and Cash Value) */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">Cash Entries</label>
            {rows.map((row, index) => (
              <div key={index} className="flex space-x-4 mb-2 items-center">
                <input
                  type="text"
                  name="color"
                  value={row.color}
                  onChange={(e) => handleRowChange(index, e)}
                  placeholder="Color"
                  className="w-1/3 p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                />
                <input
                  type="number"
                  name="cashValue"
                  value={row.cashValue}
                  onChange={(e) => handleRowChange(index, e)}
                  placeholder="Cash Value"
                  className="w-1/3 p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  step="0.01"
                  min="0"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteRow(index)}
                  className="text-red-500 font-bold hover:text-red-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddRow}
              className="text-blue-200 font-bold mt-2 hover:text-blue-400"
            >
              + Add Row
            </button>
          </div>

          {/* House Venmo Username */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">
              House Venmo Username
            </label>
            <input
              type="text"
              value={houseVenmo}
              onChange={(e) => setHouseVenmo(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
              placeholder="Enter house Venmo username"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
            >
              Buy In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;