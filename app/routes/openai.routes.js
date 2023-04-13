const openAiController = require("../controllers/openai.controller");
const storyController = require("../controllers/story.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  var router = require("express").Router();
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new story
  router.post("/new", [authJwt.verifyToken], openAiController.newStory);

  //router.post("/new" , openAiController.newStory);
  
  // Create a new story
  router.post("/continue", [authJwt.verifyToken], openAiController.continueStory);

  // Create a new story
  router.post("/remake", [authJwt.verifyToken], openAiController.remakeLastParagraph);

  //router.patch("/remake" , openAiController.newStory);

  router.get("/all", [authJwt.verifyToken], storyController.getAllUserStories);

  router.get("/:storyId", [authJwt.verifyToken], storyController.getChaptersWithStoryId); //objet: story

  app.use("/api/story", router);
};
