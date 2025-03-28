import axios, { AxiosResponse, AxiosError } from "axios";
import FormData from "form-data";
import mime from "mime";
import path from "path";
import process from "process";
import fs from "fs";

interface Metadata {
  name: string;
  description: string;
  category: string;
  tag: string;
  creator: string;
}

export class SDrive {
  apikey: string;
  base_url: string;
  network: "arweave" | "ipfs";
  limit: number;
  page: number;
  user_guid: string;

  constructor(
    apikey: string,
    user_guid: string,
    network: "arweave" | "ipfs" = "arweave",
    page = 1,
    limit = 10
  ) {
    this.apikey = apikey;
    this.user_guid = user_guid;
    this.network = network;
    this.base_url = process.env.base_url || "https://backend.sdrive.app";
    this.page = page;
    this.limit = limit;

    if (!this.apikey || !this.user_guid) {
      console.log("Please add your credentials");
      process.exit();
    }

  }

  async listObjects(): Promise<String[]> {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.base_url}/list-objects`,
        { page: this.page, limit: this.limit, user_guid: this.user_guid },
        {
          headers: {
            Authorization: `Bearer ${this.apikey}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      // Explicitly state that error can be of any type
      if ((error as AxiosError).response) {
        // Type-check error before accessing properties
        const errorInfo = {
          status: (error as AxiosError).response!.status,
          statusText: (error as AxiosError).response!.statusText,
          data: (error as AxiosError).response!.data,
        };
        throw new Error(JSON.stringify(errorInfo));
      } else {
        throw error;
      }
    }
  }

  async upload(
    filepathOrBuffer: string | Buffer,
    filename: string,
    metadata?: Metadata,
  ): Promise<any> {
    let formData = new FormData();
    let mimetype = mime.getType(path.extname(filename)) || undefined;
    
    if (typeof filepathOrBuffer === "string") {
      let fileStream = fs.createReadStream(filepathOrBuffer);
      formData.append("fileupload", fileStream, {
        filename: filename,
        contentType: mimetype,
      });
    } else {
      formData.append("fileupload", filepathOrBuffer, {
        filename: filename,
        contentType: mimetype,
      });
    }
    
    formData.append("apikey", this.apikey);
    formData.append("metadata", JSON.stringify(metadata || []));
    formData.append("network", this.network);
    formData.append("user_guid", this.user_guid);
  
    try {
      const response: AxiosResponse = await axios.post(
        `${this.base_url}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${this.apikey}`,
            "user-agent": "SDriveClient/1.0",
          },
          maxBodyLength: Infinity,
        },
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorInfo = {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        };
        throw new Error(JSON.stringify(errorInfo));
      } else {
        throw error;
      }
    }
  }
  

  
}
