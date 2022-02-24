import Router from "koa-router";
import ParserController from "./Parser.controller";

const router = new Router({ prefix: "/api" });
const controller = new ParserController();

router.get("/files", controller.read);

export default router;
