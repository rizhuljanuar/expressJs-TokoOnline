"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("products", function (table) {
    table.increments("id");
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.string("image", 255).notNullable();
    table.decimal("price").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("products");
};
