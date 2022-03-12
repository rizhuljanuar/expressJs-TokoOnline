"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    { name: "javascript" },
    { name: "golang" },
    { name: "phython" },
    { name: "php" },
    { name: "c#" },
  ]);
};
