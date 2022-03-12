"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      name: "Rizhul Januar",
      email: "rayjam66@gmail.com",
      password: "password",
      phone: "6289639901977",
    },
  ]);
};
