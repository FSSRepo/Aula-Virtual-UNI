const passport = require("passport");
const Student = require("./../models/student");
const Teacher = require("./../models/teacher");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  "login-student",
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        var student = await Student.findOne({ n_carnet: username });
        if (student) {
          var check = true;
          if (check) {
            delete student.password;
            return done(null, student);
          } else {
            return done(null, false, { message: "pwd_inv" });
          }
        } else {
          return done(null, false, { message: "un_inv" });
        }
      } catch (err) {
        console.log("server error: " + err);
        return done(err);
      }
    }
  )
);
passport.use(
  "login-teacher",
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        var teacher = await Teacher.findOne({ cedula: username });
        if (teacher) {
          var check = true;
          if (check) {
            delete teacher.password;
            return done(null, teacher);
          } else {
            return done(null, false, { message: "pwd_inv" });
          }
        } else {
          return done(null, false, { message: "un_inv" });
        }
      } catch (err) {
        console.log("Server Error: " + err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Almacenar sesion
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // Almacenar sesion
  try {
    const usr = await Student.findOne({_id:id},{password: 0});
    if (usr) {
      done(null, usr);
    } else {
      const tch = await Teacher.findOne({_id:id},{password: 0});
      if (tch) {
        done(null, tch);
      }
    }
  } catch (err) {
    console.log("Server Error: " + err);
    done(err);
  }
});
