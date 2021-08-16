const db = require("../models");
const Config = db.configs;

// Create and Save a new Config
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Config
  const config = new Config({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Config in the database
  config
    .save(config)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Config."
      });
    });
};

// Retrieve all Configs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Config.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving configs."
      });
    });
};

// Find a single Config with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Config.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Config with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Config with id=" + id });
    });
};

// Update a Config by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Config.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Config with id=${id}. Maybe Config was not found!`
        });
      } else res.send({ message: "Config was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Config with id=" + id
      });
    });
};

// Delete a Config with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Config.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Config with id=${id}. Maybe Config was not found!`
        });
      } else {
        res.send({
          message: "Config was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Config with id=" + id
      });
    });
};

// Delete all Configs from the database.
exports.deleteAll = (req, res) => {
  Config.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Configs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all configs."
      });
    });
};

// Find all published Configs
exports.findAllPublished = (req, res) => {
  Config.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving configs."
      });
    });
};
