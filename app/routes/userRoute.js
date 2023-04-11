module.exports = app => {
    const user = require("../controllers/userController");

    var router = require("express").Router();
  
    // Create a new story
    router.post("/login", user.login);
  
    // Create a new story
    router.post("/register", user.register);

    app.use('/api/users', router);
}