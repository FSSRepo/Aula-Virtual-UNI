'use strict'
const db = require('mongoose');

// cargar modulos para crear el servidor
const express = require('express');
const http = require('http');
const bodyparser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const all_routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const Student = require('./models/student');

// ejecutar express
const app = express();
const port = 3900;

require('./controllers/authentication');


app.use(cors({
    origin:['http://localhost:4200'],
    credentials:true
  }));

// middlewares requeridos procesan la informacion antes de que el servidor trabaje con esta
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cookieParser());

// passport autenticacion y express session
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
      }
}));
    
app.use(passport.initialize());
app.use(passport.session());


// configurar rutas
app.use('/uni-virtual',all_routes);

// conectar con la base de datos
db.set('useFindAndModify',false);

db.Promise = global.Promise;

db.connect('mongodb://localhost:27017/aula-virtual-uni',{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Conected to MongoDB");
        // escuchar peticiones
        server.address = "localhost";
        Student.findOne({_id:"5ee0210e61c4b634d0beabf5"}).then((result)=> {
          console.log(result.group);
        })
        server.listen(port,() => {
            console.log("Server is running on background.");
        });

}).catch((err) => {
    console.log("Error MongoDB connection failed: ",err)
});