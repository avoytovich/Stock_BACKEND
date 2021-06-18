var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const { userController, askController } = require("./../controllers");

module.exports = (app) => {
  app.get("/test", (req, res) =>
    res.status(200).send({
      message: "Welcome",
    })
  );

  app.post("/login", userController.login);
  app.post("/user/:userId/user_activate", userController.activation);
  app.post("/user/:userId/user_deactivate", userController.deactivation);

  app.post("/user/:userId/ask_create", askController.create);
  app.post("/user/:userId/ask_create/upload", upload.single("single"), askController.upload);
};
