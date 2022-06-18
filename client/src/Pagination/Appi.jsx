import React, { useState } from 'react';

import { Wrapper } from '../Pagination/Wrapper';

const DATOS_API = Array.from(
    {length: 60}, (value, index) => {
        return {id: index, title: `Item #${index}`}
    }
)

const ITEMS_PER_PAGE = 10;

function Appi() {
    // console.log({DATOS_API})
    // console.log(useState())
    const [datosFromApi, setdatosFromApi] = useState(DATOS_API)
    const [items, setItems] = useState([...DATOS_API].splice(0, ITEMS_PER_PAGE))
    const [currentPage, setCurrentPage] = useState(0);

    console.log(items)

    const nextHandler = () => {
        const totalElements = datosFromApi.length
        const nextPage = currentPage + 1
        const firstIndex =  nextPage * ITEMS_PER_PAGE
        
        if(firstIndex === totalElements) return;

        setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);

        // console.log("next")
    }

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if(prevPage < 0) return;

        const firstIndex = prevPage * ITEMS_PER_PAGE;

        setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(prevPage)
        // console.log("prev")
    }

    return (
        <div>
            <h1>Desde Appi</h1>
            {/* <Wrapper currentPage={0} items={datosFromApi} prevHandler={prevHandler} nextHandler={nextHandler} ></Wrapper> */}
            <Wrapper currentPage={currentPage} items={items} prevHandler={prevHandler} nextHandler={nextHandler} ></Wrapper>
        </div>
    )
}

export default Appi