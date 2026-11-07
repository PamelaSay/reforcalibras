'use strict';
let adminAutorizada = false, participantesPainel = [], versaoAcessoPainel = 0, versaoRelatorioPainel = 0;
const elPainel = id => document.getElementById(id);
function statusPainel(texto) { elPainel('status').textContent = texto; }
function limparPainelPrivado() {
    adminAutorizada = false; participantesPainel = []; versaoRelatorioPainel++;
    elPainel('painel').hidden = true;
    elPainel('relatorio').replaceChildren();
    elPainel('listaParticipantes').replaceChildren();
}
function dataPainel(valor) {
    const data = valor && typeof valor.toDate === 'function' ? valor.toDate()
        : typeof valor === 'string' ? new Date(valor) : null;
    return data && !Number.isNaN(data.getTime()) ? data.toLocaleString('pt-BR') : 'Não registrado';
}
function millisPainel(valor) {
    if (valor && typeof valor.toMillis === 'function') return valor.toMillis();
    return Date.parse(valor) || 0;
}
function pontosPainel(r) {
    if (r.acertos !== undefined && Number.isFinite(Number(r.acertos))) return Number(r.acertos)*10;
    if (Array.isArray(r.respostas)) return r.respostas.filter(q=>q.acertou===true).length*10;
    return Number(r.pontuacao)||0;
}
function novoNoPainel(tag,texto,classe) {
    const no = document.createElement(tag);
    if (texto !== undefined) no.textContent = String(texto);
    if (classe) no.className = classe;
    return no;
}
function tabelaPainel(titulo,colunas,linhas) {
    const bloco = novoNoPainel('div'); bloco.appendChild(novoNoPainel('h3',titulo));
    if (!linhas.length) { bloco.appendChild(novoNoPainel('p','Nenhum registro disponível.')); return bloco; }
    const caixa = novoNoPainel('div',undefined,'tabela'), tabela = novoNoPainel('table');
    const cab = novoNoPainel('thead'), tr = novoNoPainel('tr');
    colunas.forEach(c=>tr.appendChild(novoNoPainel('th',c)));cab.appendChild(tr);tabela.appendChild(cab);
    const corpo = novoNoPainel('tbody');
    linhas.forEach(l=>{const linha=novoNoPainel('tr');l.forEach(c=>linha.appendChild(novoNoPainel('td',c)));corpo.appendChild(linha);});
    tabela.appendChild(corpo);caixa.appendChild(tabela);bloco.appendChild(caixa);return bloco;
}
async function conferirAdminPainel() {
    const usuario = auth.currentUser;
    if (!usuario) return false;
    const doc = await db.collection('administradores').doc(usuario.uid).get();
    return doc.exists && doc.data().ativo === true;
}
elPainel('formAcesso').addEventListener('submit',async evento=>{
    evento.preventDefault();statusPainel('Entrando…');
    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth.signInWithEmailAndPassword(elPainel('emailAdmin').value.trim(),elPainel('senhaAdmin').value);
    } catch (erro) { statusPainel('Não foi possível entrar. Confira e-mail e senha.'); }
    finally { elPainel('senhaAdmin').value = ''; }
});
elPainel('sairPainel').addEventListener('click',async()=>{limparPainelPrivado();await auth.signOut();});
auth.onAuthStateChanged(async usuario=>{
    const versao = ++versaoAcessoPainel;
    limparPainelPrivado();elPainel('entrada').hidden = Boolean(usuario);
    if (!usuario) {statusPainel('Entre com a conta administradora.');return;}
    try {
        const permitido = await conferirAdminPainel();
        if (versao !== versaoAcessoPainel) return;
        if (!permitido) {elPainel('entrada').hidden=false;statusPainel('Acesso não autorizado. Use a conta administradora.');return;}
        adminAutorizada = true;elPainel('painel').hidden=false;statusPainel('Carregando participantes…');
        await carregarParticipantesPainel(versao);
    } catch (erro) {if(versao===versaoAcessoPainel){limparPainelPrivado();statusPainel('Não foi possível verificar o acesso. Confira as regras do Firebase.');}}
});
async function carregarParticipantesPainel(versao=versaoAcessoPainel) {
    if (!adminAutorizada) throw new Error('Acesso não autorizado.');
    const consulta = await db.collection('usuarios').get();
    if (!adminAutorizada || versao!==versaoAcessoPainel) return;
    participantesPainel = consulta.docs.map(doc=>({...doc.data(),uid:doc.id}));
    participantesPainel.sort((a,b)=>(a.numeroParticipante||Infinity)-(b.numeroParticipante||Infinity)||millisPainel(a.dataCriacao)-millisPainel(b.dataCriacao));
    renderizarListaPainel();statusPainel(participantesPainel.length+' cadastros. Selecione um para imprimir.');
}
function renderizarListaPainel() {
    const busca = elPainel('buscarParticipante').value.trim().toLocaleLowerCase('pt-BR');
    const lista = elPainel('listaParticipantes');lista.replaceChildren();
    participantesPainel.filter(p=>([p.numeroParticipante,p.nome,p.email].join(' ')).toLocaleLowerCase('pt-BR').includes(busca)).forEach(p=>{
        const botao = novoNoPainel('button',(p.numeroParticipante ? 'Participante '+p.numeroParticipante : 'Sem número')+' — '+(p.nome||'Sem nome'),'participante');
        botao.type='button';botao.addEventListener('click',()=>abrirRelatorioPainel(p.uid));lista.appendChild(botao);
    });
}
elPainel('buscarParticipante').addEventListener('input',renderizarListaPainel);
async function abrirRelatorioPainel(uid) {
    if (!adminAutorizada) return;
    const versao = versaoAcessoPainel, requisicao = ++versaoRelatorioPainel, referencia = db.collection('usuarios').doc(uid);
    elPainel('relatorio').textContent = 'Carregando o participante selecionado…';
    statusPainel('Reunindo cadastro, exercícios e acessos…');
    try {
        const [doc,resultados,acessos,conteudos] = await Promise.all([
            referencia.get(),referencia.collection('resultados').get(),referencia.collection('acessos').get(),referencia.collection('conteudosAcessados').get()
        ]);
        if (!adminAutorizada || versao!==versaoAcessoPainel || requisicao!==versaoRelatorioPainel) return;
        if (!doc.exists) throw new Error('Cadastro não encontrado.');
        const p=doc.data(),r=resultados.docs.map(d=>d.data()).sort((a,b)=>millisPainel(a.realizadoEm)-millisPainel(b.realizadoEm));
        const a=acessos.docs.map(d=>d.data()).sort((a,b)=>millisPainel(a.entrouEm)-millisPainel(b.entrouEm));
        const c=conteudos.docs.map(d=>d.data()).sort((a,b)=>millisPainel(a.acessadoEm)-millisPainel(b.acessadoEm));
        const area=elPainel('relatorio');area.replaceChildren();
        const imprimir=novoNoPainel('button','Imprimir este participante','nao-imprimir');imprimir.type='button';imprimir.addEventListener('click',()=>{if(adminAutorizada)window.print();});area.appendChild(imprimir);
        area.appendChild(novoNoPainel('h2',p.numeroParticipante?'Participante '+p.numeroParticipante:'Participante sem número'));
        const cadastro=novoNoPainel('dl');
        const consentiu = typeof p.consentimentoPesquisa==='boolean'?p.consentimentoPesquisa:p.termosAceitos===true;
        [['Nome',p.nome||'Não informado'],['E-mail',p.email||'Não informado'],['Cadastro criado em',dataPainel(p.dataCriacao)],
         ['Consentimento da pesquisa',consentiu?'Sim':'Não'],['Data do aceite',dataPainel(p.dataAceiteTermos)],
         ['Participar do ranking',p.participarRanking===true?'Sim':'Não'],['Quantidade de acessos',p.quantidadeAcessos===undefined?'Não registrado':p.quantidadeAcessos],
         ['Último acesso',dataPainel(p.ultimoAcesso)],['Atualizado em',dataPainel(p.atualizadoEm)],
         ['Verificações registradas',r.length],['Pontos dos exercícios',r.reduce((s,r)=>s+pontosPainel(r),0)]].forEach(([nome,valor])=>{cadastro.append(novoNoPainel('dt',nome),novoNoPainel('dd',valor));});
        area.appendChild(cadastro);
        area.appendChild(tabelaPainel('Exercícios e pontos',['Data','Temática','Exercício','Acertos','Erros','Pontos','Situação'],r.map(x=>[
            dataPainel(x.realizadoEm),x.tematica||'Não informado',x.nomeModulo||x.modulo||'Não informado',x.acertos===undefined?'Não registrado':x.acertos,
            x.erros===undefined?'Não registrado':x.erros,pontosPainel(x),x.concluido?'Concluído':'Tentativa encerrada'
        ])));
        const questoes=[];r.forEach((x,i)=>(Array.isArray(x.respostas)?x.respostas:[]).forEach(q=>questoes.push([
            i+1,x.nomeModulo||x.modulo||'',q.topico||q.idQuestao||q.id||'',q.respostaSelecionada||q.respostaEscolhida||'',
            q.respostaCorreta||'',q.acertou?'Acertou':'Errou',q.acertou?10:0
        ])));
        area.appendChild(tabelaPainel('Respostas por tentativa',['Tentativa','Exercício','Conteúdo / questão','Resposta dada','Resposta correta','Resultado','Pontos'],questoes));
        area.appendChild(tabelaPainel('Entradas no site',['Entrou em','Origem','Domínio de origem','Primeira página','Dispositivo'],a.map(x=>[
            dataPainel(x.entrouEm),x.origem||'Origem não registrada',x.origemDominio||'Não informado',x.paginaInicial||'Não registrada',
            ['Celular','Tablet','Computador'].includes(x.dispositivo)?x.dispositivo:(x.dispositivo ? tipoDeDispositivoAcesso(x.dispositivo) : 'Não registrado')
        ])));
        const contagem=new Map();c.forEach(x=>{const chave=x.conteudo||x.pagina||'Conteúdo não informado';contagem.set(chave,(contagem.get(chave)||0)+1);});
        area.appendChild(tabelaPainel('Frequência por conteúdo',['Conteúdo','Sessões com acesso'],[...contagem]));
        area.appendChild(tabelaPainel('Conteúdos acessados',['Data','Conteúdo','Origem','Domínio de origem','Página'],c.map(x=>[
            dataPainel(x.acessadoEm),x.conteudo||'Não registrado',x.origem||'Origem não registrada',x.origemDominio||'Não informado',x.pagina||'Não registrada'
        ])));
        statusPainel('Relatório pronto. A impressão inclui somente o participante selecionado.');
    } catch(erro) {if(versao===versaoAcessoPainel)statusPainel('Não foi possível montar o relatório. Confira a conexão e as regras.');}
}
async function organizarCadastrosAntigos() {
    if (!adminAutorizada || !(await conferirAdminPainel())) return;
    const botao=elPainel('organizarCadastros');botao.disabled=true;
    try {
        statusPainel('Organizando numeração e campos antigos. Não feche esta página…');
        const consulta=await db.collection('usuarios').get();
        const documentos=[...consulta.docs].sort((a,b)=>millisPainel(a.data().dataCriacao)-millisPainel(b.data().dataCriacao)||a.id.localeCompare(b.id));
        const controle=db.collection('controle').doc('participantes');
        const maior=documentos.reduce((m,d)=>Math.max(m,Number(d.data().numeroParticipante)||0),0);
        await db.runTransaction(async tx=>{
            const doc=await tx.get(controle),atual=doc.exists?Number(doc.data().ultimo)||0:0;
            if(!doc.exists||atual<maior)tx.set(controle,{ultimo:Math.max(atual,maior)});
        });
        const numeros=new Map();
        for(const documento of documentos) {
            if(!adminAutorizada)throw new Error('Sessão encerrada.');
            const ref=documento.ref;
            const numero=await db.runTransaction(async tx=>{
                const [cadastro,contador]=await Promise.all([tx.get(ref),tx.get(controle)]);
                if(!cadastro.exists)return null;
                const dados=cadastro.data();let numero=dados.numeroParticipante;
                if(!Number.isInteger(numero)||numero<1){numero=(contador.exists?Number(contador.data().ultimo)||0:0)+1;tx.set(controle,{ultimo:numero});}
                const apagar=firebase.firestore.FieldValue.delete;
                const campos={numeroParticipante:numero,consentimentoPesquisa:typeof dados.consentimentoPesquisa==='boolean'?dados.consentimentoPesquisa:dados.termosAceitos===true,
                    atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()};
                for(const campo of ['uid','nivel','media','pontuacaoVersao','termosAceitos','versaoTermos'])if(Object.prototype.hasOwnProperty.call(dados,campo))campos[campo]=apagar();
                tx.set(ref,campos,{merge:true});return numero;
            });
            if(numero===null)continue;numeros.set(documento.id,numero);
            const resultados=await ref.collection('resultados').get();
            const pontos=resultados.empty?Number(documento.data().pontos)||0:resultados.docs.reduce((s,d)=>s+pontosPainel(d.data()),0);
            await ref.set({pontos,jogos:resultados.empty?Number(documento.data().jogos)||0:resultados.size},{merge:true});
            const publico=db.collection('rankingPublico').doc(documento.id);
            if(documento.data().participarRanking===true)await publico.set({ownerUid:documento.id,nome:'Participante '+numero,pontos,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()});
            else await publico.delete();
        }
        // Retirar vínculos internos e nomes completos dos comentários já publicados.
        const comentarios=await db.collection('comentarios').get();
        for(const doc of comentarios.docs){
            if(!adminAutorizada)throw new Error('Sessão encerrada.');
            const dados=doc.data(),lote=db.batch();
            const numero=numeros.get(dados.usuarioId);
            const nome=numero?'Participante '+numero:/^Participante( [0-9]+)?$/.test(dados.nome||'')?dados.nome:'Participante';
            if(dados.usuarioId)lote.set(db.collection('comentariosPrivados').doc(doc.id),{usuarioId:dados.usuarioId,criadoEm:dados.dataCriacao||firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
            const campos={nome};if(Object.prototype.hasOwnProperty.call(dados,'usuarioId'))campos.usuarioId=firebase.firestore.FieldValue.delete();
            lote.update(doc.ref,campos);await lote.commit();
        }
        await carregarParticipantesPainel();statusPainel('Cadastros organizados. Números preservados; dados privados separados dos públicos.');
    } catch(erro){statusPainel('Organização não concluída. Confira a conexão e as regras. Pode executar novamente: os números já atribuídos serão mantidos.');console.error(erro);}
    finally{botao.disabled=false;}
}
elPainel('organizarCadastros').addEventListener('click',organizarCadastrosAntigos);
