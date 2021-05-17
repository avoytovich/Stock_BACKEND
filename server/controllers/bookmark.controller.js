const { Bookmark } = require('./../models');

module.exports = {
    create(req, res) {
        const dataCreate = Object.assign({}, req.body, {UserId: req.decoded.id})
        Bookmark.create(dataCreate)
            .then(bookmark => res.status(200).json({message: 'Bookmark was created!'}))
            .catch(error => res.status(404).send(error));
    }
};
