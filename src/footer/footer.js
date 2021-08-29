import css from './footer.module.css'

export default function Footer (props){
    return(
        <div className={props.isMobileScreen ? css.smallFooter : css.footer}>
            <p>Active tasks: {props.activeCount}</p>
            <p>Finished tasks: {props.finishedCount}</p>
            <p>Kanban board by <a href='#'>Alla Malyshko</a>, {new Date().getFullYear()}</p>
        </div>
    )
}