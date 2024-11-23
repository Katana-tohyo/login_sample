require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const userController = require("./user/user.controller");
const userModel = require("./user/user.model");

function setupServer() {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:5173", //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    }),
  );

  // 認証機能 ====================================================
  // セッション設定 express-session
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 有効期限設定 1日
        secure: process.env.NODE_ENV === "production", // true->httpsのみを許可、localはhttpなので切り替え
        httpOnly: true, // javascriptからのアクセスを防ぐ
      },
    }),
  );
  // passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // LocalStrategy(ユーザー名・パスワードでの認証)の設定
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await userModel.find(username);

      if (!user) {
        // ユーザーが見つからない場合
        return done(null, false);
      }
      // ハッシュ化したPWの突き合わせ。入力されたpasswordから、DBに保存されたハッシュ値を比較する
      const match = await bcrypt.compare(password, user.hashed_password);
      if (match) {
        return done(null, user.username); // ログイン成功
      } else {
        return done(null, false); // ログイン失敗
      }
    }),
  );

  // 認証に成功した時にsessionにusernameを保存するための記述
  passport.serializeUser((user, done) => done(null, user.username));
  // sessionからusernameを取り出して検証するための記述
  passport.deserializeUser(async (username, done) => {
    const user = await userModel.find(username);
    done(null, user);
  });

  // ユーザー一覧取得エンドポイント
  // app.get("/users", (req, res) => {
  //   // sessionから情報を取得して認証
  //   if (req.isAuthenticated()) {
  //     res.json(userDB);
  //   } else {
  //     res.status(401).json({ message: "ログインが必要です！" });
  //   }
  // });

  // ログインエンドポイント
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "usernameとpasswordが必要です",
      });
    }

    // 最初に設定したLocalStrategy(ユーザー名とパスワードでの認証)を使ってログイン
    passport.authenticate("local", (err, username) => {
      if (!username) return res.status(401).json({ message: "ログイン失敗！" });

      // sessionにログイン情報を格納
      req.logIn(username, () => {
        return res.json({ message: `ログイン成功！ Hello, ${username}` });
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
