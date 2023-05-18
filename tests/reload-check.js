(async () => {
  const profilesReq = await fetch(`http://localhost:3000/api/users`);
  const profiles = await profilesReq.json();

  await Promise.all(
    profiles.slice(-100).map(async (profile) => {
      const userLocal = await fetch(
        `http://localhost:3000/api/users/${profile.username}`
      );
      const userLocalRes = await userLocal.json();
      const userProd = await fetch(
        `https:/linkfree.io/api/users/${profile.username}`
      );
      const userProdRes = await userProd.json();

      const collections = ["links", "socials", "events", "milestones", "tags"];
      collections.map((collection) => {
        const local = userLocalRes[collection].length;
        const prod = userProdRes[collection]
          ? userProdRes[collection].length
          : 0;
        if (local !== prod) {
          console.log(
            `=== ERROR: User ${userLocalRes.username}: "${collection}" count does not match expected`,
            local,
            prod
          );
        }

        console.log(
          `SUCCESS: User ${userLocalRes.username}: "${collection}" count does match expected`,
          local,
          prod
        );
      });

      const collection = "testimonials";
      const testimonialsLocal = userLocalRes[collection].filter(
        (item) => item.isPinned
      ).length;
      const testimonialsProd = userProdRes[collection]
        ? userProdRes[collection].length
        : 0;
      if (testimonialsLocal !== testimonialsProd) {
        console.log(
          `=== ERROR: User ${userLocalRes.username}: "${collection}" count does not match expected`,
          testimonialsLocal,
          testimonialsProd
        );
      }

      console.log(
        `SUCCESS: User ${userLocalRes.username}: "${collection}" count does not match expected`,
        testimonialsLocal,
        testimonialsProd
      );

      return;
    })
  );

  console.log("DONE", profiles.length);
})();
