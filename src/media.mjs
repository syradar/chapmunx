import { execSync } from "node:child_process";
import { EOL } from "node:os";

export function getInputDuration(filename, ctx) {
	const program = "ffprobe";
	const options =
		"-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1";
	const command = `${program} ${options} "${filename}"`;

	if (ctx.dryRun) {
		ctx.logger.info(`Dry run: would execute command: ${command}`);
		ctx.logger.debug(`Duration of ${filename}: ${0}s`);
		return 0;
	}

	const output = execSync(command, { encoding: "utf-8" });
	const duration = Number.parseFloat(output.trim());

	if (Number.isNaN(duration)) {
		throw new Error("Failed to parse duration");
	}

	ctx.logger.debug(`Duration of ${filename}: ${duration}s`);
	return duration;
}

function getStreamTypes(filename, ctx) {
	const program = "ffprobe";
	const options = "-loglevel error -show_entries stream=codec_type -of csv=p=0";
	const command = `${program} ${options} "${filename}"`;

	if (ctx.dryRun) {
		logger.info(`Dry run: would execute command: ${command}`);
		return ["video", "audio"];
	}

	const output = execSync(command, { encoding: "utf-8" });
	const streamTypes = output.trim().split(EOL);

	return streamTypes;
}

export function muxChapters(inputFile, chaptersFile, outputFile, ctx) {
	const program = "ffmpeg";
	const streamTypes = getStreamTypes(inputFile, ctx);

	const command = [
		program,
		`-i "${inputFile}"`,
		`-f ffmetadata -i "${chaptersFile}"`,
		streamTypes.includes("video") ? "-map 0:v" : "",
		streamTypes.includes("audio") ? "-map 0:a" : "",
		"-map_metadata 1",
		"-map_chapters 1",
		`-c copy "${outputFile}"`,
	].join(" ");

	if (ctx.dryRun) {
		ctx.logger.info(`Dry run: would execute command: ${command}`);
	} else {
		ctx.logger.debug(`Executing command: ${command}`);
		execSync(command, { stdio: "inherit" });
		ctx.logger.debug("Command executed successfully");
	}
	ctx.logger.info(
		`Muxed ${inputFile} with chapters from ${chaptersFile} to ${outputFile}`,
	);
}
