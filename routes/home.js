const express = require('express');
const router = express.Router();
const weatherController=require('../controllers/WeatherController')
/* GET home page. */
router.get('/', (req, res)=> {
  res.render('index')
  });
  
router.get('/weather',weatherController.getData)

module.exports = router;
