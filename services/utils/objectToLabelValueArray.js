export const objectToLabelValueArray = (object) => {
  return Object.entries(object).map(([key, value]) => {
    return { label: value, value: key };
  });
};
