"use strict";

const express = require("express");
const app = express();
const port = 3000;
const knex = require("./knex");
const cors = require("cors");
const { hashPassword, comparePassword, generateJwt } = require("./utils");
const authMiddleware = require("./middleware/auth");
const {
  getAllCategories,
  getCategoriedById,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("./modules/categories/models");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    version: "0.0.1",
    author: "rizhuljanuar",
  });
});

//region auth
app.post("/register", async (req, res) => {
  await knex
    .table("users")
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
    })
    .then(() => {
      res.send({
        data: [],
        message: "register data success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "register data error",
      });
    });
});

app.post("/login", async (req, res) => {
  await knex
    .select()
    .where("email", req.body.email)
    .table("users")
    .then((data) => {
      if (comparePassword(req.body.password, data[0].password)) {
        res.send({
          accessToken: generateJwt({ id: data[0].id }),
        });
      } else {
        res.status(400).send({
          message: "data tidak ditemukan",
        });
      }
    });
});

app.use(authMiddleware);

app.get("/products", async (req, res) => {
  await knex
    .select()
    .table("products")
    .then((data) => {
      res.send({
        data,
      });
    });
});

app.get("/products/:id", async (req, res) => {
  await knex
    .select()
    .table("products")
    .where("id", req.params.id)
    .then((data) => {
      res.send(data[0]);
    });
});

app.post("/products", async (req, res) => {
  await knex
    .table("products")
    .insert({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
    })
    .then((data) => {
      res.send({
        data: [],
        message: "success",
      });
    });
});

app.put("/products/:id", async (req, res) => {
  await knex
    .table("products")
    .where("id", req.params.id)
    .update({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
    })
    .then((data) => {
      res.send({
        data: [],
        message: "update data success",
      });
    });
});

app.delete("/products/:id", async (req, res) => {
  await knex
    .table("products")
    .where("id", req.params.id)
    .del()
    .then((data) => {
      res.send({
        data: [],
        message: "delete data success",
      });
    });
});

// Region Users
app.get("/users", async (req, res) => {
  await knex
    .select()
    .table("users")
    .then((data) => {
      res.send({
        data,
      });
    });
});

app.get("/users/:id", async (req, res) => {
  await knex
    .select()
    .table("users")
    .where("id", req.params.id)
    .then((data) => {
      res.send({
        data: data[0],
      });
    });
});

app.post("/users", async (req, res) => {
  await knex
    .table("users")
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
    })
    .then((data) => {
      res.status(201).send({
        code: 201,
        message: "insert data success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: "insert data error",
      });
    });
});

app.put("/users/:id", async (req, res) => {
  await knex
    .table("users")
    .where("id", req.params.id)
    .update({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
    })
    .then((data) => {
      res.send({
        code: 200,
        message: "updated data success",
      });
    })
    .then((err) => {
      res.status(500).json({
        code: 500,
        message: "updated data error",
      });
    });
});

app.delete("/users/:id", async (req, res) => {
  await knex
    .table("users")
    .where("id", req.params.id)
    .del()
    .then((data) => {
      res.send({
        code: 200,
        message: "deleted data success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: "deleted data error",
      });
    });
});

//categories
app.get("/categories", getAllCategories);

app.get("/categories/:id", getCategoriedById);

app.post("/categories", createCategories);

app.put("/categories/:id", updateCategories);

app.delete("/categories/:id", deleteCategories);

// Coupons
app.get("/coupons", async (req, res) => {
  await knex
    .select()
    .table("coupons")
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) => {
      res.json({
        code: 500,
        message: "fetch data error",
      });
    });
});

app.get("/coupons/:id", async (req, res) => {
  await knex
    .select()
    .table("coupons")
    .where("id", req.params.id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: "fetch data error",
      });
    });
});

app.post("/coupons", async (req, res) => {
  await knex
    .table("coupons")
    .insert({
      code: req.body.code,
      description: req.body.description,
    })
    .then((data) => {
      res.status(201).json({
        code: 201,
        description: "insert data success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: "insert data error",
      });
    });
});

app.put("/coupons/:id", async (req, res) => {
  await knex
    .table("coupons")
    .where("id", req.params.id)
    .update({
      code: req.body.code,
      description: req.body.description,
    })
    .then((data) => {
      res.json({
        code: 200,
        description: "updated data success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: "updated data error",
      });
    });
});

app.delete("/coupons/:id", async (req, res) => {
  await knex
    .table("coupons")
    .where("id", req.params.id)
    .del()
    .then((data) => {
      res.json({
        code: 200,
        description: "deleted data success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        description: "deleted data error",
      });
    });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
