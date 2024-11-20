/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table="options"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    {vote_title_id: 1, option_number: 1,question:'question1-1',user_id:1,updated:'2024-11-01 01:01:01'},
    {vote_title_id: 1, option_number:2,question:'question1-2',user_id:1,updated:'2024-11-02 02:02:02'},
    {vote_title_id: 1, option_number:3,question:'question1-3',user_id:2,updated:'2024-11-03 03:03:03'},
    {vote_title_id: 2, option_number:1,question:'question2-1',user_id:2,updated:'2024-11-04 04:04:04'},
    {vote_title_id: 2, option_number:2,question:'question2-2',user_id:3,updated:'2024-11-05 05:05:05'},
  ]);
};
