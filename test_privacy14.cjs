const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
const source=fs.readFileSync('correcao_14/script.js','utf8');
for(const consent of [true,false]){
 let saved,success=false;
 const fields={nomeCadastro:{value:'Ana Souza'},emailCadastro:{value:'ana@example.invalid',checkValidity:()=>true},senhaCadastro:{value:'senha_teste_fake'},aceitarTermos:{checked:consent},perfilComunidade:{value:'coda'}};
 const c={console,document:{getElementById:id=>fields[id]},auth:{setPersistence:async()=>{},createUserWithEmailAndPassword:async()=>({user:{uid:'u',updateProfile:async()=>{}}})},db:{collection:()=>({doc:()=>({set:async d=>saved=d})})},firebase:{auth:{Auth:{Persistence:{LOCAL:'local'}}},firestore:{FieldValue:{serverTimestamp:()=>123}}},modalCadastro:null,localStorage:{setItem:()=>{}},limparFormularioCadastro:()=>{},mostrarUsuario:()=>{},registrarAcessoPrivado:async()=>{},exibirAlerta:(icon)=>{if(icon==='success')success=true}};
 vm.createContext(c);vm.runInContext(fs.readFileSync('correcao_14/perfil-comunidade.js','utf8'),c);vm.runInContext(source.slice(source.indexOf('async function cadastrar()'),source.indexOf('// LOGIN',source.indexOf('async function cadastrar()'))).replace(/\/\/ =+\s*$/,''),c);
 await c.cadastrar();assert(success);assert.equal(saved.perfilComunidade,consent?'coda':null);assert.equal(c.textoPerfilComunidade('coda'),'Pessoa CODA — ouvinte, filha(o) de pais surdos');assert.equal(c.textoPerfilComunidade(null),'Não informado');assert.equal(c.textoPerfilComunidade('prefiro_nao_informar'),'Prefiro não informar');
}
console.log('PASS real cadastrar function: optional relation saved for consenting account; not recorded without consent; missing and prefer-not-to-answer stay distinct.');
// Named app has independent authentication and database objects.
const primaryAuth={},secondaryAuth={},secondaryDb={};let named;
const cfg={firebaseConfig:{projectId:'fake'},auth:primaryAuth,firebase:{apps:[{name:'[DEFAULT]'}],initializeApp:(config,name)=>{named=name;return{auth:()=>secondaryAuth,firestore:()=>secondaryDb}}}};
vm.createContext(cfg);vm.runInContext(fs.readFileSync('correcao_14/firebase-pesquisa-config.js','utf8'),cfg);assert.equal(named,'pesquisaPrivada');assert.equal(vm.runInContext('authPesquisa',cfg),secondaryAuth);assert.notEqual(vm.runInContext('authPesquisa',cfg),primaryAuth);
console.log('PASS panel initializes separate named Firebase Auth session.');
// Administrator never creates a student through the ordinary login.
let signedOut=false,rootReads=0;
const loginFields={loginEmail:{value:'admin@example.invalid',checkValidity:()=>true},senhaLogin:{value:'fake'}};
const a={console,document:{getElementById:id=>loginFields[id]},auth:{setPersistence:async()=>{},signInWithEmailAndPassword:async()=>({user:{uid:'admin'}}),signOut:async()=>{signedOut=true}},db:{collection:()=>{rootReads++;throw Error('No student read expected')}},firebase:{auth:{Auth:{Persistence:{LOCAL:'local'}}}},contaAdministradora:async()=>true,localStorage:{removeItem:()=>{}},mostrarUsuario:()=>{},exibirAlerta:()=>{}};
vm.createContext(a);vm.runInContext(source.slice(source.indexOf('async function login()'),source.indexOf('function mostrarUsuario()',source.indexOf('async function login()'))),a);await a.login();assert(signedOut);assert.equal(rootReads,0);
console.log('PASS admin on normal login is redirected before student lookup/create.');
// Real panel callback accepts administrative auth even without a usuarios document.
class El{constructor(){this.children=[];this.hidden=true;this.value='';this.textContent=''}replaceChildren(){this.children=[]}appendChild(n){this.children.push(n)}append(...n){this.children.push(...n)}addEventListener(){}}
const nodes=new Map();for(const m of fs.readFileSync('correcao_14/painel-pesquisa.html','utf8').matchAll(/\bid="([^"]+)"/g))nodes.set(m[1],new El());let callback,deleted=false;
const adminDoc={id:'admin',data:()=>({ativo:true})},student={id:'student',data:()=>({nome:'Aluno',numeroParticipante:1})};
const p={console,Date,Set,Map,document:{getElementById:id=>nodes.get(id),createElement:()=>new El()},authPesquisa:{currentUser:{uid:'admin'},onAuthStateChanged:f=>callback=f},dbPesquisa:{collection:name=>({doc:()=>({get:async()=>({exists:true,data:()=>({ativo:true})}),delete:async()=>{deleted=true}}),get:async()=>({docs:name==='administradores'?[adminDoc]:[student,{id:'admin',data:()=>({nome:'Admin antigo'})}]})})}};
vm.createContext(p);vm.runInContext(fs.readFileSync('correcao_14/painel-pesquisa.js','utf8'),p);await callback({uid:'admin'});assert.equal(nodes.get('painel').hidden,false);assert(deleted);assert.equal(nodes.get('listaParticipantes').children.length,1);assert(!nodes.get('listaParticipantes').children[0].textContent.includes('Admin antigo'));
console.log('PASS authorized admin opens research without student account; old own rank removed; admin excluded from participant roster.');
})().catch(e=>{console.error(e);process.exit(1)});
