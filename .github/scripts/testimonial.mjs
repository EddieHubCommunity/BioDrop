import fs from "fs";

const fileName = process.env.FILE_NAME;
const title = process.env.DATA_TITLE;
const description = process.env.DATA_DESCRIPTION;
const date = process.env.DATA_DATE;

const output = {
  title,
  description,
  date,
};

try {
  fs.writeFileSync(fileName, JSON.stringify(output, null, 2));
} catch (e) {
  console.log(`::error ::Error writing ${fileName}`);
  process.exit(1);
}
