/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table="user_table"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    { username: 'dummy1',salt:'salt1',hashed_password:'hashed_password1',session_id:'session_id1'},
    { username: 'dummy2',salt:'salt2',hashed_password:'hashed_password2',session_id:'session_id2'},
    { username: 'dummy3',salt:'salt3',hashed_password:'hashed_password3',session_id:'session_id3'},
  ]);
};
