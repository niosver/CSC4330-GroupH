import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export type LogLevel = "INFO" | "ERROR" | "WARN";
/**
 * Static class for displaying log level and time prepended to message. Default
 * log level is set to INFO.
 *
 * @class
 * @example
 *  Logger.log('hello'); //correct
 *  Logger.log(error, Logger.ERROR); //correct
 *  Logger.log('not implemented', Logger.WARN); //correct
 *
 *  logger = new Logger() //wrong
 */
export class Logger {
	public static INFO: "INFO" = "INFO";
	public static WARN: "WARN" = "WARN";
	public static ERROR: "ERROR" = "ERROR";

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
	 * @param {any} message
	 * @param {'INFO' | 'ERROR' | 'INFO'} level
	 * @default level='INFO'
	 */
	static log(message: any, level: LogLevel = this.INFO) {
		const time = this.getTime();
		/* info = blue | warn = yellow | error = red */
		const _level =
			level == this.INFO
				? chalk.blue(level)
				: level == this.WARN
				? chalk.yellow(level)
				: chalk.red(level);
		console.log(`[${_level}]\t`, `${time}\t`, message);
	}
}
/**
 * Type for RequestLogger
 * @see RequestLogger
 */
export type TRequestLogger = () => (req: Request, _res: Response, next: NextFunction) => void;

/**
 * Express middleware wrapper for Logger that logs the http method and url
 * when a client makes a request.
 *
 * @function
 * @see Logger
 * @see TRequestLogger
 * @example
 * const app = express();
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
