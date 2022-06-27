import {GET_COUNTRIES, FILTER_COUNTRIES, ORDER_COUNTRIES, GET_COUNTRY_DETAIL, ADD_TOURIST_ACTIVITIES, GET_TOURIST_ACTIVITIES} from '../action-types/actionsTypes.js'

const initialState = {
    countries: [],
    searchCountries: [],
    country: {},
    touristActivities: [],
};


export default function rootReducer(state = initialState, action) {
    
    const order = (array, params) => {
        let orderCountries = array.sort((a, b) => {
            if (a[params] > b[params]) return 1
            if (a[params] < b[params]) return -1
            return 0;
        })
        return orderCountries
    }
    
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state, 
                countries: action.payload
            }
        
        case FILTER_COUNTRIES:
            const {type, argument} = action.argument
            let countries

            if(type === 'continent') {
                countries = action.payload.filter(c => {
                    if(c.continent === argument) return c
                })
            } else if(type === 'activity') {
                countries = action.payload.filter(c => {
                    let activity = false
                    
                    for (let value of c.TouristActivities) {
                        if(value.name === argument) {
                            activity = true 
                        }
                      }

                    if(activity === true) return c
                })
            } else if(type === 'country') {
                countries = action.payload.filter(c => {
                    if(c.name.toLowerCase().includes(argument.toLowerCase())) {
                        return c
                    } 
                })
            }

            if(countries.length === 0) {
                return {
                    ...state, 
                    error: {searchCountry: "Country not found!"}
                }    
            } else {
                return {
                    ...state, 
                    searchCountries: countries,
                    error: '' 
                }
            }

        case ORDER_COUNTRIES:
            console.log("desde ORDER_COUNTRIES")
            let orderedCountries

            if(action.payload === "ASC") { 
                if(state.searchCountries.length > 0)  orderedCountries = order(state.searchCountries, "name")
                else orderedCountries = order(state.countries, "name")

            } else if(action.payload === "DES") {
                if(state.searchCountries.length > 0) orderedCountries = order(state.searchCountries, "name").reverse()
                else orderedCountries = order(state.countries, "name").reverse()

            } else if(action.payload === "least") {
                if(state.searchCountries.length > 0) orderedCountries = order(state.searchCountries, "population") 
                else orderedCountries = order(state.countries, "population")
                
            } else if(action.payload === "largest") { 
                if(state.searchCountries.length > 0) orderedCountries = order(state.searchCountries, "population").reverse()
                else orderedCountries = order(state.countries, "population").reverse()
            }

            return {
                ...state, 
                searchCountries: orderedCountries
            }

        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                country: action.payload
            }

        case ADD_TOURIST_ACTIVITIES:
            return {
                ...state,
                touristActivities: [...state.touristActivities, action.payload]
            }

        case GET_TOURIST_ACTIVITIES:
            return {
                ...state, 
                touristActivities: action.payload
            }
        default:
            return state;
    }
}