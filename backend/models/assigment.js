'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const AssignmentSchema = new Schema({
    title:String,
    delivery:Date,
    created:{type:Date,default:Date.now},
    classe:{type:Schema.Types.ObjectId},
    publication:{type:Schema.Types.ObjectId}
});
/* Registrar esquema */
module.exports = mongoose.model("Assignment",AssignmentSchema);