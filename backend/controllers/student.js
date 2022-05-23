"use strict";
var validator = require("validator");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Assignment = require("../models/assigment");
const Publication = require("../models/publication");
const Classe = require("../models/classe");
const StateAssignment = require("../models/state.assignment");
const Comment = require("../models/comment");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');

module.exports = {
  createStudent: async (req, res) => {
    var {name,skill,career,semestre,password,ncarnet,group} = req.body;
    try {
      var full =
        !validator.isEmpty(name) && !validator.isEmpty(ncarnet) && !validator.isEmpty(password) &&
        !validator.isEmpty(career) && !validator.isEmpty(group) && !validator.isEmpty(skill) &&
        !validator.isEmpty(work);
    } catch (err) {
      return res.status(500).send({
        status: "error",
        message:'missing data'
      });
    }
    if (full) {
      try {
        var student = new Student({name,n_carnet:ncarnet,skill,work,career,semestre,group});
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);
        student.photo = req.body.photo != undefined ? req.body.photo : null;
        await student.save();
        return res.status(200).send({
          status: "done"
        });
      } catch (err) {
        console.log("Server error: " + err);
        return res.status(500).send({
          status: "error",
          message: "Server Request Error",
        });
      }
    }
  },
  getClasses: async (req, res) => {
   try {
    var clses = await Classe.find({_id : {$in : req.user.classes}});
    var hw = [];
    for(var it of clses){
     var result = await StateAssignment.findOne({
       classe: it._id,
       student: req.user._id,
       delivery: false
     });
     hw.push(result != undefined && result != null);
    }
    return res.status(200).send({
       status:'done',
       classes: clses,
       homework:hw
     });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error",
      });
    }
  },
  getAssignments: async (req, res) => {
    try {
     var clses = await Classe.find({_id : {$in : req.user.classes}});
     var hw = [];
     for(var it of clses){
      var sassign = await StateAssignment.findOne({
        classe: it._id,
        student: req.user._id,
        delivery: false
      });
      if(sassign != undefined && sassign != null){
        var assign = await Assignment.findOne({
          _id:sassign.assignment
        });
        hw.push({
          id:assign._id,
          title:assign.title,
          delivery:assign.delivery,
          clase:it.name
        });
      }
     }
     return res.status(200).send({
        status:'done',
        homeworks:hw
      });
     } catch (err) {
       console.log("server error: " + err);
       return res.status(500).send({
         status:'error',
         message: "Server Request Error",
       });
     }
   },
  getProfile: async (req, res) => {
    try {
      var student = req.user;
      return res.status(200).send({
          status:'done',
          name:student.name,
          photo:student.photo,
          group:student.group,
          career:student.career,
          skill:student.skill,
          semestre:student.semestre,
          work:student.work
        });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error",
      });
    }
  },
  addClass: async (req, res) => {
    const classe = req.body.classe;
    try {
      if(req.user.classes.indexOf(classe) <= -1){
        req.user.classes.push(classe);
        await req.user.save();
        return res.status(200).send({
          status: "done"
          });
      }
     return res.status(200).send({
        status: "warning",
        message:'La clase ya esta registrada'
        });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error",
      });
    }
  }
};
