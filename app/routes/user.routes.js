const { authJwt } = require("../middleware");
const controller = require("../controllers/user.Controller");

module.exports = (app) => {
  var router = require("express").Router();
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/", controller.test);

  router.get("/current", [authJwt.verifyToken], controller.GetCurrentUser);

  app.use("/api/users", router);
};
