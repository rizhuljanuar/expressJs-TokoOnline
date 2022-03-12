"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      title: "ini title",
      description: "ini desc",
      image: "https://placeimg.com/480/480/tech",
      price: 250000,
    },
    {
      title: "ini title 2",
      description: "ini desc",
      image: "https://placeimg.com/480/480/tech",
      price: 250000,
    },
    {
      title: "ini title 3",
      description: "ini desc",
      image: "https://placeimg.com/480/480/tech",
      price: 250000,
    },
  ]);
};
