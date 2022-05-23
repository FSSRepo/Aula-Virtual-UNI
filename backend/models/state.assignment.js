'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const StateAssignmntSchema = new Schema({
    assignment:{type:Schema.Types.ObjectId},
    student:{type:Schema.Types.ObjectId},
    classe:{type:Schema.Types.ObjectId},
    delivered:{type:Boolean,default:false}
},{collection:'states-assign'});

/* Registrar esquema */
module.exports = mongoose.model("StateAssignment",StateAssignmntSchema);