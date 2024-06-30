import { parseArguments } from "./args.mjs";
import { createChapterMetadataFile } from "./chapter.mjs";
import { createOutputFilename } from "./file.mjs";
import { ChapmuxLogger } from "./log.mjs";
import { getInputDuration, muxChapters } from "./media.mjs";

const { dryRun, inputFile, trackList, verbose } = parseArguments();
const logger = new ChapmuxLogger(verbose);
const context = { dryRun, verbose, logger };

try {
	const duration = getInputDuration(inputFile, context);
	context.logger.info(`Duration of ${inputFile}: ${duration}s`);
	const { chapterMetadataFile, deleteChapterMetadataFile } =
		createChapterMetadataFile(trackList, duration, context);
	const outputFile = createOutputFilename(inputFile);

	muxChapters(inputFile, chapterMetadataFile, outputFile, context);

	deleteChapterMetadataFile();

	context.logger.success(`✅ Success! ${outputFile}`);
} catch (error) {
	console.trace(error);
	process.exit(1);
}
