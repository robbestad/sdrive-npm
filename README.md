# SDrive 

<div align="center">
  <img src="https://static.sdrive.app/images/sdrive-logo-transparent.png" width="150" alt="SDrive Logo">
  <p>
    <strong>Decentralized, secure storage for modern applications</strong>
  </p>
  <p>
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#api">API</a> •
    <a href="#troubleshooting">Troubleshooting</a>
  </p>
</div>

## About SDrive

SDrive is a powerful decentralized storage solution that makes file uploading easy without compromising user experience or privacy. 

### Key Features

- 🔒 Secure file upload and storage
- 🌐 Support for multiple decentralized networks
- ⚡ Simple and intuitive API
- 📦 Buffer and file stream support
- 🔍 Easy file management and overview

## Installation

### Requirements
- Node.js v18 or newer
- API key from [SDrive](https://sdrive.pro)

### Package Installation
```bash
npm install sdrive
```

### Configuration
Create a `.env` file in your project root:
```env
SDRIVE_API_KEY=<your-key>
USER_GUID=<your-guid>
```

## Usage

### Importing

#### ES Modules
```javascript
import { SDrive } from "sdrive";
```

#### CommonJS
```javascript
const { SDrive } = require("sdrive");
```

### Basic Usage

```javascript
const sdrive = new SDrive("your_sdrive_apikey", "your_user_guid");
```

### Network Selection (Optional)
SDrive supports multiple decentralized networks. Default is Arweave.

```javascript
const sdrive = new SDrive("your_sdrive_apikey");
```

## API Examples

### File Upload

#### Upload using buffer
```javascript
import { SDrive } from "sdrive";
import fs from "fs/promises";

const sdrive = new SDrive("your_sdrive_apikey", "your_user_guid");
const filePath = './my-file.png';
const buffer = await fs.readFile(filePath);

try {
  const response = await sdrive.upload(buffer, "my-file.png");
  console.log("Upload successful:", response);
} catch (error) {
  console.error("Upload failed:", error);
}
```

#### Upload using file stream
```javascript
import { SDrive } from "sdrive";

const sdrive = new SDrive("your_sdrive_apikey", "your_user_guid");
const filePath = './my-file.png';

try {
  const response = await sdrive.upload(filePath, "my-file.png");
  console.log("Upload successful:", response);
} catch (error) {
  console.error("Upload failed:", error);
}
```

### List Files
```javascript
import { SDrive } from "sdrive";

const sdrive = new SDrive("your_sdrive_apikey", "your_user_guid");

// Optional settings
sdrive.page = 1;  // Page number
sdrive.limit = 10; // Files per page

try {
  const response = await sdrive.listObjects();
  console.log("File overview:", response);
} catch (error) {
  console.error("Failed to fetch file overview:", error);
}
```

## API Documentation

### Methods

#### `upload(filebuffer | filepath, filename)`
Uploads a file to the selected network.

**Parameters:**
- `filebuffer | filepath`: Buffer or file path of the file to upload
- `filename`: Desired filename for the uploaded file

**Returns:** Promise that resolves with upload response

#### `listObjects()`
Retrieves a list of all files uploaded with your API key.

**Returns:** Promise that resolves with file overview

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify that the API key is correctly copied to the `.env` file
   - Check if the API key is active in the SDrive dashboard

2. **Upload Failing**
   - Check if the file size doesn't exceed the limit
   - Verify that you have sufficient credit on your account

3. **Network Issues**
   - Check your internet connection
   - Verify that the selected network is available

## Pricing and Subscription

SDrive requires a monthly subscription for permanent storage of uploaded files.

- Visit [SDrive Dashboard](https://sdrive.pro/account/subscription) to view available plans
- Choose the plan that best fits your needs

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## Support

Need help? Visit our [documentation](https://docs.sdrive.pro) or contact us at support@sdrive.pro
