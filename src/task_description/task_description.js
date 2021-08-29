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
        task && <div className={css.description_block}>
            <div className={css.description_content}>
                <h2 className={css.title}>{task.content}</h2>
                <p className={css.date}>Create: {task.create}</p>
                <p className={css.text}>{task.description}</p>
                <Link className={css.cross} to='/'><span >&#215;</span></Link>
            </div>
        </div>
    )
}