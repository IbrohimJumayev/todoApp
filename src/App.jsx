import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTasks = localStorage.getItem("todos");
    return savedTasks ? JSON.parse(savedTasks) : initialTodos;
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();

    if (newTask.trim() !== "") {
      const TASK = {
        id: Date.now(),
        taskName: newTask,
        done: false,
      };

      setTodos([...todos, TASK]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="todoApp">
      <h2>Tasks:{todos.length}</h2>
      <h1>Todo App</h1>
      <form>
        <input
          onChange={handleInputChange}
          value={newTask}
          type="text"
          placeholder="Enter a task"
        />
        <button className="addTask" onClick={addTask}>
          add
        </button>
      </form>

      <div className="task-list">
        {todos.map((t, index) => {
          return (
            <li key={t.id}>
              <span>
                {index + 1}.{t.taskName}
              </span>
              <button onClick={() => deleteTask(t.id)}>delete</button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default App;
