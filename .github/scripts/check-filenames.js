let fileNames = process.env.FILENAMES.split(' ');
const baseFileNames = process.env.BASE_FILENAMES.split(' ');
const user = process.env.USERNAME;
let exitCode = 0;

// Remove files not changed in this PR from list
if (baseFileNames.length > 0) {
  fileNames = fileNames.filter(file => !baseFileNames.includes(file));
}

if (fileNames.length > 0) {
  fileNames.forEach(file => {
    const splitFile = file.split('/');
    const userPart = splitFile[1];
    // Files not in data directory produce a warning
    if(splitFile[0] !== 'data') {
      console.log(`::warning ::${file} included in Pull Request with profile changes but not in data directory.`);
      return;
    }
    if (!file.endsWith('.json')){
      exitCode = 1;
      console.log(`::error ::Filename ${file} does not end with '.json'`);
      return;
    }
    if ((userPart !== user ) && (userPart !== `${user}.json`)){
      // Allow for testimonials
      if((splitFile.length == 4) && (splitFile[2] === 'testimonials') && (splitFile[3] === `${user}.json`)) {
        return;
      }
      exitCode = 1;
      console.log(`::error ::Filename ${file} does not match user ${user}`);
    }
  });
}

process.exit(exitCode);
