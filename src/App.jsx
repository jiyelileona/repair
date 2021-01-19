import React, {useState, useEffect} from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [list, setList] = useState(JSON.parse(window.localStorage.getItem('todos')) || []);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(list));
  }, [list]);

  const handleAddItem = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = formData.get('input');
    const id = uuidv4();
    const isDone = false;

    if (input !== '') {
      setList([...list, {input, id, isDone}]);
    } else {
      return;
    }

    e.target.reset();
  };

  const handleDelete = e => {
    setList(list.filter(item => item.id !== e.target.closest('li').getAttribute('id')));
  };

  const toggleClass = e => {
    e.target.closest('li').classList.toggle('completed');

    setList(
      list.map(item => {
        if (item.id === e.target.closest('li').getAttribute('id')) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      })
    );
  };

  const clearCompleted = () => {
    setList(list.filter(item => item.isDone !== true));
  };

  (function () {
    // console.log(ColorContext);
  })();

  return (
    <section className="fixmeapp">
      <header className="header">
        <h1>rep🔥irs</h1>
        <form onSubmit={handleAddItem}>
          <input
            className="new-repair"
            name="input"
            placeholder="What needs to be repaired?"
            autoFocus=""
          />
        </form>
      </header>
      <section className="main">
        <ul className="repair-list">
          {list.map((item, i) => (
            <li key={i} id={item.id} className={item.isDone ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onClick={toggleClass}
                  checked={item.isDone ? true : false}
                  readOnly
                />
                <label>{item.input}</label>
                <button className="destroy" onClick={handleDelete}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
