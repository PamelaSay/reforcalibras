function chaveLocalDoUsuario(chaveBase) {
    let usuario = null;

    try {
        usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (erro) {
        usuario = null;
    }

    const identificador = usuario && usuario.uid
        ? usuario.uid
        : "visitante";
    const chaveIndividual = chaveBase + "_" + identificador;

    // Migra uma única vez os dados das versões antigas do site.
    if (
        localStorage.getItem(chaveIndividual) === null &&
        localStorage.getItem(chaveBase) !== null
    ) {
        localStorage.setItem(
            chaveIndividual,
            localStorage.getItem(chaveBase)
        );
        localStorage.removeItem(chaveBase);
    }

    return chaveIndividual;
}

// Exclusão confirmada da conta: remove também o estado de visitante deste dispositivo.
function limparDadosLocaisDaContaExcluida(uid) {
    const bases = ['progressoCursoPotenciacao','progressoCursoRadiciacao',
        'resultadosPotenciacao','resultadosJogoPotenciacao','resultadosRadiciacao',
        'modulosJogoPotenciacaoConcluidos','modulosJogoRadiciacaoConcluidos'];
    for (const base of bases) {
        localStorage.removeItem(base);
        localStorage.removeItem(base + '_' + uid);
        localStorage.removeItem(base + '_visitante');
    }
    localStorage.removeItem('resultadosPendentesRanking_' + uid);
    localStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('testeCursoAtual');
    sessionStorage.removeItem('testeSendoRefeito');
}
