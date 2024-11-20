require("dotenv").config();
const { setupServer } = require("./server");
const app = setupServer();


PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Expressサーバー起動中：http://localhost:${PORT}`);
});