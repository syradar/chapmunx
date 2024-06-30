import { styleText } from "node:util";

export class ChapmuxLogger {
	constructor(verbose) {
		this.verbose = verbose;
	}

	info(message) {
		console.log(styleText("white", message));
	}

	debug(message) {
		if (!this.verbose) {
			return;
		}

		console.log(message);
	}

	error(message) {
		console.error(styleText("red", message));
	}

	success(message) {
		console.log(styleText("green", message));
	}

	warn(message) {
		console.warn(styleText("yellow", message));
	}
}
