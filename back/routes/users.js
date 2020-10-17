let express = require('express');
let router = express.Router();
const userModel = require('../models/users.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', (req, res) => {
  userModel.find()
      .then(userResults =>{
        res.send(userResults)
      })
      .catch(error => console.log('Erreur pas de jeux'))
})

/***************ADD USERS***********************/

router.post('/users/adduser', (req,res) => {
  userModel.create(req.body).then(
      addUser => {
        addUser.save(
            err =>{
              if(err){
                console.log("erreur lors de l'ajout du jeux")
              }else{
                res.send(addUser)
              }
            })
      })
})
/*********************USER BY ID*********************/
router.get('/users/detailsuser/:id',  (req,res) => {
  const id = req.params.id.toString()
  userModel.findById(id)
      .then(results =>{
        if(results) {
          //ici on utlise resluts pour afficher les datas {{ (le 1er)results: (qui appel l'objet)results}}
          res.render('detailsuser', {results: results})
        }else{
          console.log("erreur ID")
        }
      })
})

module.exports = router;
