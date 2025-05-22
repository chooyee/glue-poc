const AzureServiceBus = require('./factory/azure.svcbus');
const {glueService} = require('./services/glue.service');
const fs = require('fs');
const path = require("path");

require('dotenv').config()

azuresvcbus = new AzureServiceBus(process.env.AZURE_SVCBUS_NAMESPACE, process.env.AZURE_SVCBUS_QUEUE);
azuresvcbus.subscribe(glueService);

// const certDir = path.join(__dirname, 'cert');
// if (!fs.existsSync(certDir)) {
//   fs.mkdirSync(certDir, { recursive: true });
// }