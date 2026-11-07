const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
const source=fs.readFileSync('correcao_19/script.js','utf8');let writes=0,signedOut=false,shown=0,alertas=0,sessao;
const fields={loginEmail:{value:'admin@example.invalid',checkValidity:()=>true},senhaLogin:{value:'fake'}};
const ctx={registrarAcessoPrivado:async()=>{},console,document:{getElementById:id=>fields[id]},auth:{setPersistence:async()=>{},signInWithEmailAndPassword:async()=>({user:{uid:'admin',email:'admin@example.invalid'}}),signOut:async()=>signedOut=true},db:{collection:()=>{writes++;throw Error('Não deve criar aluno');}},firebase:{auth:{Auth:{Persistence:{LOCAL:'local'}}}},contaAdministradora:async()=>true,localStorage:{getItem:()=>sessao||null,setItem:(k,v)=>sessao=v},modalLogin:{style:{display:'block'}},limparFormularioLogin:()=>{},mostrarUsuario:()=>shown++,exibirAlerta:()=>alertas++};
vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('function iniciarSessaoAdministrativaDeTeste('),source.indexOf('function mostrarUsuario()',source.indexOf('async function login()'))),ctx);
await ctx.login();assert(!signedOut);assert.equal(writes,0);assert.equal(alertas,0);assert.equal(ctx.modalLogin.style.display,'none');assert.equal(JSON.parse(sessao).uid,'admin');assert.equal(JSON.parse(sessao).participarRanking,false);
// Invoke the real auth-restoration callback without running unrelated page setup.
let callback;ctx.auth.onAuthStateChanged=f=>callback=f;
const start=source.lastIndexOf('auth.onAuthStateChanged('),end=source.indexOf('\n    );',start)+7;
vm.runInContext(source.slice(start,end),ctx);await callback({uid:'admin',email:'admin@example.invalid'});
assert(!signedOut);assert.equal(writes,0);assert(shown>=2);assert.equal(JSON.parse(sessao).administrativa,true);
const rules=fs.readFileSync('correcao_15/firestore.rules','utf8');assert(rules.includes('!administradorUid(uid)'));
const utils=fs.readFileSync('correcao_15/pontuacao-utils.js','utf8');assert(utils.includes('if (await contaAdministradora(uid)) return;'));
console.log('PASS: administrative login and auth restoration keep the session, close the login, show no admin warning, create no student; existing score/ranking exclusions retained.');
})().catch(e=>{console.error(e);process.exit(1)});
