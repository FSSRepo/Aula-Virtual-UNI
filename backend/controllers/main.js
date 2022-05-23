"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
  upload: (req, res) => {
    if (!req.files) {
      // debe haber un archivo
      return res.status(404).send({
        status: "error",
        message: "No se detecto una entrada de archivos",
      });
    }
    // consequir nombre
    var file_path = req.files.file.path;
    var file_split = file_path.split("\\");
    var file_name = file_split[1];
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];
    // comprobar extension
    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "JPG" &&
      file_ext != "PNG"
    ) {
      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: "error",
          message: "La extension no es valida",
        });
      });
    } else {
      // buscar articulo asignar nombre de imagen y actualizar
      return res.status(200).send({
        status: "success",
        image: file_name,
      });
    }
  },
  getPhoto: (req, res) => {
    var image = req.params.image;
    var file_path = "./uploads/" + image;
    fs.exists(file_path, (exist) => {
      if (exist) {
        return res.sendFile(path.resolve(file_path));
      } else {
        return res.status(404).send({
          status: "error",
          message: "No existe",
        });
      }
    });
  }
};
