'use strict'

var mongoose = require('mongoose');
const { Schema } = mongoose;
/*
    Estructura de datos
*/ 
const StudentSchema = new Schema({
    name:{type: String},
    n_carnet:{type: String},
    password:{type: String},
    group:{type: String},
    classes:[{
        type: Schema.Types.ObjectId
    }],
    career:{type: String},
    photo:{type: String},
    skill:{type: String},
    work:{type: String},
    semestre:{type: Number}
},{ collection: 'students' });

/* Registrar esquema */
module.exports = mongoose.model("Student",StudentSchema);