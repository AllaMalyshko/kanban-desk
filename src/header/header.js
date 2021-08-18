import css from './header.module.css'
import icon from './icon.png'
import Dropdown from '../dropdown/dropdown'

export default function Header (props){
    return(
        <div className={props.isMobileScreen ? css.smallHeader : css.header}>
            <h1 className={props.isMobileScreen ? css.smallTitle : css.title}>Awesome Kanban Board</h1>
            <img className={props.isMobileScreen ? css.smallIcon : css.icon} src={icon}></img>
            <Dropdown />
        </div>
    )
}