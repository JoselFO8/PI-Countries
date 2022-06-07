const { Router } = require('express');
const axios = require('axios')

const { Op, Country, TouristActivity } = require('../db.js');

const router = Router();

const getCountries = async () => {
    const response = await axios(`https://restcountries.com/v3/all`)
    const map = await response.data.map(a => {
        const country = {
            id: a.cca3,
            name: a.name.official,
            flag: a.flags[1],
            continent: a.continents[0],
            capital: a.capital != null ? a.capital[0] : "No data", //
            subregion: a.subregion,
            area: a.area,
            population: a.population,
        }
        return country
    })
    return map
}

const countriesToDb = async () => {
    try {
        // Se verifica si la base de datos (db) contiene informacion
        const countries = await Country.findAll();
        // De lo contrario ingresar informacion a la db de 
        if(countries.length === 0) {
            // Tomar data de paises
            const array = await getCountries();
            await Country.bulkCreate(array)
        }
    } catch (error) {
        console.log(error)
    }
}

const loadCountries = async () => { await countriesToDb() }
loadCountries()

router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        if(!name) {
            const countries = await Country.findAll();
            
            if(countries.length) {
                return res.status(200).json(countries);
            } else {
                return res.status(404).send("Countries not found!");
            }
        } else {
            const country = await Country.findAll({
                where: {
                    name: {[Op.substring]: name} // que incluya el texto que se nos pasa por query
                }
            })
            if(country.length) {
                return res.status(200).json(country);
            } else {
                return res.status(404).send("Country not found!");
            }
        }    
    } catch (error) {
        console.log(error)
    }
});

// GET /countries/{idPais}:
router.get('/countries/:idPais', async (req, res) => {
    const { idPais } = req.params;
    
    try {
        const country = await Country.findOne({
            where: {
                id:  idPais.toUpperCase()
            }, 
            include: [{ // eagerloading de TouristActivity
                model: TouristActivity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })
        if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("Country not found!");
        } 
    } catch (error) {
        console.log(error)
    }
    
});
  
module.exports = router;