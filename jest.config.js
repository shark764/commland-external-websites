module.exports = {
  rootDir: 'src',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      '<rootDir>/../__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../__mocks__/fileMock.js',
    '@commland/components':
      '<rootDir>/../__mocks__/commland-components.mock.js',
  },
  setupFilesAfterEnv: [
    '../node_modules/@testing-library/jest-dom/dist/index.js',
  ],
};
