let express = require('express');
let router = express.Router();
let cors = require('cors')
let bodyParse = require('body-parser')
const app = require('../app')
const mongoose = require('mongoose')
const nesgamesModel = require('../models/nesgames.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ADMINISTRATION' });
})

router.get('/allgames', (req, res) => {
  nesgamesModel.find()
      .then(results =>{
        res.send(results)
      })
      .catch(error => console.log('Erreur pas de jeux'))
})
/***************ADD GAMES***********************/
/* Ajouter un jeux -> nesgames */
router.get('/allgames/addgames',(req, res) => {
  res.render('addgames')
})
router.post('/allgames/addgames', (req,res) => {
    nesgamesModel.create(req.body).then(
      addGames => {
        addGames.save(
            err =>{
                if(err){
                    console.log("erreur lors de l'ajout du jeux")
                }else{
                    res.send(addGames)
                }
            })
      })
})

/*********************GAME BY ID******************************/
//1 - Appel de la route depuis un bouton /allgames/detailsgames/{{ games.id }} + id twig
//2 - passer l'id en chaine de charactère
//3 - trouve id + passer les resultats en variable (results)
//4 - appel des données avec twig {{results.title}} etc...

router.get('/allgames/detailsgames/:id',  (req,res) => {
  const id = req.params.id.toString()
  nesgamesModel.findById(id)
      .then(results =>{
        if(results) {
            //ici on utlise resluts pour afficher les datas {{ (le 1er)results: (qui appel l'objet)results}}
          res.render('detailsgames', {results: results})
        }else{
          console.log("erreur ID")
        }
  })
})

/*****************************SUPPRIMER UN JEUX**************************************************/
router.get('/allgames/:id', (req,res) =>{
  const query = req.query
  nesgamesModel.findOneAndDelete(query.id)
      .then(gameToDelete => {
        if(gameToDelete){
            //ici on utlise data pour les placeholder du formulaire
          res.send({"Jeux effacé avec succès": true, data: gameToDelete})
        }else{
          console.log("Impossible de supprimer le jeux : " + query.id)
        }
      })
})

/********************EDITER UN JEUX**********************************/
router.get('/allgames/editgames/:id',(req, res) => {
    res.render('editgames')
})


router.post('/allgames/editgames/:id', (req,res) =>{
    const id = req.params.id.toString()

    nesgamesModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(gameToUpdate =>{
            if(gameToUpdate){
                res.send(gameToUpdate)
            }else{
                console.log("Pas le bon ID")
            }
        })

})
module.exports = router;
