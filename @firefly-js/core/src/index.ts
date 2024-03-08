import type { Server } from "bun";

import {
  FireFlyConfig,
  FireFlyLifeCycle,
  FireFlyLifeCycleEvent,
  Route,
} from "./types";
import { getValue } from "./utils";

export default class FireFly {
  #config: FireFlyConfig = {
    prefix: "",
  };
  #lifeCircle: FireFlyLifeCycle = {
    bootstrap: [],
    request: [],
    transform: [],
    beforeHandle: [],
    afterHandle: [],
    error: [],
    response: [],
  };
  #server: Server | null = null;
  #routes: Route[] = [];

  constructor(
    config?: Partial<FireFlyConfig> & Partial<FireFlyLifeCycleEvent>
  ) {
    if (typeof Bun === "undefined") {
      throw new Error("Bun is not defined. Please install bun first.");
    }
    this.#config = {
      prefix: getValue(this.#config.prefix, config?.prefix),
    };
    this.#lifeCircle = {
      bootstrap: getValue(this.#lifeCircle.bootstrap, [config?.onBootstrap]),
      request: getValue(this.#lifeCircle.request, [config?.onRequest]),
      transform: getValue(this.#lifeCircle.transform, [config?.onTransform]),
      beforeHandle: getValue(this.#lifeCircle.beforeHandle, [
        config?.onBeforeHandle,
      ]),
      afterHandle: getValue(this.#lifeCircle.afterHandle, [
        config?.onAfterHandle,
      ]),
      error: getValue(this.#lifeCircle.error, [config?.onError]),
      response: getValue(this.#lifeCircle.response, [config?.onResponse]),
    };
  }

  add(route: Route) {
    let path: string = route.path;
    path = path.startsWith("/") ? path : `/${path}`;
    if (this.#config.prefix) {
      path = this.#config.prefix + path;
    }
    const existedRoute = this.#routes.find(
      (r) => r.path === path && r.method === route.method
    );
    if (existedRoute) {
      throw new Error(`Route ${path} already exists`);
    }
    this.#routes.push({
      ...route,
      path,
    });
  }

  public start(port: string | number = process.env.PORT || 5656) {
    this.#server = Bun.serve({
      port: port,
      fetch: async (request) => {
        try {
          const url = new URL(request.url);
          const route = this.#routes.find(
            (r) => r.path === url.pathname && r.method === request.method
          );
          if (!route) {
            return new Response("Not Found", {
              status: 404,
            });
          }
          console.log(route);

          return new Response("Hello World");
        } catch (error) {
          try {
            this.#lifeCircle.error.forEach((fn) => fn(error));
          } catch (e) {
            console.log(e);
          }
          return new Response("Not Found", {
            status: 404,
          });
        }
      },
    });

    return this.#server;
  }
}
