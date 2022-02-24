import Router from "koa-router";
import Koa from "koa";

export function connectRouters(app: Koa, routers: Router[]): void {
  for (const router of routers) {
    app.use(router.routes()).use(router.allowedMethods());
  }
}
