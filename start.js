const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function deploy() {
  const { stdout: output1 } = await exec("npm install");
  console.log("Installing dependencies...");
  console.log(output1);

  const { stdout: output2 } = await exec("npx sequelize-cli db:migrate:undo:all");
  console.log("Undoing migrations...");
  console.log(output2);

  const { stdout: output3 } = await exec("npx sequelize-cli db:migrate");
  console.log("Migrating database...");
  console.log(output3);

  const { stdout: output4 } = await exec("npx sequelize-cli db:seed:all");
  console.log("Seeding database...");
  console.log(output4);
}

deploy();