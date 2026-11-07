/* Dados privados da conta e origem. Não armazena URL externa completa, IP ou userAgent. */
function novoIdentificadorAcesso() {
    return typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID() : Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
}
function identificarOrigemAcesso(endereco, referencia, dominioAtual) {
    const pagina = new URL(endereco);
    const marcada = pagina.searchParams.get('origem');
    if (marcada === 'youtube') return { origem: 'YouTube', origemDominio: 'youtube.com', identificacaoOrigem: 'link identificado' };
    if (marcada === 'reforca') return { origem: 'Reforça Libras', origemDominio: dominioAtual, identificacaoOrigem: 'link identificado' };
    try {
        if (referencia) {
            const dominio = new URL(referencia).hostname.toLowerCase();
            if (dominio === 'youtube.com' || dominio.endsWith('.youtube.com') || dominio === 'youtu.be') {
                return { origem: 'YouTube', origemDominio: dominio, identificacaoOrigem: 'navegador' };
            }
            if (dominio === dominioAtual || ['reforcalibras.com.br','www.reforcalibras.com.br'].includes(dominio)) {
                return { origem: 'Reforça Libras', origemDominio: dominio, identificacaoOrigem: 'navegador' };
            }
            return { origem: 'Outro site', origemDominio: dominio, identificacaoOrigem: 'navegador' };
        }
    } catch (erro) { /* Origem desconhecida não é adivinhada. */ }
    return { origem: 'Acesso direto ou origem não identificada', origemDominio: '', identificacaoOrigem: 'não informada' };
}
function tipoDeDispositivoAcesso(agente) {
    if (!agente) return 'Não identificado';
    if (/ipad|tablet/i.test(agente)) return 'Tablet';
    if (/mobi|android|iphone/i.test(agente)) return 'Celular';
    return 'Computador';
}
function nomeConteudoAcesso(caminho, consulta) {
    const arquivo = caminho.split('/').pop() || 'index.html';
    const nomes = {
        'index.html': 'Início', 'matematica.html': 'Temáticas de Matemática',
        'comentarios.html': 'Comentários', 'potenciacao.html': 'Trilha de Potenciação',
        'radiciacao.html': 'Trilha de Radiciação',
        'jogo_potenciacao_revisao_multiplicacao.html': 'Exercício: Revisão da multiplicação',
        'jogo_potenciacao.html': 'Exercício: Base, expoente e potência',
        'jogo_potenciacao_casos_especiais.html': 'Exercício: Casos especiais',
        'jogo_potenciacao_base_10.html': 'Exercício: Potências de base 10',
        'jogo_potenciacao_propriedades.html': 'Exercício: Propriedades da potenciação',
        'jogo_matematica_radiciacao.html': new URLSearchParams(consulta).get('modulo') === 'propriedades'
            ? 'Exercício: Propriedades da radiciação' : 'Exercício: Introdução à radiciação'
    };
    return nomes[arquivo] || 'Página do Reforça Libras';
}
function prepararOrigemDaPagina() {
    const url = new URL(window.location.href);
    const navegacao = typeof performance !== 'undefined' && performance.getEntriesByType
        ? performance.getEntriesByType('navigation')[0] : null;
    const recarga = navegacao && navegacao.type === 'reload';
    const origem = identificarOrigemAcesso(url.href, document.referrer, url.hostname);
    let sessao;
    try { sessao = JSON.parse(sessionStorage.getItem('reforcaSessaoPrivada')); } catch (erro) {}
    const externa = origem.origem === 'YouTube' || origem.origem === 'Outro site';
    const agora = Date.now();
    if (!sessao || agora - Number(sessao.ultimaAtividade) > 30 * 60 * 1000 || (externa && !recarga)) {
        sessao = { id: novoIdentificadorAcesso(), paginaInicial: url.pathname,
            ...origem, dispositivo: tipoDeDispositivoAcesso(navigator.userAgent) };
    }
    sessao.ultimaAtividade = agora;
    sessionStorage.setItem('reforcaSessaoPrivada', JSON.stringify(sessao));
    const conteudo = nomeConteudoAcesso(url.pathname, url.search);
    // Marca por sessão+conteúdo: recarregar a página não aumenta a contagem.
    const chaveConteudo = encodeURIComponent(conteudo).replace(/%/g,'_');
    const dados = { sessao, pagina: url.pathname, conteudo, chaveConteudo,
        ...origem, dispositivo: tipoDeDispositivoAcesso(navigator.userAgent) };
    if (url.searchParams.has('origem')) {
        url.searchParams.delete('origem');
        window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
    return dados;
}
const CONTEXTO_ACESSO = window.location.pathname.endsWith('painel-pesquisa.html') ? null : prepararOrigemDaPagina();
async function contaAdministradora(uid) {
    const doc = await db.collection('administradores').doc(uid).get();
    return doc.exists && doc.data().ativo === true;
}
async function garantirNumeroParticipante(uid) {
    if (!auth.currentUser || auth.currentUser.uid !== uid) return null;
    const usuario = db.collection('usuarios').doc(uid);
    const contador = db.collection('controle').doc('participantes');
    return db.runTransaction(async transacao => {
        const documento = await transacao.get(usuario);
        if (!documento.exists) return null;
        const atual = documento.data();
        if (Number.isInteger(atual.numeroParticipante) && atual.numeroParticipante > 0) return atual.numeroParticipante;
        const controle = await transacao.get(contador);
        const numero = (controle.exists ? Number(controle.data().ultimo) || 0 : 0) + 1;
        transacao.set(contador, { ultimo: numero });
        transacao.set(usuario, { numeroParticipante: numero }, { merge: true });
        return numero;
    });
}
async function normalizarCamposDaConta(uid) {
    const referencia = db.collection('usuarios').doc(uid);
    const documento = await referencia.get();
    if (!documento.exists) return;
    const dados = documento.data(), apagar = firebase.firestore.FieldValue.delete;
    const alteracoes = {};
    for (const campo of ['uid','nivel','media','pontuacaoVersao','termosAceitos','versaoTermos']) {
        if (Object.prototype.hasOwnProperty.call(dados,campo)) alteracoes[campo] = apagar();
    }
    if (typeof dados.consentimentoPesquisa !== 'boolean') alteracoes.consentimentoPesquisa = dados.termosAceitos === true;
    if (Object.keys(alteracoes).length) {
        alteracoes.atualizadoEm = firebase.firestore.FieldValue.serverTimestamp();
        await referencia.update(alteracoes);
    }
}
async function registrarAcessoPrivado(usuarioFirebase) {
    if (!usuarioFirebase || !auth.currentUser || auth.currentUser.uid !== usuarioFirebase.uid) return;
    // Não conta entradas no painel administrativo como uso do produto por alunos.
    if (window.location.pathname.endsWith('painel-pesquisa.html')) return;
    const uid = usuarioFirebase.uid;
    if (await contaAdministradora(uid)) return registrarAcessoTesteAdministrativo(usuarioFirebase);
    await garantirNumeroParticipante(uid);
    await normalizarCamposDaConta(uid);
    const usuario = db.collection('usuarios').doc(uid);
    const entrada = usuario.collection('acessos').doc(CONTEXTO_ACESSO.sessao.id);
    const conteudo = usuario.collection('conteudosAcessados').doc(CONTEXTO_ACESSO.sessao.id + '_' + CONTEXTO_ACESSO.chaveConteudo);
    await db.runTransaction(async transacao => {
        const cadastro = await transacao.get(usuario);
        if (!cadastro.exists) return;
        const entrou = await transacao.get(entrada);
        const abriu = await transacao.get(conteudo);
        if (entrou.exists && abriu.exists) return;
        const data = firebase.firestore.FieldValue.serverTimestamp();
        const campos = { ultimoAcesso: data };
        if (!entrou.exists) {
            campos.quantidadeAcessos = firebase.firestore.FieldValue.increment(1);
            const s = CONTEXTO_ACESSO.sessao;
            transacao.set(entrada, { entrouEm: data, paginaInicial: s.paginaInicial,
                origem: s.origem, origemDominio: s.origemDominio,
                identificacaoOrigem: s.identificacaoOrigem, dispositivo: s.dispositivo });
        }
        if (!abriu.exists) {
            campos.quantidadeConteudosAcessados = firebase.firestore.FieldValue.increment(1);
            transacao.set(conteudo, { acessadoEm: data, pagina: CONTEXTO_ACESSO.pagina,
                conteudo: CONTEXTO_ACESSO.conteudo, origem: CONTEXTO_ACESSO.origem,
                origemDominio: CONTEXTO_ACESSO.origemDominio,
                identificacaoOrigem: CONTEXTO_ACESSO.identificacaoOrigem,
                dispositivo: CONTEXTO_ACESSO.dispositivo });
        }
        transacao.set(usuario, campos, { merge: true });
    });
}
function nomePublicoDoRanking(nome) {
    const partes = String(nome || '').trim().split(/\s+/).filter(Boolean);
    // Nome ausente ou e-mail usado como nome não é publicado como endereço de contato.
    if (!partes.length || partes.some(p => p.includes('@'))) return 'Usuário';
    return partes.length === 1 ? partes[0].slice(0,120)
        : partes[0].slice(0,59) + ' ' + partes[partes.length-1].slice(0,59);
}
async function publicarRankingSeguro(uid, pontos) {
    if (await contaAdministradora(uid)) { await db.collection('rankingPublico').doc(uid).delete(); return; }
    const referencia = db.collection('usuarios').doc(uid);
    const documento = await referencia.get();
    if (!documento.exists) return;
    const dados = documento.data();
    const publico = db.collection('rankingPublico').doc(uid);
    if (dados.participarRanking === false) { await publico.delete(); return; }
    const numero = await garantirNumeroParticipante(uid);
    await publico.set({ ownerUid: uid, nome: nomePublicoDoRanking(dados.nome),
        pontos: Math.max(0,Number(pontos)||0), atualizadoEm: firebase.firestore.FieldValue.serverTimestamp() });
}
if (typeof auth !== 'undefined' && auth && typeof db !== 'undefined' && db) {
    auth.onAuthStateChanged(usuario => {
        if (usuario) registrarAcessoPrivado(usuario).catch(erro => console.error('Não foi possível registrar acesso privado:',erro));
    });
}
async function enviarComentarioComPrivacidade(texto, nota) {
    if (typeof db === 'undefined' || !db) throw new Error('Banco indisponível.');
    const usuario = typeof auth !== 'undefined' && auth ? auth.currentUser : null;
    const numero = usuario ? await garantirNumeroParticipante(usuario.uid) : null;
    const publico = db.collection('comentarios').doc();
    const lote = db.batch();
    lote.set(publico, { nome: numero ? 'Participante ' + numero : 'Participante',
        nota, texto, dataCriacao: firebase.firestore.FieldValue.serverTimestamp() });
    if (usuario) lote.set(db.collection('comentariosPrivados').doc(publico.id), {
        usuarioId: usuario.uid, criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
    await lote.commit();
}
async function excluirComentariosDaConta(uid) {
    // Privados primeiro são lidos; apagar o público antes do vínculo privado no lote.
    const consulta = await db.collection('comentariosPrivados').where('usuarioId','==',uid).get();
    for (let i = 0; i < consulta.docs.length; i += 150) {
        const lote = db.batch();
        consulta.docs.slice(i,i+150).forEach(doc => {
            lote.delete(db.collection('comentarios').doc(doc.id)); lote.delete(doc.ref);
        });
        await lote.commit();
    }
}

function dadosDoTesteAdministrativo(usuario) {
    return {nome:usuario.displayName || 'Administradora',email:usuario.email || '',
        administrativa:true,tipoRegistro:'teste_administracao',naoIncluirNaPesquisa:true,participarRanking:false,consentimentoPesquisa:false};
}
async function registrarAcessoTesteAdministrativo(usuario) {
    if(!CONTEXTO_ACESSO || !auth.currentUser || auth.currentUser.uid!==usuario.uid)return;
    const raiz=db.collection('testesAdministracao').doc(usuario.uid),s=CONTEXTO_ACESSO.sessao;
    const entrada=raiz.collection('acessos').doc(s.id);
    const conteudo=raiz.collection('conteudosAcessados').doc(s.id+'_'+CONTEXTO_ACESSO.chaveConteudo);
    await db.runTransaction(async tx=>{
        const [cadastro,entrou,abriu]=await Promise.all([tx.get(raiz),tx.get(entrada),tx.get(conteudo)]);
        const data=firebase.firestore.FieldValue.serverTimestamp();
        const campos={...dadosDoTesteAdministrativo(usuario),ultimoAcesso:data,atualizadoEm:data};
        if(!cadastro.exists)campos.dataCriacao=data;
        if(!entrou.exists){campos.quantidadeAcessos=firebase.firestore.FieldValue.increment(1);tx.set(entrada,{entrouEm:data,paginaInicial:s.paginaInicial,origem:s.origem,origemDominio:s.origemDominio,identificacaoOrigem:s.identificacaoOrigem,dispositivo:s.dispositivo});}
        if(!abriu.exists){campos.quantidadeConteudosAcessados=firebase.firestore.FieldValue.increment(1);tx.set(conteudo,{acessadoEm:data,pagina:CONTEXTO_ACESSO.pagina,conteudo:CONTEXTO_ACESSO.conteudo,origem:CONTEXTO_ACESSO.origem,origemDominio:CONTEXTO_ACESSO.origemDominio,dispositivo:CONTEXTO_ACESSO.dispositivo});}
        tx.set(raiz,campos,{merge:true});
    });
    if(typeof enviarPendenciasAdministracao==='function')await enviarPendenciasAdministracao(usuario.uid);
}
async function registrarConteudoTesteAdministrativo(nome) {
    if(!auth.currentUser||!CONTEXTO_ACESSO||!(await contaAdministradora(auth.currentUser.uid)))return;
    const usuario=auth.currentUser;await registrarAcessoTesteAdministrativo(usuario);
    const raiz=db.collection('testesAdministracao').doc(usuario.uid);
    const ref=raiz.collection('conteudosAcessados').doc(CONTEXTO_ACESSO.sessao.id+'_'+encodeURIComponent(nome).replace(/%/g,'_'));
    await db.runTransaction(async tx=>{
        const doc=await tx.get(ref);if(doc.exists)return;
        const data=firebase.firestore.FieldValue.serverTimestamp();
        tx.set(ref,{conteudo:nome,pagina:CONTEXTO_ACESSO.pagina,acessadoEm:data,origem:CONTEXTO_ACESSO.origem,origemDominio:CONTEXTO_ACESSO.origemDominio,dispositivo:CONTEXTO_ACESSO.dispositivo});
        tx.set(raiz,{ultimoAcesso:data,atualizadoEm:data,quantidadeConteudosAcessados:firebase.firestore.FieldValue.increment(1)},{merge:true});
    });
}

async function registrarAulaAssistidaTesteAdministrativo(tema, numero) {
    if(!auth.currentUser||!(await contaAdministradora(auth.currentUser.uid)))return;
    const usuario=auth.currentUser;await registrarAcessoTesteAdministrativo(usuario);
    const raiz=db.collection('testesAdministracao').doc(usuario.uid),ref=raiz.collection('aulasAssistidas').doc(tema+'_'+numero);
    await db.runTransaction(async tx=>{
        const doc=await tx.get(ref);if(doc.exists)return;
        const agora=firebase.firestore.FieldValue.serverTimestamp();
        tx.set(ref,{tema,numero,assistidaEm:agora});
        tx.set(raiz,{aulas:firebase.firestore.FieldValue.increment(1),atualizadoEm:agora},{merge:true});
    });
}
