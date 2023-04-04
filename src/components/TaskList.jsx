import React, { useState } from 'react';

function TaskList() {
  const [name, setName] = useState();
  const [id, setId] = useState(0);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();
  const [date, setDate] = useState();

  const addItem = (e) => {

    // set id for each item
    setId(items.length + 1);

    // item object with it attributes 
    const item = {
      id: id,
      name: name,
      status: status,
      date: date
    };

    // add item to items array
    setItems(oldItems => [...oldItems, item]);
    setName('');
  };


  // delete item by id
  const deleteItem = (id) => {
    // remove item from items array
    setItems(oldItems => items.filter((item => item.id !== id)));
    setId(id);
  };

  // edit item 
  const editItem = (id, newName, newDate, newStatus) => {

    // const itemToEdit = items.filter((item) => item.id === id);

    const newItem = {
      id: id,
      name: newName,
      date: newDate,
      status: newStatus
    };

    // remove old item
    deleteItem(id);

    // append the new item to items array
    setItems((oldItems) => [...oldItems, newItem]);
    setId(id+1);
    setName('');
  };


  return (
    <div>
      <input type="text" name="taskName" value={name} placeholder='Task Name ...' onChange={e => setName(e.target.value)} />
      <input type="date" name="" id="" onChange={e => setDate(e.target.value)} />

      <select name="" id="" onChange={e => setStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In progress">In progress</option>
        <option value="Finished">Finished</option>
      </select>

      <p>{name}</p>
      <button onClick={addItem}>submit</button>

      <ul>
        {items.map((item) =>
          <div>
            <li>{[item.id, item.name, item.date, item.status]}</li>
            <button onClick={() => editItem(item.id, name, date, status)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        )}
      </ul>

    </div>
  );

};

export default TaskList;
