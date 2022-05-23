'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const ClasseSchema = new Schema({
    name:{type:String},
    photo:{type:String},
    unit:{type:String},
    progress:{type:Number},
    group:{type: String},
    teacher:{type: Schema.Types.ObjectId}
},
    {collection:'classes'});
/* Registrar esquema */
module.exports = mongoose.model("Classe",ClasseSchema);