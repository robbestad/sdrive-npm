import "dotenv/config";
import { SDrive } from "../../dist/esnext/index.js";

const sdrive = new SDrive(process.env.SDRIVE_API_KEY, process.env.USER_GUID);
sdrive.network = "ipfs";

const filename = "data.json";
const filedata = { data: "Hello world from SDrive" };

const jsonString = JSON.stringify(filedata); // Convert JSON object to a string
const buffer = Buffer.from(jsonString); // Convert string to a Buffer

await sdrive
  .upload(buffer, filename)
  .then((response) => {
    console.log("Upload successful:", response);
  })
  .catch((error) => {
    console.error("Upload failed:", error);
  });
