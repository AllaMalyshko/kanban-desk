import css from './input.module.css'
import React, {useState} from 'react'

export default function Input (props){
    const [isOpened, setIsOpened] = useState(false);

    const handleInput = () => {
        if(isOpened && taskName) {
           
            props.addTask(props.boardId, taskName);
            setTaskName("");
            setIsOpened(!isOpened);
            
            return;
        }

        if(!isOpened) {
            setIsOpened(true);
        }
    }

    const [taskName, setTaskName] = useState("");
    const handleInputChange = (e) => {
        setTaskName(e.target.value);
      }
    
    return(
        <>
            {isOpened && <input 
                type={'text'}
                placeholder={'Add your new task here'}
                value={taskName}
                onChange={handleInputChange}
                className={css.input}
                >
            </input>}
            <button 
                type='submit'
                className={css.button} 
                onClick={handleInput}>
                {isOpened ? 'Submit' : '+ Add task' }
            </button>
        </>
    )
}