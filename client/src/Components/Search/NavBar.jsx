import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { orderCountries, filterCountries, getTouristActivities} from '../../Redux/actions/actions.js';

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

  const renderActivities = (
    activities && activities.length > 0
      ? activities.map(activity => {
        return (
          <option value={activity}>{activity}</option>
        )
      }) 
      : <option>No activities yet</option>
      
  )

  useEffect( () => {
    dispatch(getTouristActivities());
  },[dispatch]);




    
  return (
    <div > 
      <h1>Desde nav</h1>
      <span> Countries App</span>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
          type="text" 
          name="searchCountry"
          id="searchCountry"
          placeholder='Search by country...' 
          onChange={(e) => handleChange(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>
      {
        State.error && typeof State.error.searchCountry === 'string'
          ? <p>{State.error.searchCountry}</p>
          : <></>
      }
      
      <div>
        <label htmlFor="">Order by </label>
        <select name="orderType" id="orderType" onChange={(e) => {order(e)}}>
          <option> </option>
          <option value="ASC">Country name: ascending</option>
          <option value="DES">Country name: descending</option>
          <option value="least">Population size: least first</option>
          <option value="largest">Population size: largest first</option>
        </select>
      </div>
      
      <div>
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

      <div>
        <label htmlFor=""> Activities </label>
        <select name="activity" id="activity" onChange={(e) => {filter(e)}}>
          <option> </option>
          { renderActivities }
        </select>
      </div>
      
    </div>
  );
  
}