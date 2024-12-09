const normalizePath = (path: string): string => {
  return path.replace(/\\/g, '/');
};

module.exports = normalizePath;
