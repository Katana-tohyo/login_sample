/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="options"
exports.up = async function(knex) {
    await knex.schema.createTable(table, (table) => {
        table.integer("vote_title_id")
            .references("vote_title.id")
            .onDelete("CASCADE")
            .notNullable();
        table.integer("option_number" ).notNullable();
        table.string("question").notNullable();
        table.integer("user_id")
            .references("user_table.id")
            .onDelete("CASCADE")
            .notNullable();
        table.timestamp( "updated" ).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(table);
};
