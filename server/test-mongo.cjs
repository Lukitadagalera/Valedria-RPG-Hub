const {MongoMemoryServer}=require('mongodb-memory-server');
async function startTestMongo(){const server=await MongoMemoryServer.create();return{uri:server.getUri(),stop:()=>server.stop()};}
module.exports={startTestMongo};
