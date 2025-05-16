const AzureServiceBus = require('./factory/azure.svcbus');
const {glueService} = require('./services/glue.service');

require('dotenv').config()
azuresvcbus = new AzureServiceBus(process.env.AZURE_SVCBUS_NAMESPACE, process.env.AZURE_SVCBUS_QUEUE);
azuresvcbus.subscribe(glueService);
