import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";

function ThemeWrapper({ children }) {
  // render your custom theme provider
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={useDarkMode() ? "dark" : "light"}
    >
      {children}
    </ThemeProvider>
  );
}

export const decorators = [
  (renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextjs: {
    router: {
      basePath: ".",
    },
  },
  a11y: {
    options: {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    },
  },
  darkMode: {
    dark: themes.dark,
    light: themes.normal,
  },
};
