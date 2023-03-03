import * as dotenv from "dotenv";
import expressWs from "express-ws";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./route/index.js";
import { WsController } from "./controllers/websocket-controller.js";
import { SocketService } from "./services/socket-service.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const wsInstance = expressWs(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL2,
      process.env.DEPLOY_URL,
    ],
    exposedHeaders: ["with-friend"],
  })
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const wsController = new WsController(new SocketService(wsInstance));

app.ws("/game", wsController.webSocketHandler.bind(wsController));

const init = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => console.log(PORT));
  } catch (error) {
    console.log(error);
  }
};

init();
