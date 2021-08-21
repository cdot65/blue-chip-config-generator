module.exports = app => {
  const designs = require("../controllers/design.controller.js");

  var router = require("express").Router();

  // Create a new Design
  router.post("/", designs.create);

  // Retrieve all Designs
  router.get("/", designs.findAll);

  // Retrieve all published Designs
  router.get("/published", designs.findAllPublished);

  // Retrieve a single Design with id
  router.get("/:id", designs.findOne);

  // Update a Design with id
  router.put("/:id", designs.update);

  // Delete a Design with id
  router.delete("/:id", designs.delete);

  // Delete all Designs
  router.delete("/", designs.deleteAll);

  app.use('/api/designs', router);
};
