import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [newItem, setNewItems] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const [items, setItems] = useState([]);

  function addItem() {

    const item = {
      title: newItem,
      date: date,
      status: status
    };

    setItems(oldList => [...oldList, item]);
    setNewItems('');
  }

  const a = 'not started';
  return (

    <div className="App">
      <input type="text" value={newItem} onChange={e => setNewItems(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      
      <select onClick={e => setStatus(e.target.value)}>
        <option>not started</option>
        <option>complite</option>
      </select>

      <button onClick={() => addItem()}>add</button>

      <ul>
        {items.map((item)=> <li>{[item.title, item.date, item.status]}</li>)}
      </ul>
    </div>



  );
}

export default App;
