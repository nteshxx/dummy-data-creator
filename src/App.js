import React, { useState } from 'react';
import './App.css';

function App() {
  const data = [];
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newMin = parseInt(min, 10) - 10;
    const newMax = parseInt(max, 10) + 10;

    for (let i = 0; i < 100; i++) {
      const randomValue = Math.round(
        newMin + Math.random() * (newMax - newMin)
      );
      data.push({
        value: randomValue,
        timeStamp: new Date().toISOString(),
        type:
          randomValue < min || randomValue > max
            ? 'error value'
            : 'normal value',
      });
    }

    console.log('wait for 5 seconds');
    setTimeout(function () {
      setTableData(data);
      setLoading(false);
      console.log(tableData);
    }, 5000);
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {/*
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>TimeStamp</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((element) => (
            <tr>
              <td>{element.value}</td>
              <td>{element.timeStamp}</td>
              <td>{element.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      */}
      {tableData.length === 0 ? (
        <div className="inputForm">
          <h2>Add a Value</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Insert Min °C Value"
              pattern="[0-9]*"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Insert Max °C Value"
              pattern="[0-9]*"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
            <button type="submit">Start</button>
          </form>
        </div>
      ) : (
        <div>Data Pushed!</div>
      )}
    </div>
  );
}

export default App;
