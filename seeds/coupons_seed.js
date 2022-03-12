"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("coupons").del();
  await knex("coupons").insert([
    { code: "AKHIRTAHUN", description: "lorem" },
    { code: "AKHIRBULAN", description: "lorem" },
    { code: "RAMADHAN", description: "lorem" },
  ]);
};
