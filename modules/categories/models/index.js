const knex = require("../../../knex");

module.exports = {
  getAllCategories: async (req, res) => {
    await knex
      .select()
      .table("categories")
      .then((data) => {
        res.send({
          data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "error fetch",
        });
      });
  },
  getCategoriedById: async (req, res) => {
    await knex
      .select()
      .table("categories")
      .where("id", req.params.id)
      .then((data) => {
        res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "error fetch",
        });
      });
  },
  createCategories: async (req, res) => {
    await knex
      .table("categories")
      .insert({
        name: req.body.name,
      })
      .then((data) => {
        res.status(201).json({
          code: 201,
          message: "insert data success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "error insert data",
        });
      });
  },
  updateCategories: async (req, res) => {
    await knex
      .table("categories")
      .where("id", req.params.id)
      .update({
        name: req.body.name,
      })
      .then((data) => {
        res.json({
          code: 200,
          message: "updated data success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "error updated data",
        });
      });
  },
  deleteCategories: async (req, res) => {
    await knex
      .table("categories")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        res.json({
          code: 200,
          message: "deleted data success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "error updated data",
        });
      });
  },
};
