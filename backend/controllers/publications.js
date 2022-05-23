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

module.exports = {
  createPublication: async (req, res) => {
    var title = req.body.title;
    var summary = req.body.summary;
    var classe = req.body.classe;
    try {
      var full =
        !validator.isEmpty(classe) &&
        !validator.isEmpty(summary) &&
        !validator.isEmpty(publisher) &&
        !validator.isEmpty(type_publisher);
    } catch (err) {
      return res.status(500).send({
        message: "missing data",
      });
    }
    if (full) {
      var publication = new Publication();
      publication.title = title != undefined ? title : null;
      publication.summary = summary;
      publication.classe = classe;
      publication.publisher = req.user._id;
      publication.type_publisher = req.user.skill ? "teacher" : "student";
      publication.imgs_res =
        req.body.imgs_res != undefined ? req.body.imgs_res : [];
      try {
        var stored = await publication.save();
        if (!stored) {
          throw "Exception: not found";
        } else {
          // enviar respuestas
          return res.status(200).send({
            status: "done",
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(404).send({
          status: "error",
          message: "Error en el servidor.",
        });
      }
    }
  },
  getPublicationInfo: async (req, res) => {
    var id = req.body.id;
    try {
      var publication = await Publication.findOne({ _id: id });
      if (publication) {
        return res.status(200).send({
          status: "done",
          publication,
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        error: "error",
        message: "Error Server Request",
      });
    }
  },
  
  getPublicationsClass: async (req, res) => {
    var id = req.params.id;
    var limit = req.params.limit;
    try {
      var query = Publication.find({ classe: id });
      if (limit != undefined) {
        query.limit(limit);
      }
      var pubs = await query.exec();
      var assigntest = [];
      for (var it of pubs) {
        var test = Assignment.findOne({ publication: it._id });
        assigntest.push(test != undefined && test != null);
      }
      if (pubs) {
        return res.status(200).send({
          status: "done",
          publications: pubs,
          assignt: assigntest,
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status: "error",
        message: "Error Server Request",
      });
    }
  },
  likeThis: async (req, res) => {
    const id = req.body.id;
    try {
      var publication = await Publication.findOne({ _id: id });
      publication.likes.push(req.user._id);
      var stored = await publication.save();
      if (stored) {
        return res.status(200).send({
          status: "success",
          stored,
        });
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  dislikeThis: async (req, res) => {
    const id = req.body.id;
    try {
      var publication = await Publication.findOne({ _id: id });
      const elem = publication.likes.indexOf(req.user._id);
      if (elem > -1) {
        publication.likes.splice(elem, 1);
      }
      var stored = await publication.save();
      if (stored) {
        return res.status(200).send({
          status: "done",
        });
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status: "error",
        message: "Error Server Request",
      });
    }
  },
  isLiked: async (req, res) => {
    const id = req.params.id;
    try {
      var publication = await Publication.findOne({ _id: id });
      if (publication) {
        var like_state = publication.likes.indexOf(req.user._id) > -1;
        return res.status(200).send({
          status: "done",
          result: like_state,
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status: "error",
        message: "Error Server Request",
      });
    }
  },
  removePublication: async (req, res) => {
    var id = req.body.id;
    try {
      var publication = await Publication.findOne({ _id: id });
      if (publication) {
        await Publication.deleteOne({ _id: publication._id });
        await Comment.deleteMany({ publication: id });
        // test asignment
        var assign = Assignment.findOne({ publication: id });
        if (assign != undefined && assign != null) {
          await Assignment.deleteOne({ _id: assign._id });
          await StateAssignment.deleteMany({ assignment: assign._id });
        }
        return res.status(200).send({
          status: "done",
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  createComment: async (req, res) => {
    var id = req.body.id;
    var content = req.body.content;
    try {
      var full = !validator.isEmpty(content) && !validator.isEmpty(id);
    } catch (err) {
      return res.status(500).send({
        message: "missing data",
      });
    }
    if (full) {
      var comment = new Comment();
      comment.content = content;
      comment.publisher = req.user._id;
      comment.type_publisher = req.user.skil ? "student" : "teacher";
      comment.publication = id;
      try {
        var stored = await comment.save();
        if (!stored) {
          throw "Exception: not saved";
        } else {
          var publication = await Publication.findOne({ _id: id });
          publication.comments += 1;
          await publication.save();
          // enviar respuestas
          return res.status(200).send({
            status: "done",
            stored,
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(404).send({
          status: "error",
          message: "Error en el servidor.",
        });
      }
    }
  },
  getComments: async (req, res) => {
    var id = req.body.id;
    try {
      var comments = await Comment.find({ publication: id });
      var comments_id = [];
      for (var it of comments) {
        comments_id.push(it._id);
      }
      return res.status(200).send({
        status: "done",
        comments: comments_id,
      });
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
  getCommentInfo: async (req, res) => {
    var id = req.body.id;
    try {
      var comment = await Comment.findOne({ _id: id });
      if (comment) {
        return res.status(200).send({
          status: "done",
          comment,
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        status: "error",
        message: "Error Server Request",
      });
    }
  },
  removeComment: async (req, res) => {
    var id = req.body.id;
    try {
      var comment = await Comment.findOne({ _id: id });
      if (comment) {
        await Comment.deleteOne({ _id: comment._id });
        var publication = await Publication.findOne({
          _id: comment.publication,
        });
        publication.comments -= 1;
        await publication.save();
        return res.status(200).send({
          status: "done",
          comment,
        });
      } else {
        throw "Exception: not found";
      }
    } catch (err) {
      console.log("server error: " + err);
      return res.status(500).send({
        message: "error",
      });
    }
  },
};
