import findAllBasic from "../../../services/profiles/findAllBasic";

export default async function handler(req, res) {
  const profiles = findAllBasic();

  const tags = profiles.flatMap((profile) =>
    profile.tags && profile.tags.length ? profile.tags : []
  );

  const reducedTags = tags.reduce((allTags, name) => {
    const currCount = allTags[name] ?? 0;
    return {
      ...allTags,
      [name]: currCount + 1,
    };
  }, {});

  const tagsSorted = Object.entries(reducedTags)
    .map((item) => ({
      name: item[0],
      total: item[1],
    }))
    .sort((a, b) => b.total - a.total);

  res.status(200).json(tagsSorted);
}
