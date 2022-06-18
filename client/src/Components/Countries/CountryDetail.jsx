import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetail} from '../../Redux/actions/actions.js';


export default function CountryDetail () {
    let { id } = useParams();
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCountryDetail(id));
    },[dispatch]); 

    const COUNTRY = useSelector((state) => state.country)
    console.log(id)
    const numberWithDot = (x) => {
        if(typeof x === 'number') {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    }

    
    const render = (
        COUNTRY && COUNTRY.id
            ?   (
                  <div key = {COUNTRY.id} >

                    <h1>{COUNTRY.name}</h1>
                    <img src={COUNTRY.flag} alt={COUNTRY.name} />
                    <h2>Capital: {COUNTRY.capital}</h2>
                    <h3>Continent: {COUNTRY.continent}</h3>
                    <h4>Country code: {COUNTRY.id}</h4>
                    <h4>Subregion: {COUNTRY.subregion}</h4>
                    <h4>Area: {numberWithDot(COUNTRY.area)} km²</h4>
                    <h4>Population: {numberWithDot(COUNTRY.population)} people</h4>
                    {
                        COUNTRY.TouristActivities.length === 0
                        ?   <ul>Tourist activities: 
                                <li>Empty...</li>
                            </ul>
                        :   COUNTRY.TouristActivities.map(activities => { 
                                return (
                                    <ul>Tourist activities: 
                                        <li>Name: {activities.name}</li>
                                        <li>Difficulty: {activities.difficulty}</li>
                                        <li>Duration: {activities.duration}</li>
                                        <li>Season: {activities.season}</li>
                                    </ul>
                                    
                                )
                            })
                    }

                    <Link to={'/activities'}>
                        <h4>Add a tourist activity</h4>
                    </Link>

                  </div>
                )
            :   <div>
                    <h1>Loading...!</h1>
                </div>
            
    )
    
    
    return (
        <div>
            <h1>Detalle</h1>
            { render }
        </div>
    )
    
}
