const db = require("../models");
const User = db.user;
const Story = db.story;
const Chapter = db.chapter;

exports.getAllUserStories = (req, res) => {
  User.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then((user) => {
      getStories(user.userId).then((stories) => {
        res.status(200).json({
          stories: stories,
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
          story: chapter,
        });
      });
    })
    .catch(() => {
      res.status(500).send("Error: can't find story");
    });
};


async function getStories(userId) {
  let jsonList = [];
  await Story.findAll({
    attributes: ["storyId", "title"],
    where: {
      userId: userId,
    },
  })
    .then(async (stories) => {
      for (const story of stories) {
        const chapitre = await Chapter.findOne({
          attributes: ["paragraph", "image"],
          where: {
            storyId: story.storyId,
          },
        })
        jsonList.push({ "id": story.storyId, 'title': story.title, "firstParagraph": chapitre.paragraph, "cover": chapitre.image })
      }
    })
    .catch(() => {
      console.log("Error: can't find story");
    });

  return jsonList;
}

