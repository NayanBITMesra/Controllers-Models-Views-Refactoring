const fs = require("fs");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const {connectMongoDB} = require("./connection");
const {logReqRes} = require("./middlewares/index");


connectMongoDB('mongodb://127.0.0.1:27017/project-app');
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));
app.use("/api/user", userRouter);
app.listen(8000, () => console.log(`Server started at port: ${PORT}`));