import fs from 'fs';
import env from '@config/env'

const fileName = env.FILE_NAME;
const title = env.DATA_TITLE;
const description = env.DATA_DESCRIPTION;
const date = env.DATA_DATE;

const output = {
  title,
  description,
  date
}

try {
  fs.writeFileSync(fileName, JSON.stringify(output, null, 2));
} catch(e) {
  console.log(`::error ::Error writing ${fileName}`);
  process.exit(1);
}
