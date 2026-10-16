// Operator-only support tool: node server/support.cjs list | reply TICKET message.txt | close TICKET
require('dotenv').config({path:require('node:path').resolve(__dirname,'../.env'),quiet:true});
const fs=require('node:fs'),mongoose=require('mongoose'),{createModels}=require('../models'),studio=require('../controllers/studioController');
if(!process.env.MONGODB_URI)throw Error('MONGODB_URI required');
const [action,id,file]=process.argv.slice(2);
async function main(){
 const connection=await mongoose.createConnection(process.env.MONGODB_URI).asPromise(),models=createModels(connection);
 try{
  if(action==='list')console.log(await models.Ticket.find({},{subject:1,status:1,created:1}).sort({created:-1}).limit(100).lean());
  else if(action==='reply'){const body=fs.readFileSync(file,'utf8').trim();if(!body||body.length>4000)throw Error('Invalid reply');const ticket=await models.Ticket.findOne({_id:id,status:'open'});if(!ticket)throw Error('Invalid open ticket');ticket.messages.push({sender:'support',body,created:Date.now()});await ticket.save();console.log('Reply saved');}
  else if(action==='close'){const result=await models.Ticket.updateOne({_id:id},{$set:{status:'closed'}});if(!result.matchedCount)throw Error('Ticket not found');console.log('Ticket closed');}
  else throw Error('Use list, reply or close');
 }finally{await connection.close();}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
