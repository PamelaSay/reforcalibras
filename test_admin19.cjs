const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
const rows=new Map(),stored=new Map();let stamp=100;
const snapshot=path=>({exists:rows.has(path),data:()=>rows.get(path)});
function ref(path){return {path,collection:c=>collection(path+'/'+c),get:async()=>path.startsWith('administradores/')?{exists:true,data:()=>({ativo:path.endsWith('/admin')})}:snapshot(path)};}
function collection(path){return {doc:id=>ref(path+'/'+id),get:async()=>{const docs=[...rows].filter(([k])=>k.startsWith(path+'/')&&!k.slice(path.length+1).includes('/')).map(([k,v])=>({id:k.split('/').pop(),data:()=>v}));return {docs,size:docs.length};}};}
const db={collection,runTransaction:async f=>{const updates=[];await f({get:async r=>snapshot(r.path),set:(r,v,opts)=>updates.push([r.path,v,opts]),update:(r,v)=>updates.push([r.path,v,{merge:true}])});for(const [path,v,opts]of updates){const old=rows.get(path)||{},next=opts?.merge?{...old}:{};for(const [k,x] of Object.entries(v))next[k]=x&&x.inc?(Number(old[k])||0)+x.inc:x;rows.set(path,next);}}};
const ctx={console,Math,Date,JSON,Map,Set,URL,URLSearchParams,encodeURIComponent,crypto:require('crypto').webcrypto,db,auth:{currentUser:{uid:'admin',email:'admin@example.invalid'},onAuthStateChanged(){}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},window:{location:{pathname:'/index.html'}},CONTEXTO_ACESSO:{sessao:{id:'s1',origem:'Acesso direto',origemDominio:'',paginaInicial:'/index.html',dispositivo:'Computador'},pagina:'/index.html',conteudo:'Início',chaveConteudo:'inicio',origem:'Acesso direto',origemDominio:'',dispositivo:'Computador'},firebase:{firestore:{FieldValue:{serverTimestamp:()=>++stamp,increment:n=>({inc:n})}}}};
vm.createContext(ctx);
let acessos=fs.readFileSync('correcao_19/acessos-conta.js','utf8');const start=acessos.indexOf('async function registrarAcessoPrivado('),end=acessos.indexOf('function nomePublicoDoRanking(',start),helpers=acessos.indexOf('function dadosDoTesteAdministrativo(');
vm.runInContext(acessos.slice(start,end)+'\n'+acessos.slice(helpers),ctx);ctx.contaAdministradora=async uid=>uid==='admin';
vm.runInContext(fs.readFileSync('correcao_19/pontuacao-utils.js','utf8'),ctx);
await ctx.registrarAcessoPrivado(ctx.auth.currentUser);await ctx.registrarAcessoPrivado(ctx.auth.currentUser);
assert.equal(rows.get('testesAdministracao/admin').quantidadeAcessos,1);assert.equal(rows.get('testesAdministracao/admin').quantidadeConteudosAcessados,1);
await ctx.registrarConteudoTesteAdministrativo('Videoaula aberta: Potenciação — Aula 2');assert.equal(rows.get('testesAdministracao/admin').quantidadeConteudosAcessados,2);
await ctx.registrarAulaAssistidaTesteAdministrativo('potenciacao',2);await ctx.registrarAulaAssistidaTesteAdministrativo('potenciacao',2);assert.equal(rows.get('testesAdministracao/admin').aulas,1);
const notas=[90,100,100,80];for(let i=0;i<notas.length;i++){const r={idResultado:'r'+i,modulo:'m'+i,tematica:'Potenciação',acertos:notas[i]/10,respostas:[{acertou:true,respostaSelecionada:'A'}],realizadoEm:'2026-11-07T12:00:00Z'};await ctx.salvarResultadoComPontuacao(r);await ctx.salvarResultadoComPontuacao(r);}
assert.equal(rows.get('testesAdministracao/admin').pontos,370);assert.equal(rows.get('testesAdministracao/admin').jogos,4);
await ctx.salvarResultadoComPontuacao({idResultado:'retry',modulo:'m0',tematica:'Potenciação',acertos:5,realizadoEm:'2026-11-07T13:00:00Z'});assert.equal(rows.get('testesAdministracao/admin').pontos,330);assert.equal(rows.get('testesAdministracao/admin').jogos,5);
await ctx.salvarResultadoComPontuacao({idResultado:'old',modulo:'m0',tematica:'Potenciação',acertos:10,realizadoEm:'2026-11-07T11:00:00Z'});assert.equal(rows.get('testesAdministracao/admin').pontos,330);
assert([...rows.keys()].every(p=>p.startsWith('testesAdministracao/')));
assert.equal(rows.get('testesAdministracao/admin').participarRanking,false);assert.equal(rows.get('testesAdministracao/admin').naoIncluirNaPesquisa,true);
function no(tag,text){return {tag,text,children:[],append(...items){this.children.push(...items);},appendChild(item){this.children.push(item);},replaceChildren(){this.children=[];},addEventListener(){}};}
const area=no('section');ctx.adminAutorizada=true;ctx.versaoAcessoPainel=1;ctx.versaoRelatorioPainel=0;ctx.dbPesquisa=db;ctx.elPainel=()=>area;ctx.statusPainel=()=>{};ctx.novoNoPainel=no;ctx.dataPainel=x=>String(x||'Não registrado');ctx.millisPainel=x=>Date.parse(x)||0;ctx.pontosPainel=ctx.pontosDoResultado;ctx.textoPerfilComunidade=()=> 'Não informado';ctx.tabelaPainel=(title,columns,lines)=>({title,columns,lines});
const panel=fs.readFileSync('correcao_19/painel-pesquisa.js','utf8');vm.runInContext(panel.slice(panel.indexOf('async function abrirRelatorioPainel('),panel.indexOf('async function organizarCadastrosAntigos(')),ctx);await ctx.abrirRelatorioPainel('admin',true);
assert(area.children.some(n=>n.text==='Administradora — testes'));assert(area.children.some(n=>n.title==='Videoaulas assistidas até o fim'&&n.lines.length===1));
const dados=area.children.find(n=>n.tag==='dl');assert(dados.children.some(n=>n.text===330));
const count=rows.size;ctx.auth.currentUser={uid:'aluno'};await ctx.salvarResultadoAdministrativo({});assert.equal(rows.size,count);
console.log('PASS: admin access/content tracking, session idempotency, full private results, latest-score sum 370, retries 330, old retry preserved as history, no student/ranking writes, non-admin rejected.');
})().catch(e=>{console.error(e);process.exit(1)});
