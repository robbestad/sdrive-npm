const { SDrive } = require("../../dist/cjs/index.cjs");
const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

(async () => {
  const sdrive = new SDrive(process.env.SDRIVE_API_KEY, process.env.USER_GUID);
  await sdrive
    .listObjects()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("List failed:", error);
    });
})();
