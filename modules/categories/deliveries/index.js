const auth = require("../../../middleware/auth");

module.exports = (app, usescase) => {
  const getAllCategories = async (_, res) => {
    try {
      const data = await usescase.getAllCategories();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const getCategoriedById = async (req, res) => {
    try {
      const data = await usescase.getCategoriedById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const createCategories = async (req, res) => {
    try {
      const body = {
        name: req.body.name,
      };

      await usescase.createCategories(body);
      res.status(201).json({
        code: 201,
        message: "Insert data success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const updateCategories = async (req, res) => {
    try {
      const body = {
        name: req.body.name,
      };

      await usescase.updateCategories(req.params.id, body);
      res.status(200).json({
        code: 200,
        message: "Update data success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const deleteCategories = async (req, res) => {
    try {
      await usescase.deleteCategories(req.params.id);
      res.status(200).json({
        code: 200,
        message: "Delete data success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  app.use(auth);
  app.get("/categories", getAllCategories);
  app.get("/categories/:id", getCategoriedById);
  app.post("/categories", createCategories);
  app.put("/categories/:id", updateCategories);
  app.delete("/categories/:id", deleteCategories);
};
