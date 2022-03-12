"use strict";

const { verifyJwt } = require("../utils");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    verifyJwt(token);
    next();
  } catch (error) {
    res.send({
      message: "Token not valid",
    });
  }
};
