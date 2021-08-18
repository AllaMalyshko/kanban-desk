import css from './dropdown.module.css';
import React, { useState } from 'react';


export default function Dropdown() {
    const [expanded, setExpanded] = useState(false);
    const handleToogle = () => setExpanded(!expanded);
   
    return (
        <div className={css.dropdown}>
            {expanded? <span onClick={handleToogle} className={css.arrow}> &#8743; </span> :  
            <span onClick={handleToogle} className={css.arrow}> &#8744; </span>}
            {expanded && <ul className={css.list}>
                <li>< a href='#'>My account</a></li>
                <li><a href='#'>My tasks</a></li>
                <li><a href='#'>Log out</a></li> </ul>}
        </div>
    )
}