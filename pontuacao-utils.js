// Regra única: cada acerto vale 10 pontos; erro e dica não alteram o valor.
function pontosDoResultado(resultado) {
    if (resultado.acertos !== undefined && Number.isFinite(Number(resultado.acertos))) {
        return Math.max(0, Number(resultado.acertos)) * 10;
    }
    if (Array.isArray(resultado.respostas)) {
        return resultado.respostas.filter(r => r.acertou === true).length * 10;
    }
    // Histórico antigo sem quantidade de acertos: preservar o valor registrado.
    return Math.max(0, Number(resultado.pontuacao) || 0);
}
function identificarResultado(resultado) {
    if (!resultado.idResultado) {
        resultado.idResultado = "tentativa_" + (
            typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID() : Date.now() + "_" + Math.random().toString(36).slice(2)
        );
    }
    resultado.pontuacao = pontosDoResultado(resultado);
    return resultado;
}
function lerHistoricoDePontos(tematica) {
    const bases = tematica === "Potenciacao"
        ? ["resultadosPotenciacao", "resultadosJogoPotenciacao"]
        : ["resultadosRadiciacao"];
    const vistos = new Set(), historico = [];
    for (const base of bases) {
        try {
            const dados = JSON.parse(localStorage.getItem(chaveLocalDoUsuario(base))) || [];
            if (!Array.isArray(dados)) continue;
            for (const resultado of dados) {
                const chave = resultado.idResultado || JSON.stringify([
                    resultado.jogo, resultado.modulo, resultado.realizadoEm,
                    resultado.acertos, resultado.totalRespondido
                ]);
                if (vistos.has(chave)) continue;
                vistos.add(chave);
                historico.push({ ...resultado, pontuacao: pontosDoResultado(resultado) });
            }
        } catch (erro) { console.error("Erro no histórico local:", erro); }
    }
    return historico;
}
function chavePendenciasRanking(uid) { return "resultadosPendentesRanking_" + uid; }
function lerPendenciasRanking(uid) {
    try {
        const valor = JSON.parse(localStorage.getItem(chavePendenciasRanking(uid))) || [];
        return Array.isArray(valor) ? valor : [];
    } catch (erro) { return []; }
}
async function salvarResultadoComPontuacao(resultado) {
    if (typeof auth === "undefined" || typeof db === "undefined" || !auth || !db || !auth.currentUser) return;
    const uid = auth.currentUser.uid;
    identificarResultado(resultado);
    const pendentes = lerPendenciasRanking(uid);
    if (!pendentes.some(r => r.idResultado === resultado.idResultado)) pendentes.push(resultado);
    localStorage.setItem(chavePendenciasRanking(uid), JSON.stringify(pendentes));
    return enviarPendenciasRanking(uid);
}
async function enviarPendenciasRanking(uid) {
    if (!auth.currentUser || auth.currentUser.uid !== uid) return;
    for (const resultado of lerPendenciasRanking(uid)) {
        if (!auth.currentUser || auth.currentUser.uid !== uid) return;
        // Mesmo ID na repetição do envio: não soma a mesma tentativa duas vezes.
        await db.collection("usuarios").doc(uid).collection("resultados")
            .doc(resultado.idResultado).set({
                ...resultado, pontuacao: pontosDoResultado(resultado),
                realizadoEm: firebase.firestore.FieldValue.serverTimestamp()
            });
        const restantes = lerPendenciasRanking(uid).filter(r => r.idResultado !== resultado.idResultado);
        localStorage.setItem(chavePendenciasRanking(uid), JSON.stringify(restantes));
    }
    return sincronizarPontuacaoDaConta(uid);
}
async function sincronizarPontuacaoDaConta(uid) {
    if (!auth.currentUser || auth.currentUser.uid !== uid) return null;
    const usuarioRef = db.collection("usuarios").doc(uid);
    const consulta = await usuarioRef.collection("resultados").get();
    let pontos = 0, somaPercentuais = 0, comPercentual = 0, jogos = 0;
    consulta.forEach(doc => {
        const r = doc.data(); jogos++;
        pontos += pontosDoResultado(r);
        if (r.percentual !== undefined && Number.isFinite(Number(r.percentual))) {
            somaPercentuais += Number(r.percentual); comPercentual++;
        }
    });
    const resumo = { pontos, jogos, media: comPercentual ? Math.round(somaPercentuais / comPercentual) : 0 };
    const salvo = await db.runTransaction(async transacao => {
        const documento = await transacao.get(usuarioRef);
        const atual = documento.exists ? documento.data() : {};
        // Não zerar um saldo antigo cuja origem não está mais no histórico.
        if (jogos === 0 || (atual.pontuacaoVersao === 2 && Number(atual.jogos) > jogos)) {
            return { pontos: Number(atual.pontos) || 0, jogos: Number(atual.jogos) || 0, media: Number(atual.media) || 0 };
        }
        transacao.set(usuarioRef, {
            ...resumo, pontuacaoVersao: 2,
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return resumo;
    });
    try {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuario && usuario.uid === uid) {
            Object.assign(usuario, salvo);
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        }
    } catch (erro) { console.error("Erro ao atualizar resumo local:", erro); }
    return salvo;
}
