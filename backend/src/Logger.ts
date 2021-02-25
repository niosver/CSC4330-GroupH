import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export type LogLevel = 'INFO' | 'ERROR';
/**
 * Static class for displaying log level and time prepended to message.
 *
 * @class
 * @example
 *  Logger.log('hello');
 *  Logger.log(error, Logger.ERROR);
 *
 *  logger = new Logger() //wrong
 */
export class Logger {
  public static INFO: 'INFO' = 'INFO';
  public static ERROR: 'ERROR' = 'ERROR';

  /**
   * Retrieves current time in HH:MM:SS format
   *
   * @returns string
   * @private
   * @method
   */
  private static getTime() {
    const d = new Date(Date.now());
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
  /**
   * Method for printing message to console.
   *
   * @method log
   * @param {string} message
   * @param {'INFO'|'ERROR'} level
   * @default level='INFO'
   */
  static log(message: string, level: LogLevel = this.INFO) {
    const time = this.getTime();
    const _level = level == this.INFO ? chalk.blue(level) : chalk.red(level);
    console.log(`[${_level}]  ${time}  ${message}`);
  }
}
/**
 * Type for RequestLogger
 * @see RequestLogger
 */
export type TRequestLogger = () => (
  req: Request,
  _res: Response,
  next: NextFunction
) => void;

/**
 * Express middleware wrapper for Logger that logs the http method and url
 * when a client makes a request.
 *
 * @function
 * @see Logger
 * @see TRequestLogger
 * @example
 * const app = request();
 * app.use(RequestLogger());
 * app.get('/hello',callback); // logs [INFO] [TIME] GET /hello
 */
export const RequestLogger: TRequestLogger = () => (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const method = chalk.green(req.method);
  const url = chalk.yellow(req.url);
  const message = `${method} ${url}`;
  Logger.log(message);
  next();
};
