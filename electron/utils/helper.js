const runFunc = (cb = () => {}, ...args) => {
  try {
    cb(...args);
  } catch (error) {}
};

module.exports = { runFunc };
