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
const { doesNotMatch } = require("assert");

module.exports = {
  createClass: async (req, res) => {
    var name = req.body.name;
    var unit = req.body.unit;
    var progress = req.body.progress;
    var group = req.body.group;
    try {
      var full =
        !validator.isEmpty(name) &&
        !validator.isEmpty(unit) &&
        !validator.isEmpty(group);
    } catch (err) {
      return res.status(500).send({
        message: "missing data",
      });
    }
    if (full) {
      try {
        var classe = new Classe();
        classe.name = name;
        classe.unit = unit;
        classe.progress = progress;
        classe.group = group;
        classe.teacher = req.user._id;
        classe.photo = req.body.photo != undefined ? req.body.photo : null;
        var stored = await classe.save();
        var t_temp = await Teacher.findById(req.user._id);
        t_temp.classes.push(stored._id);
        await t_temp.save();
        return res.status(200).send({
          status: "success",
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
  getClassInfo: async (req, res) => {
    var id = req.params.id;
    try {
      var classe = await Classe.findOne({ _id: id });
      if(!classe) return res.status(404).send({status:"Not found"});
      var tea = await Teacher.findOne({_id: classe.teacher});
      if (classe) {
        return res.status(200).send({
          status:'done',
            name: classe.name,
            group: classe.group,
            unit:classe.unit,
            progress:classe.progress,
            photo:classe.photo,
            teacher:tea.name
          });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("Server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error"
      });
    }
  },
  getClassStudents: async (req, res) => {
    var id = req.body.id;
    try {
      var students = await Student.find({ classes: id,password:0 });
      return res.status(200).send({
        status:'done',
        students:students
      });
    } catch (err) {
      console.log("Server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error"
      });
    }
  },
  getClassesByGroup: async (req, res) => {
    var group = req.body.group;
    try {
      var cls = await Classe.find({ group: group });
      return res.status(200).send({
        status:'done',
        classes:cls
      });
    } catch (err) {
      console.log("Server error: " + err);
      return res.status(500).send({
        status:'error',
        message: "Server Request Error",
      });
    }
  }
};
