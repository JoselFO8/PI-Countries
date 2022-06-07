const { Router } = require('express');

const { TouristActivity, Country } = require('../db.js');

const router = Router();


router.post('/activities', async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;

  if(!name || !difficulty || !duration || !season || !countryId){
    return res.status(404).send("Some fields need to be filled");
  }
  try {
    const newTouristActivity = await TouristActivity.create({
      name,
      difficulty,
      duration,
      season,
      countryId
    })
    res.status(200).json(newTouristActivity);
    
    //Como el id se esta generando automaticamente para la tabla, busco la tabla y obtengo el id de touristAct
    const getId = await TouristActivity.findAll({
      where: { name: name}
    })

    // transfer
    const country = await Country.findByPk(countryId);
    await country.addTouristActivity(getId[0].dataValues.id);

  } catch (error) {
    res.send(error);
  }
});
  
module.exports = router;