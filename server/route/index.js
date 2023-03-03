import { Router } from "express";
import expressWs from "express-ws";
import { body } from "express-validator";
import { userController } from "../controllers/user-controller.js";
import { gameController } from "../controllers/game-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = new Router();
export const wsRouter = expressWs(router);

router.post(
  "/login",
  body("name").isLength({ min: 3 }),
  userController.logIn.bind(userController)
);
router.delete("/logout", userController.logOut);
router.get("/refresh", userController.refreshToken.bind(userController));
router.get("/getusers", authMiddleware, userController.getUsers);
router.patch("/startgame", authMiddleware, gameController.startGame);

export default router;
