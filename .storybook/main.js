module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@tomfreudenberg/next-auth-mock/storybook",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  env: (config) => ({
    ...config,
    STORYBOOK_RUN: true,
  }),
};
