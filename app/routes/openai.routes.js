module.exports = app => {
    const openai = require("../controllers/openaiController");
  
    var router = require("express").Router();
  
    // Create a new story
    router.post("/new", openai.newStory);
  
    // Create a new story
    router.post("/continue", openai.continueStory);

    // Create a new story
    router.post("/remake", openai.remakeLastParagraph);

    //router.get("/listAll", openai.listAllStory);//title + id

    //router.get("/:id", openai.ListStoryById);//objet: story

    //a voire si un fait une route pour generer et une route pour envoyer la story
  
    app.use('/api/story', router);
  };