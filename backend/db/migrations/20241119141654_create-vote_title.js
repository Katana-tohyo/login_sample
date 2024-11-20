/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="vote_title"
exports.up = async function(knex) {
    await knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.integer("added_user_id")
            .references("user_table.id")
            .onDelete("CASCADE")
            .notNullable();
        table.boolean("is_closed").notNullable();
        table.timestamp("updated").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(table);
};
