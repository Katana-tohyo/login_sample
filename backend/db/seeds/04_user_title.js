/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table="user_title"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    {user_id: 1, vote_title_id: 1,answer:1},
    {user_id: 2, vote_title_id: 1,answer:1},
    {user_id: 3, vote_title_id: 1,answer:2},
    {user_id: 1, vote_title_id: 2,answer:2},
    {user_id: 2, vote_title_id: 2,answer:2},
    {user_id: 3, vote_title_id: 2,answer:2},
  ]);
};
