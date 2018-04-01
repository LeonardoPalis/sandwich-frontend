export const requireMarkdown = require.context(
  '../view',
  true,
  /^((?![\\/]component-demos[\\/]).)*\.md$/,
);

const headerRegexp = /---\n(.*)\n---/;
const componentsRegexp = /^components: (.*)$/;
