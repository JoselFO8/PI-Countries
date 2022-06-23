import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addTouristActivities } from '../../Redux/actions/actions.js'

import { getCountries } from '../../Redux/actions/actions.js'
import style from './ActivitiesForm.module.css'


function validate(input) {
    let errors = {};

    if (input.countryId.length === 0) errors.countryId = 'Country is required';

    if (!input.name) {
        errors.name = 'Activity name is required';
    } else if (/[^A-Za-z0-9]+/g.test(input.name)) {
        errors.name = 'Activity name must not contain symbols or special characters';
    }
  
    if (!input.duration) {
        errors.duration = 'Activity duration is required';
    } else if(input.duration <= 0 || input.duration > 24) {
        errors.duration = 'Choose a value between 1 and 24';
    } else if (!/^[0-9]*$/gm.test(input.duration)) {
        errors.duration = 'Must only contain numeric characters';
    }

    if (!input.difficulty) errors.difficulty = 'Difficulty is required';
    
    if (!input.season) errors.season = 'Season is required';
    
    return errors;
};
  
export default function  ActivitiesForm() {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCountries());
    },[dispatch]);

    const [input, setInput] = useState({
        name: '',
        duration: '',
        difficulty: '',
        season: '',
        chooseCountries: '',
        countryId: [],
    });

    const [errors, setErrors] = useState({
        countryId: 'Country is required'
    })

    const handleInputsChange = (e) => {
        setInput((estado) => {
            if(e.target.name === "countryId") {
                return {
                    ...estado,
                    [e.target.name]: [...estado.countryId, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name]: e.target.value
                }
            }
            
        })

        let errorsResult = validate({
                ...input,
                [e.target.name]: e.target.value
            })
        setErrors(errorsResult);
    }
    

    const handleOnSubmit = function(e) {
        e.preventDefault();
        if(errors.name || errors.duration || errors.difficulty || errors.season || errors.countryId) {
            return alert ('Before sending the information, make sure that all the fields are correctly filled out')
        } else {
            let id = input.countryId
            for(let data of id) {
                input.countryId = data
                dispatch(addTouristActivities(input))
            }
            alert('Information sent')

            // Limpiar formulario            
            document.getElementById('activitiesForm').reset();
            setInput({ ...input, countryId: [], chooseCountries: ''})
        }
    }

    const deleteInput = function(e) {
        let filterContryId = input.countryId.filter(c => {
            if(c !== e.target.value) {
                return c
            }
        })

        setInput({
            ...input,
            countryId: filterContryId
        })
    }
    

    const countriesState = useSelector((state) => state.countries)
    
    let coincidences
    
    let selectedCountries = []
    
    const state = countriesState.filter((country) => {
        let value
        
        for (let i = 0; i < input.countryId.length; i++) {
              if(country.id === input.countryId[i] ) {
                selectedCountries.push(country)
                value = input.countryId[i]
              }
          }
        if(country.id !== value) return country
    })


    // mejorar
    if(input.chooseCountries) {
        coincidences = state.filter(country => {
            let name = country.name.toLowerCase()
            let data = input.chooseCountries.toLowerCase()
            if(name.indexOf(data) !== -1) {
                return country
            }
        })
    }

    const renderFilter = (
        coincidences && coincidences.length === 0
        ?   <p className={style.errors}> Country not found!</p>
        :  coincidences && coincidences.map(country => { 
                return (
                    <div key={country.id}>
                        <label>Name: {country.name} ({country.id}) <button name="countryId" id="countryId" value={country.id} onClick={(e) => handleInputsChange(e)}>Agregar</button></label>
                    </div> 
                )
            }) 
    )

    const renderDulpicados = (
        selectedCountries && selectedCountries.length === 0
        ?   <p>Country not found!</p>
        :  selectedCountries && selectedCountries.map(country => { 
                return (
                    <div className={style.selected} key={country.id}>
                        <label>Name: {country.name} ({country.id}) <button name="countryId" id="countryId" value={country.id} onClick={(e) => deleteInput(e)}>Eliminar</button></label>
                    </div> 
                )
            }) 
    )

    
    

    return (
        <div className={style.ActivitiesForm}>
            
            <div className={style.formContainer}>
                <h1 className={style.title}>Please enter the desired activities in the form</h1>
                
                <div className={style.chooseCountries}>
                    <label>Choose countries: </label>
                    <input type="text" 
                    name="chooseCountries" //countryId
                    id="chooseCountries"
                    placeholder='Choose the countries...'
                    onChange={(e) => handleInputsChange(e)} 
                    />
                    {errors.countryId && ( <p className={style.errors}>{errors.countryId}</p> )}
                    <div className={style.searchCountries}>
                        { renderFilter }
                    </div>
                </div>

                <form className={style.form} id="activitiesForm" onSubmit={(e) => handleOnSubmit(e)}>
                    <div className={style.activityName}>
                         <label>Activity name: </label>
                        <input
                            type="text" 
                            name="name"
                            id="name"
                            placeholder='Enter activity...'
                            onChange={(e) => handleInputsChange(e)} 
                        />
                        {errors.name && ( <label className={style.errors}> {errors.name}</label> )}
                    </div>

                    <div className={style.duration}>
                    <label>Duration: </label>
                    <input
                        type="text" 
                        name="duration" 
                        id="duration"
                        placeholder='Duration in hours...'
                        onChange={(e) => handleInputsChange(e)} 
                    />
                    {errors.duration && ( <label className={style.errors}>{errors.duration}</label> )}
                    </div>
                    

                    <div className={style.difficulty}>
                        <label htmlFor="">Difficulty </label>
                        <select name="difficulty" id="difficulty" /*size="5"*/ onChange={(e) => handleInputsChange(e)} >
                        <option> </option>
                            <option value={1}>1 </option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        {errors.difficulty && ( <label className={style.errors}>{errors.difficulty}</label> )}
                    </div>


                    <div className={style.season}>
                        <label htmlFor="">Season </label>
                        <select name="season" id="season" onChange={(e) => handleInputsChange(e)} >
                        <option> </option>
                            <option value={"Spring"}>Spring </option>
                            <option value={"Summer"}>Summer</option>
                            <option value={"Autumn"}>Autumn</option>
                            <option value={"Winter"}>Winter</option>
                        </select>
                        {errors.season && ( <label className={style.errors}>{errors.season}</label> )}
                    </div>


                    <div className={style.button}>
                        <input type="submit" name="submit" disabled={Object.keys(errors).length === 0 ? false : true}/>
                    </div>
                </form>

                <div className={style.countries}>
                    { renderDulpicados }
                </div>
            </div>
            
        </div>
    )

}


