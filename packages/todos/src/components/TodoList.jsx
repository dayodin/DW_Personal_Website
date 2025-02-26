import React, { useState, useEffect }  from "react";
import { v4 as uuidv4 } from 'uuid';

import TodoItem from "./TodoItem";

function TodoList (props) {
    const INITIAL_TASK_LIST = [{ name: "Eat", id: uuidv4(), completed: false }, 
                               { name: "Sleep", id: uuidv4(), completed: false },
                               { name: "Repeat", id: uuidv4(), completed: false }]

    const [taskList, setTaskList] = useState(INITIAL_TASK_LIST);

    useEffect(() => {

        if (props.newTask != "") {
            const task = { name: props.newTask, id: uuidv4(), completed: false }
            setTaskList([...taskList, task])
        }
    }, [props.newTask])

    const deleteTask = (id) => {
        setTaskList(taskList.filter(value => value.id != id))
    }

    const completeTask = (id) => {

        const updatedTasks = taskList.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
              // use object spread to make a new object
              // whose `completed` prop has been inverted
              return { ...task, completed: !task.completed };
            }
            return task;
        });

        setTaskList(updatedTasks);
    }

    const deleteAllTasks = () => {
        setTaskList([])
    }

    return(
        <section className="mt-4">
            <h1 className="text-l font-bold mb-2">To do</h1>
            <ul>
                {taskList.map(component => <TodoItem key={component.id} 
                                                     id={component.id} 
                                                     name={component.name} 
                                                     deleteTask={deleteTask} 
                                                     completeTask={completeTask} />)}
            </ul>
        </section>
    );
}

export default TodoList;