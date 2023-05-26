import * as dotenv from 'dotenv';
import loadProfiles from './loadProfiles.mjs';
dotenv.config()

const stats = await loadProfiles();
console.log(JSON.stringify(stats,null,2))

process.exit(0);
