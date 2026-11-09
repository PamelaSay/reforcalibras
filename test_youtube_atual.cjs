const fs=require('fs'),vm=require('vm'),assert=require('assert');
const dir='youtube_corrigido/';
const originals='youtube_atual/';
const files=['script.js','curso-potenciacao.js','curso-radiciacao.js','jogo_matematica_potenciacao.js','jogo_matematica_radiciacao.js'];
function extract(source,name){const a=source.indexOf('function '+name+'(');let n=0;for(let b=source.indexOf('{',a);b<source.length;b++){if(source[b]==='{')n++;if(source[b]==='}'&&--n===0)return source.slice(a,b+1);}throw Error(name);}
const id='r9AoQVkUUvU',base='https://www.youtube.com/embed/'+id;
for(const file of files){const code=fs.readFileSync(dir+file,'utf8');const ctx={URL};vm.createContext(ctx);vm.runInContext(extract(code,'normalizarVideoYouTube'),ctx);
 for(const url of [base,'https://youtu.be/'+id,'https://www.youtube.com/watch?v='+id,'https://m.youtube.com/watch?v='+id,'https://www.youtube.com/shorts/'+id])assert(ctx.normalizarVideoYouTube(url).startsWith(base+'?'));
 for(const url of ['','video.mp4','https://example.com/v.mp4','https://youtube.com.example.com/embed/'+id,'https://www.youtube.com@evil.invalid/embed/'+id,'javascript:alert(1)','http://www.youtube.com/embed/'+id,'https://www.youtube.com/embed/invalid','https://www.youtube.com:444/embed/'+id])assert.equal(ctx.normalizarVideoYouTube(url),'');
 assert(ctx.normalizarVideoYouTube(base,true).includes('autoplay=1'));assert(!ctx.normalizarVideoYouTube(base+'?autoplay=1').includes('autoplay'));
 assert(ctx.normalizarVideoYouTube(id,false,true).startsWith(base));
 if(file.startsWith('jogo_')){
  const before=fs.readFileSync(originals+file,'utf8');const properties=s=>(s.match(/\b(?:videoPergunta|videoDica|videoExplicacao)\s*:[^\n]*/g)||[]);
  assert.deepEqual(properties(before),properties(code));
  const functionNames=file.includes('radiciacao')?['salvarResultado','registrarConclusaoNaTrilha']:['verificarResposta','criarResultadoFinal','concluirEtapaDoExercicio'];
  for(const name of functionNames)if(before.includes('function '+name+'('))assert.equal(extract(before,name),extract(code,name));
 }
}
const source=fs.readFileSync(dir+'script.js','utf8');
let handler;
const pending={style:{}},button={dataset:{},addEventListener:(n,f)=>handler=f};
const box={querySelector:s=>s==='.libras-video-pendente'?pending:button};
const frame={dataset:{},style:{},attrs:{src:base},getAttribute(k){return this.attrs[k]},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},closest:()=>box,get src(){return this.attrs.src},set src(v){this.attrs.src=v}};
const root={querySelectorAll:()=>[frame]};
const c={URL,document:root,VIDEOS_LIBRAS_INTERFACE:{alerta:base,'excluir-conta':'https://www.youtube.com/embed/AnEFltlubiM'},escaparHtml:s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};vm.createContext(c);
for(const name of ['normalizarVideoYouTube','montarConteudoAlertaLibras','prepararVideosLibras','pararVideosInterface'])vm.runInContext(extract(source,name),c);
const html=c.montarConteudoAlertaLibras('Texto do aviso');assert(html.includes('<iframe'));assert(!html.includes('<video'));assert(!html.includes('video/mp4'));assert(html.includes(base));
assert(c.montarConteudoAlertaLibras('Excluir','excluir-conta').includes('AnEFltlubiM'));
c.prepararVideosLibras(root);assert.equal(frame.hidden,false);assert.equal(pending.style.display,'none');assert.equal(button.hidden,false);handler();assert(frame.src.includes('autoplay=1'));c.pararVideosInterface(root);assert(!frame.src.includes('autoplay=1'));
frame.attrs.src='https://example.com/not-youtube';c.prepararVideosLibras(root);assert(frame.hidden);assert.equal(frame.style.display,'none');assert(!('src'in frame.attrs));assert(button.hidden);
// Account, ranking and deletion logic must remain identical to the uploaded source.
const before=fs.readFileSync(originals+'script.js','utf8');
const semMedia=s=>s.replace(/ pararVideosInterface\(modal(?:Login|Cadastro|Termos)\);/g,'').replace(/,\n\s*willClose: function \(popup\) \{ pararVideosInterface\(popup\); \}/g,'');
for(const name of ['cadastrar','excluirConta','iniciarSessaoAdministrativaDeTeste','traduzirErroFirebase'])assert.equal(extract(before,name),semMedia(extract(source,name)),name);
console.log('PASS: YouTube-only URL normalization; rejected MP4/foreign/malicious URLs; iframe notices; replay/stop/invalid states; existing custom video preserved; question video links and scoring/progress unchanged; account/deletion logic unchanged.');
