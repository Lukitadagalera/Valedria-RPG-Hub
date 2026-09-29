const {spawnSync}=require('node:child_process'),fs=require('node:fs');
const suites=['scripts/check-assets.cjs','scripts/audit-site.cjs',...['tests','server'].flatMap(dir=>fs.readdirSync(dir).filter(f=>f.endsWith('.test.cjs')).map(f=>dir+'/'+f))];let failed=0;
for(const file of suites){console.log('\n'+file);const r=spawnSync(process.execPath,[file],{stdio:'inherit',timeout:120000});if(r.status!==0){failed++;if(r.error)console.error(r.error.message);}}
console.log(`\n${suites.length-failed}/${suites.length} suites passed.`);process.exitCode=failed?1:0;
