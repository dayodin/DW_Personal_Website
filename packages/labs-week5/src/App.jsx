import { useState, useId } from "react";

import TodoList from "./components/TodoList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
    const [newTask, setNewTask] = useState('')

    const onNewTask = (inputValue) => {
        setNewTask(inputValue)
    }

    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <AddTaskForm onNewTask={onNewTask} />
            <TodoList newTask={newTask} />
        </main>
  );
}

export default App;