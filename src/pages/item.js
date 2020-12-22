import React from 'react';
function Item(props) {
    return(
        <>
            <li className={props.border ? "drop-divider" : null}>
                <a href="#">
                    {props.children}
                </a>
            </li>
       </>
    )
}

export default Item;