import css from './taskMove.module.css'
import React, { useState, useEffect } from 'react'

export default function TaskMove(props) {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);

    const handleSelect = (e) => {
        setSelectedId(e.target.options[e.target.selectedIndex].value);
    }

    useEffect(() => {
        if (props.sourceBoard.tasks.length > 0) {
            setSelectedId(props.sourceBoard.tasks[0].id)
        }
    });

    const handleMove = () => {
        if(isOpened && selectedId) {
            const movedTask = props.sourceBoard.tasks.find(t => t.id === selectedId)
            if (movedTask) {
                props.moveTask(props.sourceBoard.id, props.boardId, movedTask)
            }

            setIsOpened(!isOpened);         
            return;
        }

        if(!isOpened) {
            setIsOpened(true);
        }
    }

    return (
        <>
            {isOpened && <select onChange={handleSelect}>
                {
                    props.sourceBoard.tasks.map(x =>
                        <option key={x.id} value={x.id}>{x.content}</option>
                    )
                }
            </select>}
            <button
                type='submit'
                className={css.button}
                onClick={handleMove}>
                {isOpened ? 'Submit' : '+ Add task'}
            </button>
        </>
    )
}