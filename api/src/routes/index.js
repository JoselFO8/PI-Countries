const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require('./country.js')
const touristActivity = require('./touristActivity.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/countries', country);
// router.use('/activities', touristActivity);
router.use('/', country);
router.use('/', touristActivity);

module.exports = router;


// COMPLETO
