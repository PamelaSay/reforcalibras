const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
let docs=new Map(),account={pontos:730,jogos:8},store={usuarioLogado:JSON.stringify({uid:'u',nome:'Pamela'})};
const ctx={console,Date,Math,Map,Set,auth:{currentUser:{uid:'u'}},firebase:{firestore:{FieldValue:{serverTimestamp:()=>1}}},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},publicarRankingSeguro:async(uid,pontos)=>{ctx.ranking=pontos}};
const userRef={collection:()=>({get:async()=>({forEach:f=>docs.forEach((r,id)=>f({id,data:()=>r}))})})};
ctx.db={collection:()=>({doc:()=>userRef}),runTransaction:async f=>f({get:async()=>({exists:true,data:()=>({...account})}),set:(ref,v)=>{account={...account,...v}}})};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('correcao_10/pontuacao-utils.js','utf8'),ctx);
const modulos=['revisaoMultiplicacao','potenciacao','casosEspeciais','baseDez'];
const anteriores=[90,100,90,80],ultimas=[90,100,100,80];
for(let i=0;i<4;i++){
 docs.set('old'+i,{tematica:'Potenciação',modulo:modulos[i],acertos:anteriores[i]/10,pontuacao:anteriores[i],realizadoEm:'2026-11-06T10:00:00Z'});
 docs.set('new'+i,{tematica:'Potenciação',modulo:modulos[i],acertos:ultimas[i]/10,pontuacao:ultimas[i],realizadoEm:'2026-11-07T10:00:00Z'});
}
assert.equal([...docs.values()].reduce((s,r)=>s+r.pontuacao,0),730);let resumo=await ctx.sincronizarPontuacaoDaConta('u');assert.equal(resumo.pontos,370);assert.equal(account.pontos,370);assert.equal(ctx.ranking,370);assert.equal(resumo.jogos,8);assert.equal(docs.size,8);
await ctx.sincronizarPontuacaoDaConta('u');assert.equal(account.pontos,370);
docs.set('low',{tematica:'Potenciação',modulo:'potenciacao',acertos:5,realizadoEm:'2026-11-07T11:00:00Z'});await ctx.sincronizarPontuacaoDaConta('u');assert.equal(account.pontos,320);
// Identical module names in different themes must not replace one another.
docs.set('prop-pot',{tematica:'Potenciação',modulo:'propriedades',acertos:7,realizadoEm:'2026-11-07T10:00:00Z'});docs.set('prop-rad',{tematica:'Radiciação',modulo:'propriedades',acertos:6,realizadoEm:'2026-11-07T11:00:00Z'});await ctx.sincronizarPontuacaoDaConta('u');assert.equal(account.pontos,450);
assert.equal(ctx.ultimosResultadosDosExercicios([...docs.values()]).length,6);
const tie=[{idResultado:'b',tematica:'Potenciação',modulo:'x',acertos:7,realizadoEm:{seconds:100,nanoseconds:5}},{idResultado:'a',tematica:'Potenciação',modulo:'x',acertos:8,realizadoEm:{seconds:100,nanoseconds:5}}];assert.equal(ctx.somarUltimasNotas(tie),70);assert.equal(ctx.somarUltimasNotas([...tie].reverse()),70);
console.log('PASS: 730 history -> 370 latest grades; remote account/ranking updated; all attempts retained; refresh stable; lower retry replaces higher; themes separate; ties deterministic.');
const stub={document:{referrer:'',title:'Site'},window:{location:new URL('https://reforcalibras.com.br/'),history:{replaceState:()=>{}}},navigator:{userAgent:'Mobile'},performance:{getEntriesByType:()=>[]},sessionStorage:{getItem:()=>null,setItem:()=>{}},console,URL,URLSearchParams,Date,Math,encodeURIComponent};vm.createContext(stub);vm.runInContext(fs.readFileSync('correcao_10/acessos-conta.js','utf8'),stub);assert.equal(stub.nomePublicoDoRanking('Pamela Mendonça Sayão'),'Pamela Sayão');assert.equal(stub.nomePublicoDoRanking('  Ana   Maria  de Souza  '),'Ana Souza');assert.equal(stub.nomePublicoDoRanking('Pamela'),'Pamela');assert.equal(stub.nomePublicoDoRanking('nome@email.test'),'Usuário');console.log('PASS public name: first + last, middle names removed, whitespace normalized, e-mail not published.');
})().catch(e=>{console.error(e);process.exit(1)});
