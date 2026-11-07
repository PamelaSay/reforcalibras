const fs=require('fs'),vm=require('vm'),assert=require('assert');
function storage(){const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),m};}
(async()=>{
for(const [tema,total] of [['potenciacao',5],['radiciacao',4]]){
 const local=storage(),session=storage(),listeners={},cards=[];let popup,choice={dismiss:'cancel'},route='',scroll=0;
 const location={};Object.defineProperty(location,'href',{set:v=>route=v});
 const ctx={console,localStorage:local,sessionStorage:session,window:{location,addEventListener:(n,f)=>listeners[n]=f},
  document:{body:{style:{}},addEventListener(){},getElementById:()=>null,createElement:()=>({}),querySelectorAll:s=>s==='.etapa-curso'?cards:[],querySelector:s=>{
   const n=Number((s.match(/data-etapa="(\d+)"/)||[])[1]);if(n)return s.includes('.btn-jogo')?cards[n-1].button:cards[n-1];return null;
  }},YT:{PlayerState:{ENDED:0}},Swal:{DismissReason:{cancel:'cancel'},fire:async options=>{popup=options;return choice;}}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('correcao_16/storage-utils.js','utf8'),ctx);
 for(let n=1;n<=total;n++)cards.push({dataset:{etapa:String(n)},status:{textContent:''},classes:new Map(),classList:{toggle(k,v){cards[n-1].classes.set(k,v);}},querySelector(){return this.status;},scrollIntoView:()=>scroll++,button:{scrollIntoView:()=>scroll++,click:()=>ctx.abrirTeste(n,'jogo-'+n+'.html')}});
 vm.runInContext(fs.readFileSync('correcao_16/curso-'+tema+'.js','utf8'),ctx);
 const titulo=tema[0].toUpperCase()+tema.slice(1),key='progressoCurso'+titulo+'_visitante';
 ctx.atualizarCursoNaTela();assert(cards[1].classes.get('bloqueada'));
 ctx.abrirTeste(1,'jogo-1.html');assert.equal(route,'');
 ctx.registrarAulaAssistida(total);assert.equal(ctx.obterProgressoCurso().aulasAssistidas.length,0);
 for(let n=1;n<=total;n++){
  choice=n===3?{isConfirmed:true}:{dismiss:'cancel'};
  vm.runInContext('etapaVideoAtual='+n,ctx);
  ctx.verificarEstadoDoVideo({data:1});assert(!ctx.obterProgressoCurso().aulasAssistidas.includes(n));
  ctx.verificarEstadoDoVideo({data:0});await Promise.resolve();await Promise.resolve();
  assert.equal(popup.title,'Videoaula concluída!');assert.equal(popup.cancelButtonText,'Fazer depois');assert(popup.html.includes('videoAlertaVideoaula'));
  let p=ctx.obterProgressoCurso();assert.equal(p.etapaLiberada,Math.min(n+1,total));assert(p.verificacoesPendentes.includes(n));
  if(n===3){assert.equal(route,'jogo-3.html');assert.equal(session.getItem('testeCursoAtual'),'3');ctx['concluirEtapa'+titulo](3);}
  p=ctx.obterProgressoCurso();assert.equal(p.concluidas.length,n>=3?1:0);
  if(n>=3){assert(p.verificacoesPendentes.includes(1));assert(p.verificacoesPendentes.includes(2));assert(!p.verificacoesPendentes.includes(3));}
 }
 assert.equal(ctx.obterProgressoCurso().etapaLiberada,total);assert.equal(cards[1].status.textContent,'AULA 2 · VERIFICAÇÃO PENDENTE');assert(cards[2].status.textContent.includes('CONCLUÍDA'));
 route='';ctx.abrirTeste(2,'pendente2.html');assert.equal(route,'pendente2.html');
 const snapshot=local.getItem(key);listeners.pageshow();assert.equal(local.getItem(key),snapshot);
 // Repair an old lock without marking any pending exercise complete.
 local.setItem(key,JSON.stringify({versao:2,etapaLiberada:1,aulasAssistidas:[1,'2',2,3,999],concluidas:[1]}));listeners.pageshow();
 assert.equal(ctx.obterProgressoCurso().etapaLiberada,4);assert.deepEqual(Array.from(ctx.obterProgressoCurso().verificacoesPendentes),[2,3]);
 assert.equal(cards[3].classes.get('bloqueada'),false);
 // Scope is evaluated on every operation, including a restored tab after account change.
 local.setItem('usuarioLogado',JSON.stringify({uid:'aluno2'}));listeners.storage({key:'usuarioLogado'});
 assert.equal(ctx.obterProgressoCurso().etapaLiberada,1);assert(cards[1].classes.get('bloqueada'));
 ctx.registrarAulaAssistida(1);assert(local.getItem('progressoCurso'+titulo+'_aluno2'));assert.equal(JSON.parse(local.getItem(key)).etapaLiberada,4);
 console.log('PASS '+tema+': video end + defer/verify branches, every next lesson, independent pending exercises, old locks, refresh/back, account isolation.');
}
const local=storage(),session=storage(),ctx={localStorage:local,sessionStorage:session};vm.createContext(ctx);vm.runInContext(fs.readFileSync('correcao_16/storage-utils.js','utf8'),ctx);
for(const suffix of ['','_u1','_visitante','_u2'])local.setItem('progressoCursoPotenciacao'+suffix,'old');
local.setItem('usuarioLogado','u1');session.setItem('testeCursoAtual','3');local.setItem('resultadosPendentesRanking_u1','old');
ctx.limparDadosLocaisDaContaExcluida('u1');assert.equal(local.getItem('progressoCursoPotenciacao_u2'),'old');
for(const key of ['progressoCursoPotenciacao','progressoCursoPotenciacao_u1','progressoCursoPotenciacao_visitante','usuarioLogado','resultadosPendentesRanking_u1'])assert.equal(local.getItem(key),null);
assert.equal(session.getItem('testeCursoAtual'),null);
console.log('PASS confirmed account deletion cleanup: account and guest trail state cleared, other accounts preserved.');
})().catch(e=>{console.error(e);process.exit(1)});
