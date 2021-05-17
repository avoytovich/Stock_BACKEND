const { userController, loginController, bookmarkController } = require('./../controllers');

module.exports =
  (app) => {
    app.get('/test', (req, res) => res.status(200).send({
      message: 'Welcome'
    }));

    app.post('/login', loginController.login);
    app.get('/activation/:token', loginController.activation);

    app.post('/user', userController.create);

    app.post('/bookmark', bookmarkController.create);
  };
