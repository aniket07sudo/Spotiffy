import React from 'react';
import Item from './item';

function DropdownMenu(props) {

        return(
            <ul className="dropdown">
                {props.children}
             </ul>
        )
}


export default DropdownMenu;