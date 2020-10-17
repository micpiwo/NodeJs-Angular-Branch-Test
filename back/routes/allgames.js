let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/allgames', function(req, res, next) {
    res.render('allgames', { title: 'La pages des jeux !!!!!' });
});

//Export du module qui communique avec index.js point d'entrée
module.exports = router;