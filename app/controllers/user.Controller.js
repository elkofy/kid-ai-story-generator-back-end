const db = require("../models");
const User = db.user;

exports.test = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.GetCurrentUser = (req, res) => {
  //res.send(req.params)
  User.findOne({
    where:{
      userId: req.userId
    }
  }).then((user) => {
    res.status(200).json({
      username: user.username,
      userId: user.userId
    });
  }).catch(() => {
    res.status(500).send("Error: can't find current user")
  });
};
