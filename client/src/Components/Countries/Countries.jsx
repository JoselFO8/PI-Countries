import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {getCountries} from '../../Redux/actions/actions.js';
import travellingTheWorld from '../../pictures/travellingTheWorld.gif';
import style from './Countries.module.css';

export default function Countries() {

  // Local states

  const dispatch = useDispatch()

  const [allCountries, setAllCountries] = useState([])
  const [flag, setFlag] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  
  const state = useSelector((state) => state)
  const { countries, searchCountries} = state
  

  if(countries.length > 0 && allCountries.length === 0 && searchCountries.length === 0) {
    setFlag(true)
    setCurrentPage(1)
    setAllCountries(countries)
  } else if(countries.length > 0 && searchCountries.length > 0 && flag === true) {
    setFlag(false)
    setCurrentPage(1)
    setAllCountries(searchCountries)
  } else if(searchCountries !== allCountries && searchCountries.length > 0) {
    setCurrentPage(1)
    setAllCountries(searchCountries)
  }
   
  useEffect( () => {
    dispatch(getCountries());
  },[dispatch]);

  // ------------------------------ Paginacion ------------------------------ //

  const lastIndex = currentPage === 1
  ? currentPage * countriesPerPage
  : (currentPage * countriesPerPage) - 1
  
  const firstIndex = lastIndex - countriesPerPage;
  const pageNumber = [1];

  if(currentPage === 1 && countriesPerPage === 10) {
    setCountriesPerPage(9) 
  } else if(currentPage !== 1 && countriesPerPage === 9) {
    setCountriesPerPage(10)
  }

  const currentCountries = [...allCountries].slice(firstIndex, lastIndex)

  // Como ya tenemos una pagina en pageNumber le restamos los primeros 9, pero le sumamos una unidad al final
  for (let i = 2; i <= (Math.ceil((allCountries.length - 9) / 10)) + 1; i++) {
    pageNumber.push(i);
  }


  const page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // ------------------------------ Render ------------------------------ //

  const render = (
    allCountries.length === 0 
      ? <div className={style.loading}>
          <img src={travellingTheWorld} alt="travelling the world" />
          <h1 className={style.textLoading}>Loading...!</h1>
        </div> 
      :  currentCountries.map((paises) => {
        return (
          <Link to={`/home/${paises.id}`}>
            <div className={style.card} key = {paises.id}>
                <div>

                  <div className={style.flag}>
                    <img className={style.image} src={paises.flag} alt={paises.name}/>
                  </div>

                  <div className={style.text}>
                    <h4 className={style.continent}>{paises.continent}</h4>
                    <h3 className={style.name}>{paises.name}</h3>
                  </div>
                  
                </div>
            </div>
          </Link> 
        )
      }) 
  )

  return (
    <div className={style.Countries}>
      <h2>Choose the country where you want to have tourist activities</h2>
      <div className={style.cardsContent}>
        { render }
      </div>

      <div>
        <p>Page: {currentPage} </p>
        {
          currentPage !== 1
            ? <button className={style.changePage} key={"Previous"} onClick={() => setCurrentPage(currentPage - 1)} > Previous </button>
            : <></>
        }

        {
          pageNumber.map((num) => {
            return (
              <button className={style.numChange} key={num} onClick={() => page(num)} > {num} </button>
            );
          })
        }
        
        {
          currentPage !== pageNumber.length
            ? <button className={style.changePage} key={"Next"} onClick={() => setCurrentPage(currentPage + 1)} > Next </button>
            : <></>
        }
      </div>
      
    </div>  
  )



};
