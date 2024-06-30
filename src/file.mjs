import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { parse, format } from "node:path";

function isValidFilename(filename) {
	const parsedPath = parse(filename);

	if (filename !== parsedPath.base) {
		return false;
	}

	const regex = /^[a-zA-Z0-9-_]+/;
	return regex.test(parsedPath.name);
}

export function changeExtension(filename, newExtension) {
	const parsedPath = parse(filename);
	const newFilename = {
		...parsedPath,
		ext: `.${newExtension}`,
		base: undefined,
	};

	return format(newFilename);
}

export function createOutputFilename(inputFile) {
	const parsedPath = parse(inputFile);

	return format({
		...parsedPath,
		name: `${parsedPath.name}-chapters`,
		base: undefined, // base is ignored if name and ext are provided
	});
}

export function generateRandomFileName() {
	const filename = `${
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(23).substring(2, 5)
	}.txt`;

	if (!isValidFilename(filename)) {
		throw new Error(`Invalid filename: ${filename}`);
	}

	return filename;
}

export function readFile(filename) {
	return readFileSync(filename, "utf-8");
}

export function deleteFile(filename) {
	unlinkSync(filename);
}

export function writeFile(filename, content) {
	writeFileSync(filename, content, "utf-8");
}
