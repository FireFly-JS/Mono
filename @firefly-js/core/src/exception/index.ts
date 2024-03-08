import { HTTPStatus } from "../http";

export default class Exception extends Error {
  code: HTTPStatus = HTTPStatus.Internal;
  data: any = null
  constructor(code: HTTPStatus, message: string, data?: any) {
    super(message);
    this.code = code || HTTPStatus.Internal;
    this.data = data || null;
  }

  static BadRequest (message: string, data?: any) {
    return new Exception(HTTPStatus.BadRequest, message, data);
  }

  static Unauthorized (message: string, data?: any) {
    return new Exception(HTTPStatus.Unauthorized, message, data);
  }

  static Forbidden (message: string, data?: any) {
    return new Exception(HTTPStatus.Forbidden, message, data);
  }

  static NotFound (message: string, data?: any) {
    return new Exception(HTTPStatus.NotFound, message, data);
  }

  static Internal (message: string, data?: any) {
    return new Exception(HTTPStatus.Internal, message, data);
  }

  static TooManyRequests (message: string, data?: any) {
    return new Exception(HTTPStatus.TooManyRequests, message, data);
  }
}