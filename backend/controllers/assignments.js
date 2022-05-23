"use strict";
var validator = require("validator");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Assignment = require("../models/assigment");
const Publication = require("../models/publication");
const Classe = require("../models/classe");
const StateAssignment = require("../models/state.assignment");

module.exports = {
  createAssignment: async (req, res) => {
    var title = req.body.title;
    var publication = req.body.publication;
    var classe = req.body.classe;
    var delivery = req.body.delivery;
    try {
      var full =
        !validator.isEmpty(title) &&
        !validator.isEmpty(publication) &&
        !validator.isEmpty(classe);
    } catch (err) {
      return res.status(500).send({
        message: "missing data",
      });
    }
    if (full) {
      var assignment = new Assignment();
      assignment.title = title;
      assignment.delivery = delivery;
      assignment.classe = classe;
      assignment.publication = publication;
      try{
          var stored = await assignment.save();
        if (!stored) {
            throw "Not saved";
        } else {
            // enviar respuestas
            return res.status(200).send({
            status: "success",
            stored
            });
        }
      }catch(err){
          console.log(err);
        return res.status(404).send({
            status: "error",
             message: "Error en el servidor.",
            });
      }
      
    }
  },
  isAssignmentPublication: async (req, res) => {
    var id = req.params.id;
    try {
      var assignment = await Assignment.findOne({publication : id});
        return res.status(200).send({
            status: "success",
            check: (assignment != undefined && assignment != null)
            });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  assignToStudents: async (req, res) => {
    var id = req.params.id;
    try {
        var assign = await Assignment.findOne({_id:id});
        var students = await Student.find({ classes: assign.classe });
        for(var it of students){
            var statea = new StateAssignment();
            statea.assignment = assign._id;
            statea.student = it._id;
            statea.classe = assign.classe;
            statea.delivered = false;
            await statea.save();
        }
        return res.status(200).send({
            status:"success"
        });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  deliveryAssignment: async (req, res) => {
    var sid = req.body.student;
    var aid = req.body.assignment;
    try {
      var status = await StateAssignment.findOne(
          { student:sid,
            assignment:aid});
      status.delivered = true;
      await status.save();
      return res.status(200).send({
        status: "success"
        });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  isDeliveredAssigment: async (req, res) => {
    var aid = req.body.assignment;
    try {
      var status = await StateAssignment.findOne({student:req.user._id,assignment:aid});
      return res.status(200).send({
        status: "success",
        check:status.delivered
        });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  getAssignmentInfo: async (req, res) => {
    const id = req.params.id;
    try {
      var assignment = await Assignment.findOne({_id:id});
      if(assignment){
        return res.status(200).send({
            status: "success",
            assignment
            });
      }else{
        throw "Exception: not found";
        }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  removeAssignment: async (req, res) => {
    const id = req.params.id;
    try {
      var assignment = await Assignment.findOne({_id:id});
      if(assignment){
        await Assignment.deleteOne({_id: assignment._id});
        await StateAssignment.deleteMany({assignment: assignment._id});
        await Publication.deleteOne({_id: assignment.publication});
        return res.status(200).send({
            status: "success"
            });
      }else{
        throw "Exception: not found";
        }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  }
};
