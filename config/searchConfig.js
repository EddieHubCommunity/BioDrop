const fields = ["name", "username", "tags", "location.name"];
const defaultPath = "name"
function getQueryString(queryArr) {
    console.log(queryArr);
  const queryStrings = queryArr.map((term) => {
    const orConditions = fields.map((field) => `${field}:${term}`).join(" OR ");
    return `(${orConditions})`;
  });

  return queryStrings.join(" AND ");
}
export function generateAggreation(termsArray) {
  const query = getQueryString(termsArray);
  const agg = [
    {
      $search: {
        compound: {
          must: [
            {
              queryString: {
                query: query,
                defaultPath: defaultPath,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        "location.name": 1,
        tags: 1,
        score: { $meta: "searchScore" },
      },
    },
  ];
  return agg;
}
