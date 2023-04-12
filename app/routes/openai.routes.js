module.exports = (app) => {
  const openai = require("../controllers/openaiController");

  var router = require("express").Router();
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new story
  router.post("/new", openai.newStory);

  // Create a new story
  router.post("/continue", openai.continueStory);

  // Create a new story
  router.post("/remake", openai.remakeLastParagraph);

  //router.get("/listAll", openai.listAllStory); //title + id

  //router.get("/:id", openai.ListStoryById); //objet: story

  app.use("/api/story", router);
};
