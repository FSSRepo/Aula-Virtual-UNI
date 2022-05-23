// express setup
var express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers setup
const student = require('../controllers/student');
const teacher = require('../controllers/teacher');
const classes = require('../controllers/classes');
const main = require('../controllers/main');
const assignments = require('../controllers/assignments');
const publications = require('../controllers/publications');
const helper = require('./helper');

// subida de archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/'});

// internal api
router.post('/upload-image',md_upload,main.upload); // OK!
router.get('/get-photo/:image',main.getPhoto); // OK!
router.get('/logout',(req,res)=>{
    req.logout();
    res.status(200).send({
        status:'done'
    });
});

// estudiantes
router.post('/student/create',student.createStudent); //OK!
router.post('/student/login',function(req, res, next) {
    /* look at the 2nd parameter to the below call */
    passport.authenticate('login-student', function(err, user, info) {
      if (err) { console.log(err); return next(err); }
      if (!user) { return res.status(401).send({ info }); }
      req.logIn(user, function(err) {
        if (err) { console.log(err); return next(err); }
        return res.status(200).send({
            status:'done'
        });
      });
    })(req, res, next);
  }); // OK!
router.get('/student/get-homeworks',helper.isAuthenticatedS,student.getAssignments); // OK!
router.get('/student/get-classes',helper.isAuthenticatedS,student.getClasses); // OK!
router.put('/student/add-class',helper.isAuthenticatedS,student.addClass); // OK!
router.get('/student/profile',helper.isAuthenticatedS,student.getProfile); // OK!

// profesores
router.post('/teacher/create',teacher.createTeacher); // OK!
router.post('/teacher/login',function(req, res, next) {
    passport.authenticate('login-teacher', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(401).send({ info }); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).send({
            status:'done'
        });
      });
    })(req, res, next);
  }); // OK!

router.get('/teacher/profile',helper.isAuthenticatedT,teacher.getProfile); // OK!
router.get('/teacher/classes',helper.isAuthenticatedT,teacher.getClasses); // OK!

// clases
router.post('/class/create',helper.isAuthenticatedT,classes.createClass); // OK!
router.get('/class/info/:id',helper.isAuthenticatedAll,classes.getClassInfo); // OK!
router.get('/class/students',helper.isAuthenticatedT,classes.getClassStudents); // OK!
router.get('/class/bygroup',helper.isAuthenticatedT,classes.getClassesByGroup); // OK!

// publicaciones
router.post('/publication/create',helper.isAuthenticatedAll,publications.createPublication); // OK!
router.get('/publication/info',helper.isAuthenticatedAll,publications.getPublicationInfo); // OK!
router.get('/publication/byclass/:id/:limit',helper.isAuthenticatedAll,publications.getPublicationsClass); // OK!
router.get('/publication/byclass/:id',helper.isAuthenticatedAll,publications.getPublicationsClass); // OK!
router.put('/publication/like',helper.isAuthenticatedS,publications.likeThis); // OK!
router.put('/publication/dislike',helper.isAuthenticatedS,publications.dislikeThis); // OK!
router.get('/publication/is-like/:id',helper.isAuthenticatedS,publications.isLiked); // OK!
router.delete('/publication/remove',helper.isAuthenticatedAll,publications.removePublication); // OK!

// comentarios
router.post('/comment/create',publications.createComment); // OK!
router.get('/comment/all',publications.getComments); // OK!
router.get('/comment/info',publications.getCommentInfo); // OK!
router.delete('/comment/remove',publications.removeComment); // OK!

// asignaciones
router.post('/assignment/create',helper.isAuthenticatedT,assignments.createAssignment); // OK!
router.get('/assignment/info',helper.isAuthenticatedAll,assignments.getAssignmentInfo); // OK!
router.get('/assignment/public',helper.isAuthenticatedAll,assignments.isAssignmentPublication); // OK!
router.post('/assignment/launch',helper.isAuthenticatedT,assignments.assignToStudents); // OK!
router.put('/assignment/delivery',assignments.deliveryAssignment); // OK!
router.get('/assignment/isDelivered',helper.isAuthenticatedS,assignments.isDeliveredAssigment); //OK!
router.delete('/assignment/remove',helper.isAuthenticatedT,assignments.removeAssignment); // OK!

module.exports = router;