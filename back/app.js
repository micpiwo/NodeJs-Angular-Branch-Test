
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const allgamesRouter = require('./routes/allgames')
const mongoose = require('mongoose')
const app = express();

//Connexion a mongoDB
const LOCAL_DATABASE = "mongodb://localhost/videogames"
//Connexion => soit sur un serveur distant (uri = mongoAtlas) ou en local MongoCompass
mongoose.connect(LOCAL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
    .then(() => console.log('Connexion a mongoDB = OK'))
    .catch(() => console.log('Erreur de connexion a mongoDB'))

// Moteur de template Twig
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//Utilisation de module Webpack
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//autorise le json par defaut pour consomer des données API distante
app.use(bodyParser.json())


//creer un liens a Angular build directory 'ng-build' va sauver les resultats dans un dossier /dist
let distDir = __dirname + "/dist/";
app.use(express.static(distDir))

//Config CORS pour autorisé les navigateurs a consomé des sources distante
app.use(cors())


app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/allgames', allgamesRouter)


app.use((req,res,next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next()

  app.options('*', (req,res) => {
    //autoriser le crud
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
