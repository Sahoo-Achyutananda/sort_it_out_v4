const MAX_HEIGHT_RACE_MODE = 270;
const MAX_HEIGHT_STANDALONE_MODE = 350;

function getRandomHeight() {
  const height = Math.floor(Math.random() * 350);
  return `${height}px`;
}

function randomDelay(secs) {
  const delay = secs * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function generateArray(length) {
  const arr = Array.from(
    { length: length },
    () => Math.floor(Math.random() * MAX_HEIGHT_STANDALONE_MODE) + 1
  );

  return arr;
}

function generateArrayforRace(length) {
  const arr = Array.from(
    { length: length },
    () => Math.floor(Math.random() * MAX_HEIGHT_RACE_MODE) + 1
  );

  return arr;
}

export { getRandomHeight, randomDelay, generateArray, generateArrayforRace };
