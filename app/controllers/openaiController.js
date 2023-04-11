//const db = require("../models");
//const Tutorial = db.tutorials;
//const Op = db.Sequelize.Op;

// generate story with text en picture
exports.newStory = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //use openAI -> text / picture
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
