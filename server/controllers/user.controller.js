const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const secret = require('../config/jwt.secretkey');
const constants = require('./../helper/constants');
const { User } = require('./../models');
const { user: messages } = require('./../helper/messages');

module.exports = {

  signup(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }})
        .then(user => {
          user && passwordHash.verify(req.body.password, user.password) &&
          res.status(400).json({message: messages.alreadyExist}) ||
            User.create({
              role: req.body.role,
              username: req.body.username,
              email: req.body.email,
              password: passwordHash.generate(req.body.password),
              isActivate: false
            })
              .then(user => {
                res.status(200)
                .json({message: messages.soonActivate});
              });
        })
          .catch(error => res.status(404).send(error));
  },

  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      user && passwordHash.verify(req.body.password, user.password) && user.isActivated &&
        res.status(200).json({
          message: messages.successfulLogin,
          token: jwt.sign({id: user.id}, secret.key, {expiresIn: constants.TIME_TOKEN})
        }) ||
      user && user.isActivated &&
        res.status(400).json({message: messages.notValidPassword}) ||
          user && !user.isActivated &&
            res.status(400).json({message: messages.notActivated}) ||
              !user && res.status(400).json({message: messages.notExist});
    }).catch(error => res.status(401).send(error));
  },

  activation(req, res) {
    User.findById(req.body.id)
      .then((user) => {
        user.update({
          isActivated: true,
        });
        res.status(200).json({ message: messages.activated });
      })
      .catch((error) => res.status(400).send(error));
  },

  deactivation(req, res) {
    User.findById(req.body.id)
      .then((user) => {
        user.update({
          isActivated: false,
        });
        res.status(200).json({ message: messages.deactivated });
      })
      .catch((error) => res.status(400).send(error));
  },

};
