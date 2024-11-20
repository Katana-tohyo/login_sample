const db = require('../knex');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const USER_LIST_TABLE = 'user_table';

function checkPassWord(username, password) {}

module.exports = {
  USER_LIST_TABLE,

  async all() {
    return await db(USER_LIST_TABLE);
  },

  async find(username) {
    const [foundUser] = await db(USER_LIST_TABLE).where({ username });
    return foundUser || {};
  },

  async signup(username, password) {
    const [newUsername] = await db(USER_LIST_TABLE)
      .insert({
        username,
        salt:"temp1", // 🤡🤡🤡🤡🤡🤡 bcrypt ではsalt列は不要なため、後で削除する
        hashed_password: bcrypt.hashSync(password, 10),
        session_id:"temp1" //  🤡🤡🤡🤡🤡🤡 変更の必要あり
      })
      .returning('username');
    return newUsername;
  },

  async login(username, password) {
    const userData = this.find(username);
    if (!userData.id) {
      return false;
    } else {
      // パスワードのハッシュ化
      const { hashedPassword } = createHash(userData.salt, password);
      // パスワードチェック
      return userData.hashedPassword === hashedPassword;
    }
  },
};
