export type FireFlyConfig = {
  prefix: string;
};

export type FireFlyLifeCycle = {
  bootstrap: any[];
  request: any[];
  transform: any[];
  beforeHandle: any[];
  afterHandle: any[];
  error: any[];
  response: any[];
};

export type FireFlyLifeCycleEvent = {
  onBootstrap: any;
  onRequest: any;
  onTransform: any;
  onBeforeHandle: any;
  onAfterHandle: any;
  onError: any;
  onResponse: any;
};

export type HTTPMethod =
  | (string & {})
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export type RouteQuery = {
  [key: string]: any;
};
export type RouteBody = {
  [key: string]: any;
};
export type RouteParams = {
  [key: string]: any;
};

export type RouteHeaders = {
  [key: string]: any;
};
export type RouteResponse = {
  200: unknown;
};

export type MaybePromise<T> = T | Promise<T>;

export type RouteSchema = {
  query?: RouteQuery;
  body?: RouteBody;
  params?: RouteParams;
  headers?: RouteHeaders;
  response?: RouteResponse;
};

export type RouteDecorator = {
  [key: string]: any;
};

export type Context<
Schema extends RouteSchema = {},
  Decorator extends RouteDecorator = {}
> = Schema & Decorator;

export type Handler<
  Schema extends RouteSchema = {},
  Decorator extends RouteDecorator = {}
> = (
  context: Context<Schema, Decorator>
) => Schema["response"] extends RouteResponse
  ? Response | MaybePromise<Schema["response"][keyof Schema["response"]]>
  : Response | MaybePromise<Schema["response"]>;

export type Route<Schema extends RouteSchema = RouteSchema, Decorator extends RouteDecorator = RouteDecorator> = {
  method: HTTPMethod;
  path: string;
  schema?: Schema;
  decorator?: Decorator;
  handler: Handler<
    Route["schema"] extends RouteSchema ? Route["schema"] : RouteSchema,
    Route["decorator"] extends RouteDecorator
      ? Route["decorator"]
      : RouteDecorator
  >;
};
