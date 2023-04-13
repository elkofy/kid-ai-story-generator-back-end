const db = require("../models");
const User = db.user;
const Story = db.story;
const Chapter = db.chapter;

exports.getAllUserStories = (req, res) => {
  getstories(req.userId).then((jsonList) => {
    console.log("TEST=====")
    console.log(jsonList)
    res.status(200).json({ stories: jsonList });
  })
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

async function getstories(userId) {
  let jsonList = [];
  await User.findOne({
    where: {
      userId: userId,
    },
  })
    .then(async (user) => {
      return await user.getStories().then(async (stories) => {
        let test = []
        const array = stories.map(async (s) => {
          const onechap = await Chapter.findOne({
            where: {
              storyId: s.storyId
            }
          });
          let tempObj = {
            storyId: onechap.storyId,
            chapterOne: {
              paragraph: onechap.paragraph,
              image: onechap.image
            }
          }
          return tempObj;

        })

        console.log(array)
        return array
      })
    })
    .catch((err) => {
      // res.status(500).send("Error: can't find story");
      console.log(err)
    });
}


/*async function getstories(userId) {
  let resultList = [];
  let user;
  User.findOne({
    where: {
      userId: userId,
    },
  }).then((user) => {
    const user = u; 
  })

}*/
