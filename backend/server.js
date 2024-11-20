const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const userController = require("./user/user.controller");
const userModel = require("./user/user.model");

// const url =
//   process.env.NODE_ENV === undefined
//     ? 'http://localhost:5173'
//     : 'https://my-typing-dojo.onrender.com/';

// 🚨 DBに格納するユーザーデータ
const userDB = [
  { username: "test", salt: 10, password: bcrypt.hashSync("password", 10) },
];

function setupServer() {
  const app = express();
  app.use(express.json());

  // アプリ起動時の参照先
  // app.use(express.static(__dirname + '/public'));

  app.use(
    cors({
      origin: "http://localhost:5173", //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    }),
  );

  // 認証機能 ====================================================
  // セッション設定 express-session
  app.use(session({ secret: "secretKey" }));
  // passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // LocalStrategy(ユーザー名・パスワードでの認証)の設定
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("🚀🚀🚀🚀 username--->> ", username);
      const user = userModel.find(username);
      // const user = userDB.find((user) => user.username === username);

      if (!user) {
        // ユーザーが見つからない場合
        return done(null, false);
      }
      // ハッシュ化したPWの突き合わせ。入力されたpasswordから、DBに保存されたハッシュ値を比較する
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user); // ログイン成功
      } else {
        return done(null, false); // ログイン失敗
      }
    }),
  );

  // 認証に成功した時にsessionにusernameを保存するための記述
  passport.serializeUser((user, done) => done(null, user.username));
  // sessionからusernameを取り出して検証するための記述
  passport.deserializeUser((username, done) => {
    const user = userDB.find((user) => user.username === username);
    done(null, user);
  });

  // ユーザー一覧取得エンドポイント
  app.get("/users", (req, res) => {
    // sessionから情報を取得して認証
    if (req.isAuthenticated()) {
      res.json(userDB);
    } else {
      res.status(401).json({ message: "ログインが必要です！" });
    }
  });

  // ログインエンドポイント
  // 🚨🚨🚨 作業中 🚨🚨🚨 ===========================================
  app.post("/login", (req, res) => {
    const { username, password } = req.body.text;
    if (!username || !password) {
      return res.status(400).json({
        message: "usernameとpasswordが必要です",
      });
    }

    // 最初に設定したLocalStrategy(ユーザー名とパスワードでの認証)を使ってログイン
    passport.authenticate("local", (err, user) => {
      if (!user) return res.status(401).json({ message: "ログイン失敗！" });

      // sessionにログイン情報を格納
      req.logIn(user, () => {
        return res.json({ message: `ログイン成功！ Hello, ${user.username}` });
      });
    })(req, res);
  });

  // サインアップ
  app.post("/signup", userController.save);

  // ログアウトエンドポイント
  app.get("/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "ログアウト成功" });
    });
  });

  // ===========================================================

  app.get("/api/users/:name", userController.index);
  app.get("/api/users", userController.view);

  return app;
}

module.exports = {
  setupServer,
};
