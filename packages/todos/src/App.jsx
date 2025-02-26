import { useState } from "react";

import TodoList from "./components/TodoList";
import AddTaskForm from "./components/AddTaskForm";
import { GroceryPanel } from "./components/GroceryPanel";

function App() {
    const [newTask, setNewTask] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const onNewTask = (itemName) => {
        setNewTask(itemName)
        toggleModal()
    }

    const onAddGrocery = (itemName) => {
        setNewTask(itemName)
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    
    const testing = (node) => {
        // console.log("hello");
    }

    return (
        <main className="m-4" onClick={testing}> {/* Tailwind: margin level 4 on all sides */}
            <button onClick={toggleModal} className="rounded bg-blue-600 pl-2 pr-2 pt-1 pb-1 ml-2 text-white transition duration-200 hover:bg-blue-500">New task</button>
            <AddTaskForm id="taskModal" onNewTask={onNewTask} isOpen={modalOpen} toggleModal={toggleModal} />
            <TodoList newTask={newTask} />
            <GroceryPanel newTask={onAddGrocery} />
        </main>
  );
}

export default App;