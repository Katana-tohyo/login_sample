/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table="vote_title"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    {title: 'title1', added_user_id: 1,is_closed:true,updated:'2024-11-01 01:01:01'},
    {title: 'title2', added_user_id: 1,is_closed:false,updated:'2024-11-02 02:02:02'},
    {title: 'title3', added_user_id: 2,is_closed:false,updated:'2024-11-03 03:03:03'},
  ]);
};
