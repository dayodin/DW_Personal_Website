import { useState } from "react";

function AddTaskForm (props) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = () => {
        props.onNewTask(inputValue)
        setInputValue('')
    }

    return (
        <div className="mt-2"> {/* Unfortunately comments in JSX have to be done like this */}
            <input type="text" value={inputValue} onChange={handleInputChange} className="rounded border border-black-300 p-2" placeholder="New task name"/>
            <button onClick={onSubmit} className="rounded bg-blue-600 pl-2 pr-2 pt-1 pb-1 ml-2 text-white transition duration-200 hover:bg-blue-500">Add task</button>
        </div>
    );
}

export default AddTaskForm;