const OPCOES_PERFIL_COMUNIDADE = {
    pessoa_surda: 'Pessoa surda', deficiencia_auditiva: 'Pessoa com deficiência auditiva',
    pessoa_surdocega: 'Pessoa surdocega', coda: 'Pessoa CODA — ouvinte, filha(o) de pais surdos',
    pessoa_ouvinte: 'Pessoa ouvinte', familiar: 'Familiar de pessoa surda', professor: 'Professor(a)',
    interprete: 'Tradutor(a) ou intérprete de Libras', estudante_libras: 'Estudante de Libras',
    prefiro_nao_informar: 'Prefiro não informar'
};
function valorPerfilComunidade(valor) {
    return Object.prototype.hasOwnProperty.call(OPCOES_PERFIL_COMUNIDADE,valor) ? valor : null;
}
function textoPerfilComunidade(valor) {
    return OPCOES_PERFIL_COMUNIDADE[valorPerfilComunidade(valor)] || 'Não informado';
}
function lerRespostaComunidade() {
    const campo = document.getElementById('perfilComunidade');
    return campo ? valorPerfilComunidade(campo.value) : null;
}
async function carregarIdentificacaoComunidade() {
    const campo = document.getElementById('perfilComunidadeEdicao');
    const status = document.getElementById('statusPerfilComunidade');
    if (!campo || !status || !auth || !auth.currentUser) return;
    const uid = auth.currentUser.uid;
    try {
        const doc = await db.collection('usuarios').doc(uid).get();
        if (!auth.currentUser || auth.currentUser.uid !== uid || !doc.exists) return;
        const dados = doc.data();
        campo.value = valorPerfilComunidade(dados.perfilComunidade) || '';
        const consentiu = typeof dados.consentimentoPesquisa === 'boolean' ? dados.consentimentoPesquisa : dados.termosAceitos === true;
        campo.disabled = !consentiu;
        document.getElementById('salvarPerfilComunidade').disabled = !consentiu;
        status.textContent = consentiu
            ? dados.perfilComunidade ? 'Resposta privada: ' + textoPerfilComunidade(dados.perfilComunidade) : 'Essa informação não foi registrada. Se desejar, complete sua resposta.'
            : 'Esta informação é opcional e só é registrada para quem aceitou participar da pesquisa.';
    } catch (erro) { status.textContent = 'Não foi possível carregar essa informação agora.'; }
}
async function salvarIdentificacaoComunidade() {
    const campo = document.getElementById('perfilComunidadeEdicao'),status=document.getElementById('statusPerfilComunidade');
    if (!campo || !status || !auth.currentUser) return;
    const uid=auth.currentUser.uid,ref=db.collection('usuarios').doc(uid),valor=valorPerfilComunidade(campo.value);
    try {
        await db.runTransaction(async tx=>{
            const doc=await tx.get(ref);
            if(!doc.exists || !auth.currentUser || auth.currentUser.uid!==uid) throw new Error('Sessão indisponível.');
            const dados=doc.data(),consentiu=typeof dados.consentimentoPesquisa==='boolean'?dados.consentimentoPesquisa:dados.termosAceitos===true;
            if(!consentiu)throw new Error('Sem consentimento para pesquisa.');
            tx.set(ref,{perfilComunidade:valor,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
        });
        if(auth.currentUser && auth.currentUser.uid===uid)status.textContent='Resposta salva: '+textoPerfilComunidade(valor)+'. Essa informação não aparece no ranking.';
    }catch(erro){status.textContent='Não foi possível salvar. Confira a conexão e o consentimento da pesquisa.';}
}
