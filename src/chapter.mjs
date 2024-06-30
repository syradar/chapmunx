import { EOL } from "node:os";
import {
	deleteFile,
	generateRandomFileName,
	readFile,
	writeFile,
} from "./file.mjs";

function validateTimePart(time) {
	if (Number.isNaN(time)) {
		throw new Error(`Time must be a number: ${time}`);
	}

	if (time < 0) {
		throw new Error(`Time must be positive: ${time}`);
	}

	if (time >= 60) {
		throw new Error(`Time must not be over 60: ${time}`);
	}

	return time;
}

function parseTime(hours, minutes, seconds, ctx) {
	const hoursInt = hours ? validateTimePart(+hours) : 0;

	if (!minutes) {
		throw new Error(`Minutes are required: ${timeStr}`);
	}
	const minutesInt = validateTimePart(+minutes);

	if (!seconds) {
		throw new Error(`Seconds are required: ${timeStr}`);
	}
	const secondsInt = validateTimePart(+seconds);

	ctx.logger.debug(
		`hours: ${hoursInt}, minutes: ${minutesInt}, seconds: ${secondsInt}`,
	);

	const result = hoursInt * 3600 + minutesInt * 60 + secondsInt;
	ctx.logger.debug(`Time in seconds: ${result}`);

	return result;
}

// ^: Start of the string.
// (?:\d{1,2}:)?: Non-capturing group for optional hours (1 or 2 digits followed by :).
// (\d{1,2}): Captures minutes (1 or 2 digits).
// :(\d{2}): Captures seconds (2 digits).
// \s+: One or more whitespace characters.
// (.+)$: Captures the title (any characters until the end of the line).
const TRACK_LIST_REGEX = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\s+(.+)$/;

function createChapterMetadata(chapterContent, durationInSeconds, ctx) {
	const lines = chapterContent.split(EOL);
	const chapterMetadata = [];

	for (const line of lines) {
		const match = line.match(TRACK_LIST_REGEX);
		if (!match) continue;

		const start = parseTime(match[1], match[2], match[3], ctx);
		const title = match[4];

		chapterMetadata.push({ start, end: durationInSeconds, title });
	}

	for (let index = 0; index < chapterMetadata.length - 1; index++) {
		chapterMetadata[index].end = chapterMetadata[index + 1].start;
	}

	return chapterMetadata;
}

function formatChapterMetadata(chapters) {
	return chapters
		.map(({ start, end, title }) =>
			[
				"[CHAPTER]",
				"TIMEBASE=1/1000",
				`START=${start * 1000}`,
				`END=${end * 1000}`,
				`title=${title}`,
			].join(EOL),
		)
		.join(EOL + EOL);
}

export function createChapterMetadataFile(
	tracklistFile,
	durationInSeconds,
	ctx,
) {
	ctx.logger.info("Creating chapter metadata");
	const tracklist = readFile(tracklistFile);
	const chapterMetadata = createChapterMetadata(
		tracklist,
		durationInSeconds,
		ctx,
	);
	ctx.logger.info(`Found ${chapterMetadata.length} chapters`);

	const formattedChapterMetadata = formatChapterMetadata(chapterMetadata);
	ctx.logger.debug(formattedChapterMetadata);

	const filename = generateRandomFileName();

	if (ctx.dryRun) {
		ctx.logger.info(`Dry run: would create file: ${filename}`);
	} else {
		writeFile(filename, formattedChapterMetadata);
		ctx.logger.info(`Wrote chapter metadata to ${filename}`);
	}

	const deleteChapterMetadataFile = () => {
		if (ctx.dryRun) {
			ctx.logger.info(`Dry run: would delete file: ${filename}`);
		} else {
			deleteFile(filename);
			ctx.logger.info(`Deleted chapter metadata file: ${filename}`);
		}
	};

	return { chapterMetadataFile: filename, deleteChapterMetadataFile };
}
