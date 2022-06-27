import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetail} from '../../Redux/actions/actions.js';

import style from './CountryDetail.module.css'


export default function CountryDetail () {
    let { id } = useParams();
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCountryDetail(id));
    },[dispatch]); 

    const COUNTRY = useSelector((state) => state.country)
    
    const numberWithDot = (x) => {
        if(typeof x === 'number') {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    }

    
    const render = (
        COUNTRY && COUNTRY.id
            ?   (
                <div key = {COUNTRY.id} className={style.CountryDetail}>
                    
                    <div className={style.detailContainer}>

                        <div className={style.background} />
                        
                        <div className={style.countryName}>
                            <h1>{COUNTRY.name}</h1>
                        </div>

                        <div className={style.flag}>
                            <img className={style.img} src={COUNTRY.flag} alt={COUNTRY.name} />
                        </div>

                        <div className={style.detail}>
                            <div className={style.textContainer}>
                                <h2>Continent: {COUNTRY.continent}</h2>
                                <h4>Capital: {COUNTRY.capital}</h4>
                                <h4>Country code: {COUNTRY.id}</h4>
                                <h4>Subregion: {COUNTRY.subregion}</h4>
                                <h4>Area: {numberWithDot(COUNTRY.area)} km²</h4>
                                <h4>Population: {numberWithDot(COUNTRY.population)} people</h4>
                            </div>
                        </div>
                        
                        <div className={style.activities}>
                            <h2>Tourist activities:</h2>
                            {
                                COUNTRY.TouristActivities.length === 0
                                ?   <p>Empty...</p>
                                    
                                    
                                
                                :   COUNTRY.TouristActivities.map(activities => { 
                                        return (
                                            <div className={style.detailActivities}>
                                                    <p className={style.name}>Name: {activities.name}</p>
                                                    <p className={style.difficulty}>Difficulty: {activities.difficulty}</p>
                                                    <p className={style.duration}>Duration: {activities.duration}</p>
                                                    <p className={style.season}>Season: {activities.season}</p>
                                            </div>
                                        )
                                    })
                            }
                        </div>

                        <div className={style.addActivity}>
                            <Link to={'/activities'}>
                                <div className={style.buttonAdd}>
                                    <h4>Add a tourist activity</h4>
                                </div>
                            </Link>
                        </div>
                    

                    </div>
                                          
                </div>
                )
            :   <div>
                    <h1>Loading...!</h1>
                </div>
            
    )
    
    
    return (
        <div className={style.CountryDetail}>
            { render }
        </div>
    )
    
}
