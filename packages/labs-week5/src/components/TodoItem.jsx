import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function TodoItem (props) {
    
    const onDelete = () => {
        props.deleteTask(props.id);
    }

    const onToggleTask = () => {
        props.completeTask(props.id)
    }

    return (
      <li className="todo mb-2">
        <div className="c-cb">
          <input id="todo-0" 
                 type="checkbox" 
                 checked={props.completed}
                 onChange={onToggleTask} />
          <label className="todo-label ml-1" htmlFor="todo-0">
            {props.name}
          </label>
          
          <button onClick={onDelete} type="button" className="ml-6">
            <FontAwesomeIcon icon={faTrashCan} style={{color: "#61748e",}}/>
          </button>
        </div>
      </li>
    );
  }
  
  export default TodoItem;