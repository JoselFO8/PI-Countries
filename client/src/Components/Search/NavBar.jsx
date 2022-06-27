import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';

import { orderCountries, filterCountries, getTouristActivities } from '../../Redux/actions/actions.js';
import style from './NavBar.module.css'

export default function NavBar() {

  const dispatch = useDispatch()
  const [value, setValue] = useState({
    order: ''
  })

  function handleChange(event) {
    setValue(event)
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(filterCountries({type: "country", argument: value}))

  }
    
  function order(event) {
    dispatch(orderCountries(event.target.value))
    document.getElementById(event.target.id).selectedIndex = 0
  }

  function filter(event) {
    dispatch(filterCountries({type: event.target.name, argument: event.target.value}))
    document.getElementById(event.target.id).selectedIndex = 0
  }

  const State = useSelector((state) => state)

  let allActivities = State.touristActivities.map(activity => activity.name)
  let activities = allActivities.filter((activity, index) => allActivities.indexOf(activity) === index )

  useEffect( () => {
    dispatch(getTouristActivities());
  },[dispatch]);

  const {pathname} = useLocation();

  const renderActivities = (
    activities && activities.length > 0
      ? activities.map(activity => {
        return (
          <option value={activity}>{activity}</option>
        )
      }) 
      : <option>No activities yet</option>
      
  )
    
  return (
    <div className={style.NavBar}>

      <div className={style.container}>
        <div className={style.textContainer}>
          <h2 className={style.title}>Countries App </h2>
          <h1 className={style.title}> | </h1>
          <h2 className={style.title}>manage your tourist trips </h2>
        </div>

          {
            pathname === '/home'
            ?  <div className={style.navContainer}>
                <div className={style.search}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <input 
                            type="text" 
                            name="searchCountry"
                            id="searchCountry"
                            placeholder='Search by country...' 
                            onChange={(e) => handleChange(e.target.value)} 
                          />
                          <button type="submit">Search</button>
                        </form>
                        {
                          State.error && typeof State.error.searchCountry === 'string'
                            ? <label>{State.error.searchCountry}</label>
                            : <></>
                        }
                      </div>

                  <div className={style.order}>
                    <label htmlFor="">Order by </label>
                    <select name="orderType" id="orderType" onChange={(e) => {order(e)}}>
                      <option> </option>
                      <option value="ASC">Country name: ascending</option>
                      <option value="DES">Country name: descending</option>
                      <option value="least">Population size: least first</option>
                      <option value="largest">Population size: largest first</option>
                    </select>
                  </div>

                  <div className={style.continent}>
                    <label htmlFor="">Continent </label>
                    <select name="continent" id="continent" onChange={(e) => {filter(e)}}>
                      <option> </option>
                      <option value={"Africa"}>Africa</option>
                      <option value={"Antarctica"}>Antarctica</option>
                      <option value={"Asia"}>Asia</option>
                      <option value={"Europe"}>Europe</option>
                      <option value={"North America"}>North America</option>
                      <option value={"Oceania"}>Oceania</option>
                      <option value={"South America"}>South America</option>
                    </select>
                  </div>

                  <div className={style.activities}>
                    <label htmlFor=""> Activities </label>
                    <select name="activity" id="activity" onChange={(e) => {filter(e)}}>
                      <option> </option>
                      { renderActivities }
                    </select>
                  </div>
              </div>
            : <div className={style.tohomeContainer}>
                <Link to='/home'>
                  <div className={style.tohome}> <h2> Go back home </h2> </div>
                </Link>
              </div>
          } 
        </div>
    </div>
  );
  
}