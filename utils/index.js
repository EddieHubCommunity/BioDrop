import fs from "fs/promises";

export async function readAndParseJsonFile(filePath) {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
}

export function filterEmptyObjects(objects) {
    return objects.filter(object => Object.entries(object).length !== 0);
}

export async function getJsonFilesInDirectory(directoryPath) {
    const rawFiles = await fs.readdir(directoryPath);
    return rawFiles.filter((item) => item.includes("json"));
}

export async function getNonJsonFilesInDirectory(directoryPath) {
    const rawFiles = await fs.readdir(directoryPath);
    return rawFiles.filter((item) => !item.includes("json"));
}
