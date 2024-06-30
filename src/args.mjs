import { parseArgs, styleText } from "node:util";
import { changeExtension } from "./file.mjs";

function printUsage() {
	console.log(`
			Usage: node chapmux.mjs [options]
			
			Options:
			-i, --inputFile <inputFile>        Specify the input video file (.mp4)
			-t, --trackList <trackList>        Specify the tracklist file (.txt)
			-d, --dryRun                       Run the command in dry run mode without making any changes
			-v, --verbose                      Enable verbose logging
			`);
}

export function parseArguments() {
	const { inputFile, trackList, dryRun, verbose } = parseArgs({
		options: {
			dryRun: { type: "boolean", short: "d" },
			inputFile: { type: "string", short: "i" },
			trackList: { type: "string", short: "t", default: undefined },
			verbose: { type: "boolean", short: "v" },
		},
	}).values;

	if (!inputFile) {
		console.error(styleText("red", "Input file is required"));
		printUsage();
		process.exit(1);
	}

	let trackListFilename = trackList;

	if (!trackListFilename) {
		trackListFilename = changeExtension(inputFile, "txt");
		console.warn(
			styleText(
				"yellow",
				`Tracklist file not specified, using ${trackListFilename}`,
			),
		);
	} else if (!trackList.endsWith(".txt")) {
		console.error(styleText("red", "Tracklist file must be a .txt file"));
		printUsage();
		process.exit(1);
	}

	return {
		inputFile,
		trackList: trackListFilename,
		dryRun: dryRun ?? false,
		verbose: verbose ?? false,
	};
}
