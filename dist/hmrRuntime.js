export function createHMRRuntime() {
  const subscribers = new Map();
  console.log("subscribers", subscribers);
  return {
    on(filePath, callback) {
      if (!subscribers.has(filePath)) {
        subscribers.set(filePath, new Set());
      }
      subscribers.get(filePath).add(callback);
    },

    off(filePath, callback) {
      subscribers.get(filePath)?.delete(callback);
    },

    notify(filePath) {
      subscribers.get(filePath)?.forEach((cb) => cb());
    },
  };
}
