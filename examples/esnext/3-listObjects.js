import "dotenv/config";
import { SDrive } from "../../dist/esnext/index.js";

const sdrive = new SDrive(process.env.SDRIVE_API_KEY, process.env.USER_GUID);
sdrive.page = 1;
sdrive.limit = 2;
await sdrive
  .listObjects()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("List failed:", error);
  });
