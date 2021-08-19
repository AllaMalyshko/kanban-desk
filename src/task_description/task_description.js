import { MockData } from '../server_response_mock'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './task_description.module.css'

export default function TaskDescription (){
    const { id } = useParams();
    const [task, setTask] = useState(null)

    useEffect(() => {
        if(id) {
            const tasks = MockData.reduce(function(acc, current){ return acc.concat(current.tasks); }, [])
            const taskItem = tasks.find(x => x.id === id)
            setTask(taskItem)
        }
      }, []);

    return(
        task && <div className={css.description}>
            <h2 className={css.title}>{task.content}</h2>
            <p className={css.text}>{task.description}</p>
            <p className={css.text}>{task.create}</p>
            <Link to='/'><span className={css.cross}>&#215;</span></Link>
        </div>
    )
}