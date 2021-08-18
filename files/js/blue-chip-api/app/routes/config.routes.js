module.exports = app => {
  const configs = require("../controllers/config.controller.js");

  var router = require("express").Router();

  // Create a new Config
  router.post("/", configs.create);

  // Retrieve all Configs
  router.get("/", configs.findAll);

  // Retrieve all published Configs
  router.get("/published", configs.findAllPublished);

  // Retrieve a single Config with id
  router.get("/:id", configs.findOne);

  // Update a Config with id
  router.put("/:id", configs.update);

  // Delete a Config with id
  router.delete("/:id", configs.delete);

  // Delete all Configs
  router.delete("/", configs.deleteAll);

  app.use('/api/configs', router);
};
