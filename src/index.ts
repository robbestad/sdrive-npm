import axios, { AxiosResponse, AxiosError } from "axios";
import FormData from "form-data";
import mime from "mime";
import path from "path";
import process from "process";
import fs from "fs";
import {MediaMetadata} from "./types";

export class SDrive {
  apikey: string;
  base_url: string;
  network: "arweave" | "ipfs";
  limit: number;
  page: number;
  generatePreview: boolean = false;

  constructor(
    apikey: string,
    network: "arweave" | "ipfs" = "arweave",
    page = 1,
    limit = 10,
    generatePreview: boolean = false,
  ) {
    this.apikey = apikey;
    this.network = network;
    this.base_url = process.env.base_url || "https://v3.sdrive.app";
    this.page = page;
    this.limit = limit;
    this.generatePreview = generatePreview;

    if (!this.apikey) {
      console.log("Please add your credentials");
      process.exit();
    }
  }

  async listObjects(): Promise<String[]> {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.base_url}/list-objects`,
        { page: this.page, limit: this.limit },
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
    metadata?: MediaMetadata,
  ): Promise<any> {
    let formData = new FormData();
    let mimetype = mime.getType(path.extname(filename)) || undefined; // Use undefined if null
    if ("string" === typeof filepathOrBuffer) {
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
    formData.append("metadata", JSON.stringify(metadata||[]));
    formData.append("network", this.network);
    formData.append("generatePreview", this.generatePreview.toString());

    try {
      const response: AxiosResponse = await axios.post(
        `${this.base_url}/upload`,
        formData,
        {
          headers: formData.getHeaders(),
          maxBodyLength: Infinity,
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
}
