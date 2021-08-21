const db = require("../models");
const Design = db.designs;

// Create and Save a new Design
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Pull data from request body and assign values
  const design = new Design({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    slug: req.body.slug,
    order: req.body.order,
    avatar: req.body.avatar,
    published: req.body.published ? req.body.published : false
  });

  // Save Design in the database
  design
    .save(design)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Design."
      });
    });
};

// Retrieve all Designs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Design.find(condition)
    .then(data => {
      res.send(data.sort((a,b) => a.order - b.order));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving designs."
      });
    });
};

// Find a single Design with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Design.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Design with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Design with id=" + id });
    });
};

// Update a Design by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Design.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Design with id=${id}. Maybe Design was not found!`
        });
      } else res.send({ message: "Design was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Design with id=" + id
      });
    });
};

// Delete a Design with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Design.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Design with id=${id}. Maybe Design was not found!`
        });
      } else {
        res.send({
          message: "Design was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Design with id=" + id
      });
    });
};

// Delete all Designs from the database.
exports.deleteAll = (req, res) => {
  Design.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Designs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all designs."
      });
    });
};

// Find all published Designs
exports.findAllPublished = (req, res) => {
  Design.find({ published: true })
    .then(data => {
      res.send(data.sort((a,b) => a.order - b.order));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving designs."
      });
    });
};
