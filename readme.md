# glue-poc

A Node.js proof-of-concept for secure file storage and retrieval using Azure services, including Azure Blob Storage, Azure Key Vault, and Azure Service Bus.

## Features

- **Chunked, Encrypted File Storage:** Files are encrypted using envelope encryption (AES-256-CBC with a random symmetric key, which is itself encrypted with Azure Key Vault) and split into random-sized chunks for storage in Azure Blob Storage.
- **Secure File Retrieval:** Files are reassembled from chunks, decrypted using Azure Key Vault, and written to disk.
- **Azure Service Bus Integration:** Listens for messages on a Service Bus queue to trigger file retrieval and glue operations.

## Project Structure

```
.
├── .env
├── .gitignore
├── index.js
├── package.json
├── download/
│   └── test.txt
├── factory/
│   ├── azure.blob.js
│   ├── azure.keyvault.js
│   └── azure.svcbus.js
└── services/
    ├── azuresvcbus.service.js
    ├── filestore.service.js
    └── glue.service.js
```

## Prerequisites

- Node.js (v14+ recommended)
- Azure Subscription with:
  - Azure Blob Storage account and container
  - Azure Key Vault with at least one RSA key
  - Azure Service Bus namespace and queue
- Service principal credentials with access to the above resources

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment variables:**

   Copy `.env` and fill in your Azure credentials and resource names:

   ```
   AZURE_CLIENT_ID=...
   AZURE_TENANT_ID=...
   AZURE_CLIENT_SECRET=...
   AZURE_KEY_VAULT_URL=...
   AZURE_BLOB_CONTAINERNAME=...
   AZURE_BLOB_ACCOUNTNAME=...
   AZURE_SVCBUS_NAMESPACE=...
   AZURE_SVCBUS_QUEUE=...
   ```

3. **Start the service:**

   ```sh
   node index.js
   ```

   > Or, for development with auto-reload:
   >
   > ```sh
   > npx nodemon index.js
   > ```

## Usage

- The service listens to the configured Azure Service Bus queue.
- When a message is received (containing file chunk info and encryption metadata), it downloads, decrypts, and glues the file, saving it to the `download/` directory.

## Main Components

- [factory/azure.blob.js](factory/azure.blob.js): [`AzureBlobFactory`](factory/azure.blob.js) for blob storage operations.
- [factory/azure.keyvault.js](factory/azure.keyvault.js): [`AzureKeyFactory`](factory/azure.keyvault.js) for encryption/decryption with Azure Key Vault.
- [factory/azure.svcbus.js](factory/azure.svcbus.js): [`AzureServiceBus`](factory/azure.svcbus.js) for Service Bus messaging.
- [services/filestore.service.js](services/filestore.service.js): [`FileStorageService`](services/filestore.service.js) for encrypting and chunking files.
- [services/glue.service.js](services/glue.service.js): [`glueService`](services/glue.service.js) for reassembling and decrypting files.

## License

MIT

---

*This is a proof-of-concept. Use with caution in production environments.*