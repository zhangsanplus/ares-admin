export enum ResponseEnum {
  /**
   * 成功
   */
  SUCCESS = 0,
  /**
   * 登录过期
   */
  LOGIN_EXPIRED = 1000,
  /**
   * 失败
   */
  ERROR = 9999,

  // 可自行添加其他类型
  // BAD_REQUEST = 400,
  // UNAUTHORIZED = 401,
  // FORBIDDEN = 403,
  // NOT_FOUND = 404,
  // SERVER_ERROR = 500,
}