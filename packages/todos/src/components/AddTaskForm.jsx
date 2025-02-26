import { useState } from "react";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function AddTaskForm (props) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = () => {
        props.onNewTask(inputValue)
        
    }

    const onCloseModal = () => {
        setInputValue('')
        props.toggleModal();
    }

    return (
        <Modal
            headerLabel="Alert"
            isOpen={props.isOpen}
            onCloseRequested={props.toggleModal}
            style={customStyles}
        >   
            <div className="w-72">
                <div className="flex justify-between ">
                    <div className="text-l font-bold mb-2">New Task</div>
                    <button onClick={onCloseModal} aria-label="Close" padding="2em" margin="-2em" > X </button>
                </div>
                <div className="mt-2"> {/* Unfortunately comments in JSX have to be done like this */}
                    <input type="text" value={inputValue} onChange={handleInputChange} className="rounded border border-black-300 p-2" placeholder="New task name"/>
                    <button onClick={onSubmit} className="rounded bg-blue-600 pl-2 pr-2 pt-1 pb-1 ml-2 text-white transition duration-200 hover:bg-blue-500">Add task</button>
                </div>
            </div>
            
        </Modal>
        
    );
}

export default AddTaskForm;