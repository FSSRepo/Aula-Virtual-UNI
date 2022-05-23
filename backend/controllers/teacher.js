"use strict";
var validator = require("validator");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Assignment = require("../models/assigment");
const Publication = require("../models/publication");
const Classe = require("../models/classe");
const StateAssignment = require("../models/state.assignment");
const Comment = require("../models/comment");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
  createTeacher: async (req, res) => {
    var name = req.body.name;
    var cedula = req.body.cedula;
    var password = req.body.password;
    var careers = req.body.careers;
    var groups = req.body.groups;
    try {
      var full = !validator.isEmpty(name) &&
                 !validator.isEmpty(cedula) &&
                 !validator.isEmpty(password);
    } catch (err) {
      return res.status(500).send({
        message: "missing data",
      });
    }
    if(full){
      var teacher = new Teacher({name,cedula,groups,careers});
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
      teacher.classes = [];
      teacher.photo = req.body.photo != undefined ? req.body.photo : null; 
      teacher.save((err, teacherstored) => {
        if (err || !teacherstored) {
          return res.status(404).send({
            status: "error",
            message: "No encontrado"
          });
        } else {
          // enviar respuestas
          return res.status(200).send({
            status: "done"
          });
        }
      });
    }
  },
    
    getClasses : async (req, res) => {
      try{
        var clses = await Classe.find({_id : {$in : req.user.classes}});
        return res.status(200).send({
          status:'done',
          classes: clses
        });
      }catch(err){
        console.log("server error: "+err);
          return res.status(500).send({
            message:"error"
          });
      }
    },
    
    getProfile: async (req, res) => {
      try {
        var teacher = req.user;
        return res.status(200).send({
          name:teacher.name,
          photo:teacher.photo,
          groups:teacher.groups,
          careers:teacher.careers
        });
      } catch (err) {
        console.log("server error: " + err);
        return res.status(500).send({
          message: "error",
        });
      }
    }
};