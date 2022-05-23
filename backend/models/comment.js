'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const CommentSchema = new Schema({
    content:{type:String},
    publication:{type:Schema.Types.ObjectId},
    created:{type:Date,default:Date.now},
    publisher:{type:Schema.Types.ObjectId},
    type_publisher:{type:String}
},{collection:'comments'});
/* Registrar esquema */
module.exports = mongoose.model("Comment",CommentSchema);