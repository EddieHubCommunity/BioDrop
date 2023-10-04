export const cleanSearchInput = (searchInput) => {
  return searchInput
    .trim()
    .replace(/\s{2,}/g, " ")
    .replace(/,(?!\s)/g, ", ")
    .toLowerCase();
};

export const searchTagNameInInput = (searchInput, tagName) => {
  const tags = cleanSearchInput(searchInput).split(",");

  for (let tag of tags) {
    if (tag.trim() === tagName.toLowerCase()) {
      return true;
    }
  }

  return false;
};
