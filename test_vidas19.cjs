const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('correcao_19/jogo_matematica_potenciacao.js','utf8');
function func(nome){const start=src.indexOf('function '+nome+'(');let braces=0,begin=src.indexOf('{',start),end=begin;for(;end<src.length;end++){if(src[end]==='{')braces++;if(src[end]==='}'&&--braces===0)break;}return (src.slice(start-6,start)==='async '?'async ':'')+src.slice(start,end+1);}
(async()=>{
let terminou=null,mostrou=0;const hearts=[];
const ctx={console,Math,TOTAL_VIDAS:3,vidas:3,pontos:0,sequenciaAcertos:0,indiceQuestao:0,respostaBloqueada:false,moduloAtual:'revisaoMultiplicacao',dicaUtilizada:false,resultadosDaPartida:[],questoesDaPartida:Array.from({length:10},(_,id)=>({id,correta:'A',alternativasEmbaralhadas:['A','B']})),elementos:{alternativas:{querySelectorAll:()=>[]},vidas:{replaceChildren:()=>hearts.length=0,appendChild:n=>hearts.push(n)}},document:{createElement:()=>({setAttribute(){}})},mostrarExplicacao:async()=>{},finalizarPartida:concluiu=>terminou=concluiu,mostrarQuestao:()=>mostrou++};
vm.createContext(ctx);vm.runInContext(func('atualizarVidas')+'\n'+func('verificarResposta'),ctx);ctx.atualizarStatus=()=>ctx.atualizarVidas();
for(let n=1;n<=3;n++){ctx.respostaBloqueada=false;await ctx.verificarResposta('B',null);assert.equal(ctx.vidas,3-n);assert.equal(hearts.filter(x=>x.textContent==='🩶').length,n);assert.equal(ctx.pontos,0);await ctx.verificarResposta('B',null);assert.equal(ctx.vidas,3-n);}
assert.equal(terminou,false);assert.equal(mostrou,2);
ctx.vidas=3;ctx.respostaBloqueada=false;ctx.indiceQuestao=0;await ctx.verificarResposta('A',null);assert.equal(ctx.vidas,3);assert.equal(ctx.pontos,10);
for(const modulo of ['potenciacao','casosEspeciais','baseDez','propriedades']){ctx.moduloAtual=modulo;ctx.vidas=3;ctx.respostaBloqueada=false;await ctx.verificarResposta('B',null);assert.equal(ctx.vidas,2);}
// Losing the last life on question 10 must not overwrite failure as completion.
let saved,completed=0;
const final={partidaFinalizada:false,moduloAtual:'revisaoMultiplicacao',resultadosDaPartida:Array(10).fill({}),questoesDaPartida:Array(10).fill({}),pararVideoPrincipal(){},identificarResultado:r=>r,criarResultadoFinal:concluido=>({concluido}),salvarResultadoLocal:r=>saved=r,marcarModuloConcluido:()=>completed++,concluirEtapaDoExercicio:()=>completed++,salvarResultadoFirebase(){},obterEtapaDoModuloAtual:()=>1,ETAPAS_DOS_EXERCICIOS:{revisaoMultiplicacao:[1]},montarConteudoResultado:()=>'',prepararTraducaoResultado(){},Swal:{fire:async()=>({}),DismissReason:{cancel:'cancel'}},document:{getElementById:()=>null},pontos:0};
// Supply only external presentation helpers read by the real result function.
final.obterEtapaDoExercicio=()=>1;
vm.createContext(final);vm.runInContext(func('finalizarPartida'),final);
try{await final.finalizarPartida(false);}catch(e){if(!saved)throw e;throw e;}
assert.equal(saved.concluido,false);assert.equal(completed,0);
console.log('PASS: wrong answer loses one heart; duplicate click ignored; three mistakes end the game; correct answer adds 10 with no life loss; other modules consistent; last-question life loss does not complete the lesson.');
})().catch(e=>{console.error(e);process.exit(1)});
