import css from './footer.module.css'



export default function Footer (){
    return(
        <div className={css.footer}>
            <p>Active tasks: {}</p>
            <p>Finished tasks: </p>
            <p>Kanban board by <a href='#'>Alla Malyshko</a> </p>
        </div>
    )
}