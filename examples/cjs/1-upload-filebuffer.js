const { SDrive } = require("../../dist/cjs/index.cjs");
const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

(async () => {
  const sdrive = new SDrive(process.env.SDRIVE_API_KEY, process.env.USER_GUID);
  const filePath = "./mozart.png";
  const buffer = await fs.readFile(filePath);
  await sdrive
    .upload(buffer, "mozart.png")
    .then((response) => {
      console.log("Upload successful:", response);
    })
    .catch((error) => {
      console.error("Upload failed:", error);
    });
})();
