'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const TeacherSchema = new Schema({
    name:{type:String},
    cedula:{type:String},
    password:{type:String},
    photo:{type:String},
    groups:[{
        type: String
    }],
    classes:[{
        type:Schema.Types.ObjectId
    }],
    careers:[{
        type: String
    }]
},{collection:'teachers'});
/* Registrar esquema */
module.exports = mongoose.model("Teacher",TeacherSchema);