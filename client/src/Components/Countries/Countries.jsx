import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {getCountries} from '../../Redux/actions/actions.js';
import travellingTheWorld from '../../pictures/travellingTheWorld.gif'
import style from './Countries.module.css'

export default function Countries() {

  // Compartido

  const dispatch = useDispatch()

  const [allCountries, setAllCountries] = useState([])
  const [flag, setFlag] = useState()
  
  const state = useSelector((state) => state)
  const { countries, searchCountries} = state
  
  if(countries.length > 0 && allCountries.length === 0 && searchCountries.length === 0) {
    setFlag(true)
    setAllCountries(countries)
  } else if(countries.length > 0 && searchCountries.length > 0 && flag === true) {
    setFlag(false)
    setAllCountries(searchCountries)
  } else if(searchCountries !== allCountries && searchCountries.length > 0) {
    setAllCountries(searchCountries)
  }
   
  useEffect( () => {
    dispatch(getCountries());
  },[dispatch]);


  // ------------------------------ Numerico ------------------------------ //

  const [currentPage, setCurrentPage] = useState(1); // No of pages
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  const lastIndex = currentPage === 1
    ? currentPage * countriesPerPage
    : (currentPage * countriesPerPage) - 1
    
  const firstIndex = lastIndex - countriesPerPage;
  const pageNumber = [];

  if(currentPage === 1 && countriesPerPage === 10) {
    setCountriesPerPage(9) // setear por fuera?
  } else if(currentPage !== 1 && countriesPerPage === 9) {
    setCountriesPerPage(10)
  }

  const currentCountries = [...allCountries].slice(firstIndex, lastIndex)


  if (currentPage === 1 && searchCountries.length > 0 && searchCountries.length <= 9) {
    for (let i = 1; i <= (Math.floor((allCountries.length - 1) / (countriesPerPage + 1)) + 1); i++) {
      pageNumber.push(i);
    }
  } else if (currentPage === 1) {
    for (let i = 1; i <= (Math.round((allCountries.length - 1) / (countriesPerPage + 1)) + 1); i++) {
      pageNumber.push(i);
    }
  } else {
    for (let i = 1; i <= (Math.round((allCountries.length) / countriesPerPage) + 1); i++) {
      pageNumber.push(i);
    }
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
            ? <button className={style.changePage} onClick={() => setCurrentPage(currentPage - 1)} > Previous </button>
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
            ? <button className={style.changePage} onClick={() => setCurrentPage(currentPage + 1)} > Next </button>
            : <></>
        }
      </div>
      
    </div>  
  )



};
