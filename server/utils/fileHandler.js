const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

const writeTasks = async (tasks) => {
  await fs.writeFile(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
};

module.exports = {
  readTasks,
  writeTasks,
};