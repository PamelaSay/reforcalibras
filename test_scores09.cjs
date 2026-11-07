const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
 const users=new Map([['u',{nome:'Pamela',pontos:0}]]),results=new Map(),store={usuarioLogado:JSON.stringify({uid:'u',nome:'Pamela'})};
 function userRef(uid){return {uid,collection:()=>({doc:id=>({set:async r=>{results.set(uid+'/'+id,r)}}),get:async()=>({forEach:fn=>{for(const [k,v]of results)if(k.startsWith(uid+'/'))fn({data:()=>v})}})})};}
 const c={console,Date,Math,auth:{currentUser:{uid:'u'}},firebase:{firestore:{FieldValue:{serverTimestamp:()=>1}}},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},chaveLocalDoUsuario:k=>k+'_u'};
 c.db={collection:()=>({doc:userRef}),runTransaction:async fn=>fn({get:async ref=>({exists:users.has(ref.uid),data:()=>users.get(ref.uid)}),set:(ref,v)=>users.set(ref.uid,{...users.get(ref.uid),...v})})};c.publicarRankingSeguro=async()=>{};vm.createContext(c);vm.runInContext(fs.readFileSync('correcao_09/pontuacao-utils.js','utf8'),c);
 const r1={idResultado:'r1',modulo:'revisaoMultiplicacao',acertos:10,pontuacao:116,percentual:100},r2={idResultado:'r2',modulo:'potenciacao',acertos:10,pontuacao:116,percentual:100};
 await c.salvarResultadoComPontuacao(r1);assert.equal(users.get('u').pontos,100);await c.salvarResultadoComPontuacao(r2);assert.equal(users.get('u').pontos,200);
 await c.salvarResultadoComPontuacao(r2);assert.equal(users.get('u').pontos,200);assert.equal(results.size,2);
 store.resultadosPotenciacao_u=JSON.stringify([r1]);store.resultadosJogoPotenciacao_u=JSON.stringify([r1,r2]);assert.equal(c.lerHistoricoDePontos('Potenciacao').length,2);
 await c.sincronizarPontuacaoDaConta('u');assert.equal(users.get('u').pontos,200);assert.equal(JSON.parse(store.usuarioLogado).pontos,200);
 await c.salvarResultadoComPontuacao({idResultado:'r3',acertos:9,pontuacao:999,percentual:90});assert.equal(users.get('u').pontos,290);
 console.log('PASS cloud sum 100+100=200; idempotent retry; profile refresh no duplication; legacy aliases deduplicated; 9 correct=90.');
 // Ranking: real function with ordered mock accounts and minimal DOM.
 let nodes=[];c.document={getElementById:()=>({replaceChildren:()=>nodes=[],appendChild:n=>nodes.push(n)}),createElement:()=>({})};c.obterUsuarioLocal=()=>({uid:'u'});
 c.db.collection=()=>({orderBy:(field,order)=>{assert.equal(field,'pontos');assert.equal(order,'desc');return {get:async()=>({forEach:fn=>[['a',500],['b',400],['c',300],['d',200],['u',100]].forEach(([id,pontos])=>fn({id,data:()=>({nome:id,pontos})}))})}}});
 const script=fs.readFileSync('correcao_09/script.js','utf8');vm.runInContext(script.slice(script.indexOf('async function atualizarRankingPublico()'),script.indexOf('// SAIR',script.indexOf('async function atualizarRankingPublico()'))).replace(/\/\/ =+\s*$/,''),c);
 await c.atualizarRankingPublico();assert.equal(nodes.length,4);assert(nodes[3].textContent.includes('5º'));assert(nodes[3].textContent.includes('(você)'));console.log('PASS ranking top three plus own 5th position.');
 for(const topic of ['potenciacao','radiciacao']){
 const buttons={querySelectorAll:()=>[]},base={console,document:{addEventListener:()=>{}},window:{},URLSearchParams};vm.createContext(base);vm.runInContext(fs.readFileSync(`correcao_09/jogo_matematica_${topic}.js`,'utf8'),base);
 const pot=topic==='potenciacao';const setup=pot?`moduloAtual='revisaoMultiplicacao';pontos=0;vidas=3;sequenciaAcertos=0;resultadosDaPartida=[];questoesDaPartida=Array(12).fill({id:'q',correta:'sim',alternativasEmbaralhadas:[]});elementos.alternativas={querySelectorAll:()=>[]};atualizarStatus=()=>{};mostrarExplicacao=async()=>{};mostrarQuestao=()=>{};finalizarPartida=()=>{};`:`pontos=0;vidas=3;sequencia=0;resultados=[];questoes=Array(12).fill({id:'q',correta:'sim'});el.alternativas={querySelectorAll:()=>[]};atualizarStatus=()=>{};alertaExplicacao=async()=>{};mostrarQuestao=()=>{};finalizar=()=>{};`;
 vm.runInContext(setup+`;globalThis.setQuestion=i=>{${pot?'indiceQuestao=i;respostaBloqueada=false;dicaUtilizada=true;':'indice=i;bloqueado=false;dicaUsada=true;'}};globalThis.score=()=>pontos;`,base);
 for(let i=0;i<10;i++){base.setQuestion(i);await base.verificarResposta('sim',{});assert.equal(base.score(),(i+1)*10);}
 base.setQuestion(10);await base.verificarResposta('não',{});assert.equal(base.score(),100);console.log('PASS '+topic+': 10,20,30…100, with hint; wrong answer adds zero.');
 }
})().catch(e=>{console.error(e);process.exit(1)});
