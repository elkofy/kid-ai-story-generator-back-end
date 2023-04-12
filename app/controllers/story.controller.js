const db = require("../models");
const User = db.user;
const Story = db.story;

exports.getAllUserStories = (req, res) => {
  User.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then((user) => {
      user.getStories().then((story) => {
        res.status(200).json({
          stories: story,
        });
      });
    })
    .catch(() => {
      res.status(500).send("Error: can't find story");
    });
};

exports.getChaptersWithStoryId = (req, res) => {
  Story.findOne({
    where: {
      storyId: req.params.storyId,
    },
  })
    .then((story) => {
      story.getChapters().then((chapter) => {
        res.status(200).json({
          chapters: chapter,
        });
      });
    })
    .catch(() => {
      res.status(500).send("Error: can't find story");
    });
};
