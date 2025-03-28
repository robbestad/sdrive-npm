import "dotenv/config";
import { SDrive } from "../../dist/esnext/index.js";

const sdrive = new SDrive(process.env.SDRIVE_API_KEY, process.env.USER_GUID);
sdrive.network = "ipfs";
const filePath = "./sdrive.png";
await sdrive
  .upload(filePath, "sdrive.png")
  .then((response) => {
    console.log("Upload successful:", response);
  })
  .catch((error) => {
    console.error("Upload failed:", error);
  });
