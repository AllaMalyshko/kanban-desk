import React, { useState, useEffect } from 'react';
import css from './main.module.css';
import Input from '../input'
import TaskDescription from '../task_description/task_description';
import { Link, Switch, Route } from 'react-router-dom'
import TaskMove from '../taskMove';

const Main = (props) => {
    const [boards, setBoards] = useState(props.boards)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentTask, setCurrentTask] = useState(null)

    useEffect(() => {
       const storedBoards = localStorage.getItem('boards')
       if(storedBoards) {
           setBoards(JSON.parse(storedBoards))
       }
      }, []);

    function dragOverCardHandler(e) {
        e.preventDefault()
        e.target.style.boxShadow = '10px 5px 5px red;'
        // e.target.style.color = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    }

    function dropCardHandler(e, board) {
        moveTask(currentBoard.id, board.id, currentTask);
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, board, task) {
        setCurrentBoard(board)
        setCurrentTask(task)
        e.target.style.color = '#6cb1d9'
    }

    function dragEndHandler(e) {
        e.target.style.color = '#000000'
    }

    const addNewTask = (boardId, taskName) => {
        const currentBoard = boards.find(b => b.id === boardId);
        const allIds = boards.reduce(function(acc, current){ return acc.concat(current.tasks); }, []).map(t => parseInt(t.id))
        const newId = Math.max.apply(null, allIds) + 1

        const newTask = {
            id: newId.toString(),
            content: taskName,
        };

        currentBoard.tasks.push(newTask)
        setBoards(boards.map(b => b))
        saveToLocalStorage()
    }

    const moveTask = (sourceBoardId, boardId, task) => {
        const sourceBoard = boards.find(b => b.id === sourceBoardId);
        const currentIndex = sourceBoard.tasks.indexOf(task)
        sourceBoard.tasks.splice(currentIndex, 1)

        const currentBoard = boards.find(b => b.id === boardId);
        currentBoard.tasks.push(task);
        setBoards(boards.map(b => b));

        const inProgressBoard = getInProgessBoard();
        if(inProgressBoard.id === sourceBoard.id || inProgressBoard.id === currentBoard.id) {
            props.activeCountChanged(inProgressBoard.tasks.length)
        }

        const finishedBoard = getFinishedBoard();
        if(finishedBoard.id === sourceBoard.id || finishedBoard.id === currentBoard.id) {
            props.finishedCountChanged(finishedBoard.tasks.length)
        }

        saveToLocalStorage()
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    const getInProgessBoard = () => {
        return boards.find(x => x.title === 'In Progress');
    }

    const getFinishedBoard = () => {
        return boards.find(x => x.title === 'Finished');
    }

    const formTaskUrl = (task) => {
        return '/task/' + task.id
    }

    return (
        <Switch>
            <Route exact path='/'>
                <div className={props.isMobileScreen ? css.smallMain : css.main}>
                    {
                        boards.map((board, index) =>
                            <div key={board.id} className={props.isMobileScreen ? css.smallBoard : css.board}
                                onDragOver={(e) => dragOverCardHandler(e)}
                                onDrop={(e) => dropCardHandler(e, board)}>
                                {board.title}
                                {board.tasks.map(task =>
                                    <div key={task.id} className={css.task}
                                        draggable={true}
                                        onDragStart={(e) => dragStartHandler(e, board, task)}
                                        onDragEnd={(e) => dragEndHandler(e)}
                                    >
                                        <Link to={formTaskUrl(task)}>{task.content}</Link>
                                    </div>)}

                                { index === 0 && <Input boardId={board.id} addTask={addNewTask} /> }
                                { index !== 0 && <TaskMove sourceBoard={boards[index-1]} boardId={board.id} moveTask={moveTask}></TaskMove> }
                            </div>
                        )
                    }
                </div>
            </Route>
            <Route path='/task/:id'>
                <TaskDescription />
            </Route>
        </Switch>
    );
}

export default Main

