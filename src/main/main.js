import React, { useState } from 'react';
import css from './main.module.css';
import { MockData } from '../server_response_mock'
import Input from '../input'


const Main = (props) => {
    const [boards, setBoards] = useState(MockData)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentTask, setCurrentTask] = useState(null)

    function dragOverCardHandler(e){
        e.preventDefault()
        e.target.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    }

    function dropCardHandler(e, board) {  
        board.tasks.push(currentTask)

        const currentIndex = currentBoard.tasks.indexOf(currentTask)
        currentBoard.tasks.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    // function dragOverHandler(e) {
    //     e.preventDefault()
    // }

    // function dragLeaveHandler(e) {
    //     e.target.style.backgroundColor = ''
    // }

    function dragStartHandler(e, board, task) {
        setCurrentBoard(board)
        setCurrentTask(task)
        e.target.style.color = '#6cb1d9'
    }


    function dragEndHandler(e) {
        e.target.style.color = '#000000'
    }

    // function dropHandler(e, board, task) {
    //     e.preventDefault()
    //     const currentIndex = currentBoard.tasks.indexOf(currentTask)
    //     currentBoard.tasks.splice(currentIndex, 1)
    //     const dropIndex = board.tasks.indexOf(task)
    //     board.tasks.splice(dropIndex + 1, 0, currentTask)
    //     setBoards(boards.map(b => {
    //         if (b.id === board.id) {
    //             return board
    //         }
    //         if (b.id === currentBoard.id) {
    //             return currentBoard
    //         }
    //         return b
    //     }))
    // }



    const addNewTask = (boardId, taskName) => {
        const currentBoard = boards.find(b => b.id === boardId);
        const newTask = {
            id: '99',
            content: taskName,
        };
        
        currentBoard.tasks.push(newTask);
        setBoards(boards.map(b => b));
    }

    return (
        <div className={css.main}>
            {
                boards.map(board =>
                    <div className={props.isMobileScreen ? css.smallBoard : css.board}
                        onDragOver={(e) => dragOverCardHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board)}>
                        {board.title}
                        {board.tasks.map(task =>
                            <div className={css.task}
                                draggable={true}
                                // onDragOver={(e) => dragOverHandler(e)}
                                // onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, task)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                // onDrop={(e) => dropHandler(e, board)}
                                >
                                {task.content}
                            </div>)}
                        <Input boardId={board.id} addTask={addNewTask} />
                    </div>
                )
            }
        </div>
    );
}

export default Main

