/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="user_table"
exports.up = async function(knex) {
    await knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("salt");
        table.string("hashed_password").notNullable();
        table.string("session_id").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(table);
};
