'use strict'

var mongoose = require('mongoose');
const {Schema} = mongoose;
/*
    Estructura de datos
*/ 
const PublicationSchema = new Schema({
    title:{type:String},
    summary:{type:String},
    classe:{type:Schema.Types.ObjectId},
    created:{type:Date,default:Date.now},
    imgs_res:[{type:String}],
    likes:[{type:Schema.Types.ObjectId}],
    comments:{type:Number,default:0},
    publisher:{type:Schema.Types.ObjectId},
    type_publisher:{type:String}
},{collection:'publications'});
/* Registrar esquema */
module.exports = mongoose.model("Publication",PublicationSchema);