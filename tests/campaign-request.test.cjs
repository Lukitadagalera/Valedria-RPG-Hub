const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function fixture(remote) {
  const handlers = {}, fields = {nome:'Teste',email:' TESTE@EXAMPLE.TEST ',mesa:'alexandre',papel:'Quero jogar'};
  const form = {hidden:false, elements:{mesa:{selectedOptions:[{textContent:'Alexandre'}]}}, reportValidity:()=>true, addEventListener:(n,f)=>handlers[n]=f, setAttribute(){},removeAttribute(){}};
  const button = {}, status = {}, heading = {}, paragraph = {};
  const success = {hidden:true,focus(){},querySelector:s=>s==='h3'?heading:paragraph};
  const storage = new Map(), requests = [];
  let fail = false, seq = 0;
  const context = {window:{VALEDRIA_CONEXOES:remote?{solicitacoesEndpoint:'https://example.test/requests'}:{}},document:{getElementById:id=>({'notice-form':form,'send-request':button,'request-status':status,'request-success':success}[id])},URL,AbortController,FormData:class{get(k){return fields[k];}},crypto:{randomUUID:()=>String(++seq)},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){},fetch:async(_url,options)=>{requests.push(JSON.parse(options.body));return {ok:!fail,json:async()=>({emailSent:!fail})};}};
  vm.runInNewContext(fs.readFileSync('assets/js/campaign-request.js','utf8'),context);
  return {fields,form,button,status,success,storage,requests,fire:n=>handlers[n]({preventDefault(){}}),failure:value=>fail=value};
}
(async()=>{
  const f=fixture(true);
  await f.fire('submit');assert.equal(f.requests.length,1);assert.equal(f.success.hidden,false);assert.equal(f.button.disabled,true);
  await f.fire('submit');assert.equal(f.requests.length,1,'no double submission after confirmation');
  f.fields.mesa='lucas';f.fire('campaign-request-open');assert.equal(f.button.disabled,false);
  await f.fire('submit');assert.equal(f.requests.length,2,'second table can be submitted');assert.notEqual(f.requests[0].requestId,f.requests[1].requestId);
  f.fields.descricao='Changed';f.fire('input');f.failure(true);await f.fire('submit');await f.fire('submit');assert.equal(f.requests[2].requestId,f.requests[3].requestId,'failed retries preserve idempotency key');
  const local=fixture(false);await local.fire('submit');local.fields.email='teste@example.test';await local.fire('submit');assert.equal(JSON.parse([...local.storage.values()][0]).length,1,'case and whitespace do not duplicate local requests');
  assert.equal(local.requests.length,0,'demo sends nothing');
  console.log('PASS: second campaign request, duplicate confirmation prevention, retry IDs, normalized local duplicates and no demo transmission.');
})().catch(e=>{console.error(e);process.exitCode=1;});
