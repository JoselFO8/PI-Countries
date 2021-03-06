import React from "react";

export const Wrapper = (props) => {
    // console.log(props)
    const items = props.items.map((item, index) => {
        return <li key={item.id}> {item.title} </li>
    })

    return (
        <div>
            <h1>Pagina: {props.currentPage}</h1>

            <button onClick={props.prevHandler }>Prev</button>
            <button onClick={props.nextHandler }>Next</button>

            <h2>Items</h2>

            <ul>
                {items}
            </ul>
        </div>
    )
}