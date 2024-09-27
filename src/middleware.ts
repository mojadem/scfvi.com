import { defineMiddleware } from "astro:middleware";
import PocketBase from "pocketbase";

export const onRequest = defineMiddleware((context, next) => {
  const pb = new PocketBase("https://scfvi.pockethost.io/") as TypedPocketBase;
  context.locals.pb = pb;

  return next();
});
