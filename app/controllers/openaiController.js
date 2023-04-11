//const db = require("../models");
//const Tutorial = db.tutorials;
//const Op = db.Sequelize.Op;
const axios = require("axios");

// generate story with text en picture
exports.newStory = (req, res) => {
  if (!req.body.test) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //use openAI -> text / picture

  generateText(function (response) {
    res.status(200).send(response);
  });

  generatePicture(function (response) {
    res.status(200).send(response);
  });
};

// generate story with text en picture
exports.continueStory = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //continue a story
};

// generate story with text en picture
exports.remakeLastParagraph = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //remake the last paragraph
};

let url = ``;

function generateText(callback) {
  axios
    .post(url, {
      request_token: token,
    })
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function generatePicture(callback) {
  axios
    .get(url, {})
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
