// sceanarios
// 1. profile with no links (test-user-1.json)
// 2. profile with only links (test-user-2.json)
// 3. profile with socials but no links (test-user-3.json)
// 4. profile with socials and links that match (test-user-4.json)
// 5. profile with socials and links but not matching (test-user-5.json)

// 6. profile with everything: milestones, testmonials, events (test-user-6.json)
// 7. profile with links, but remove link after reload and check link is disabled
// ---

// 1a. move test profiles to data directory (prepend `_` to filename)
const fs = require("fs");

(async () => {
  const path = "./tests/data/";
  const files = fs.readdirSync(path);
  files.map((file) => fs.copyFileSync(`${path}/${file}`, `data/_${file}`));

  // 1b. copy `eddiejaoude` folder for `test-user-6`

  // testimonials exists in profile and json file
  const fullProfile = "_test-automated-user-6";
  fs.mkdirSync(`data/${fullProfile}/testimonials`, { recursive: true });

  fs.copyFileSync(
    `data/eddiejaoude/testimonials/FrancescoXX.json`,
    `data/${fullProfile}/testimonials/FrancescoXX.json`,
  );

  // testimonials exists in profile but not in json file
  fs.copyFileSync(
    `data/eddiejaoude/testimonials/loftwah.json`,
    `data/${fullProfile}/testimonials/unknown.json`,
  );

  // events exists in profile and json file
  fs.mkdirSync(`data/${fullProfile}/events`, { recursive: true });

  fs.copyFileSync(
    `data/eddiejaoude/events/2022-12-10-talk.json`,
    `data/${fullProfile}/events/2022-12-10-talk.json`,
  );

  // 2. hit / run api end point to load profiles
  const request = await fetch(
    "http://localhost:3000/api/system/reload?secret=development",
  );
  const res = await request.json();
  console.log(res);

  // 3. check user api has expected results
  await checkUsers();

  // 4. delete test files and folders
  files.map((file) => fs.unlinkSync(`data/_${file}`));
  fs.rmSync(`data/${fullProfile}`, { recursive: true, force: true });
})();

// TODO: check local user api vs production api
async function checkUsers() {
  const userLocal = await fetch(
    `http://localhost:3000/api/profiles/eddiejaoude`,
  );
  const userLocalRes = await userLocal.json();
  const userProd = await fetch(`https:/biodrop.io/api/profiles/eddiejaoude`);
  const userProdRes = await userProd.json();

  if (userLocalRes.links.length === userProdRes.links.length) {
    console.log(
      `User ${userLocalRes.username}: link count does not match expected`,
      userLocalRes.links.length,
      userProdRes.links.length,
    );
  }
}
