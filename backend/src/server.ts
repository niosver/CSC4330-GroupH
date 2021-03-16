import dotenv from "dotenv";
import {Logger} from "./Logger";
import {app} from "./app"

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	Logger.log(`Sever running on port ${port}`);
	/* client uses port 3000 sets proxy for server at port 8000 in development environment */
	if (port != 8000) {
		Logger.log(
			"Running client/server concurrently in development requires server port set to 8000",
			Logger.WARN
		);
	}
});

export {server};