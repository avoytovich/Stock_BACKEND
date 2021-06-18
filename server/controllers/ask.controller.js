const cloudinary = require("cloudinary");

const { Ask } = require("./../models");
const { ask: messages } = require("./../helper/messages");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  create(req, res) {
    const data = Object.assign({}, req.body, {
      status: "in_progress",
      isActive: false,
      UserId: req.params.userId,
    });
    Ask.create(data)
      .then((ask) => res.status(200).json({ message: messages.created }))
      .catch((error) => res.status(404).send(error));
  },
  upload(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function (error, result) {
      if (result) {
        const { url } = result;
        res.status(200).json({ message: messages.uploaded, url });
      }
      if (error) {
        res.status(400).json({ error });
      }
    });
  },
};
