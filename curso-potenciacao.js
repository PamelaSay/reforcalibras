// ==========================================
// CONFIGURAÇÕES DO CURSO
// ==========================================

const CHAVE_CURSO = chaveLocalDoUsuario("progressoCursoPotenciacao");
const TOTAL_ETAPAS = 5;
const VIDEO_ALERTA_VIDEOAULA =
    "https://www.youtube.com/embed/r9AoQVkUUvU";

let playerVideoaula = null;
let etapaVideoAtual = null;
let apiYouTubePronta = false;
let videoTerminou = false;


// ==========================================
// PROGRESSO INICIAL
// ==========================================

function progressoInicial() {
    return {
        versao: 2,
        etapaLiberada: 1,
        aulasAssistidas: [],
        concluidas: []
    };
}


// ==========================================
// RECUPERAR PROGRESSO
// ==========================================

function obterProgressoCurso() {
    try {
        const salvo =
            localStorage.getItem(CHAVE_CURSO);

        const progresso = salvo
            ? JSON.parse(salvo)
            : progressoInicial();

        /* Reinicia apenas o progresso antigo de quatro etapas. */
        if (progresso.versao !== 2) {
            const novoProgresso = progressoInicial();
            salvarProgressoCurso(novoProgresso);
            return novoProgresso;
        }

        progresso.etapaLiberada =
            Number(progresso.etapaLiberada) || 1;

        progresso.aulasAssistidas =
            Array.isArray(progresso.aulasAssistidas)
                ? progresso.aulasAssistidas.map(Number)
                : [];

        progresso.concluidas =
            Array.isArray(progresso.concluidas)
                ? progresso.concluidas.map(Number)
                : [];

        return progresso;

    } catch (erro) {
        console.error(
            "Erro ao recuperar o progresso:",
            erro
        );

        return progressoInicial();
    }
}


// ==========================================
// SALVAR PROGRESSO
// ==========================================

function salvarProgressoCurso(progresso) {
    localStorage.setItem(
        CHAVE_CURSO,
        JSON.stringify(progresso)
    );
}


// ==========================================
// REGISTRAR VIDEOAULA ASSISTIDA
// ==========================================

function registrarAulaAssistida(numero) {
    const progresso = obterProgressoCurso();

    if (
        !progresso.aulasAssistidas.includes(numero)
    ) {
        progresso.aulasAssistidas.push(numero);

        progresso.aulasAssistidas.sort(
            function (a, b) {
                return a - b;
            }
        );
    }

    salvarProgressoCurso(progresso);
    atualizarCursoNaTela();
}


// ==========================================
// ATUALIZAR OS CARDS
// ==========================================

function atualizarCursoNaTela() {
    const progresso = obterProgressoCurso();

    const cards =
        document.querySelectorAll(".etapa-curso");

    cards.forEach(function (card) {
        const numero =
            Number(card.dataset.etapa);

        const situacao =
            card.querySelector(".situacao");

        const aulaAssistida =
            progresso.aulasAssistidas.includes(numero);

        const concluida =
            progresso.concluidas.includes(numero);

        const liberada =
            numero <= progresso.etapaLiberada;

        card.classList.toggle(
            "bloqueada",
            !liberada
        );

        card.classList.toggle(
            "concluida",
            concluida
        );

        card.classList.toggle(
            "aula-assistida",
            aulaAssistida && !concluida
        );

        if (!situacao) {
            return;
        }

        if (concluida) {
            situacao.textContent =
                "AULA " +
                numero +
                " · CONCLUÍDA ✓";

        } else if (!liberada) {
            situacao.textContent =
                "AULA " +
                numero +
                " · BLOQUEADA";

        } else if (aulaAssistida) {
            situacao.textContent =
                "AULA " +
                numero +
                " · TESTE DISPONÍVEL";

        } else {
            situacao.textContent =
                "AULA " +
                numero +
                " · DISPONÍVEL";
        }
    });

    atualizarBarraCurso(progresso);
}


// ==========================================
// ATUALIZAR BARRA
// ==========================================

function atualizarBarraCurso(progresso) {
    const quantidade =
        progresso.concluidas.length;

    const porcentagem = Math.round(
        (quantidade / TOTAL_ETAPAS) * 100
    );

    const texto =
        document.getElementById(
            "porcentagemCurso"
        );

    const barra =
        document.getElementById(
            "barraCurso"
        );

    const resumo =
        document.getElementById(
            "resumoCurso"
        );

    if (texto) {
        texto.textContent =
            porcentagem + "%";
    }

    if (barra) {
        barra.style.width =
            porcentagem + "%";
    }

    if (resumo) {
        resumo.textContent =
            quantidade +
            " de " +
            TOTAL_ETAPAS +
            " etapas concluídas";
    }
}


// ==========================================
// API DO YOUTUBE PRONTA
// ==========================================

function onYouTubeIframeAPIReady() {
    apiYouTubePronta = true;
}


// ==========================================
// VALIDAR ID DO VÍDEO
// ==========================================

function videoIdValido(videoId) {
    return Boolean(
        videoId &&
        !videoId.startsWith("ID_DO_") &&
        /^[a-zA-Z0-9_-]{11}$/.test(videoId)
    );
}


// ==========================================
// ABRIR VIDEOAULA
// ==========================================

function abrirVideoaula(numero, videoId) {
    const progresso =
        obterProgressoCurso();

    /*
     * Bloqueia somente aulas que ainda
     * não foram liberadas.
     *
     * Aulas concluídas continuam podendo
     * ser assistidas novamente.
     */

    if (
        numero >
        progresso.etapaLiberada
    ) {
        mostrarMensagem(
            "Etapa bloqueada",
            "Conclua o teste anterior para liberar esta videoaula.",
            "warning"
        );

        return;
    }

    if (!videoIdValido(videoId)) {
        mostrarMensagem(
            "Vídeo indisponível",
            "O vídeo desta aula ainda não foi cadastrado.",
            "info"
        );

        return;
    }

    if (
        typeof YT !== "undefined" &&
        YT.Player
    ) {
        apiYouTubePronta = true;
    }

    if (!apiYouTubePronta) {
        mostrarMensagem(
            "Aguarde um instante",
            "O player do vídeo ainda está carregando.",
            "info"
        );

        return;
    }

    const modal =
        document.getElementById(
            "modalVideoaula"
        );

    const titulo =
        document.getElementById(
            "tituloVideoaula"
        );

    const aviso =
        document.querySelector(
            ".aviso-videoaula"
        );

    if (!modal || !titulo) {
        console.error(
            "O modal da videoaula não foi encontrado."
        );

        return;
    }

    etapaVideoAtual = numero;

    titulo.textContent =
        "Aula " +
        numero +
        " — Potenciação;

    if (aviso) {
        const aulaJaConcluida =
            progresso.concluidas.includes(
                numero
            );

        aviso.textContent =
            aulaJaConcluida
                ? "Revisão da videoaula."
                : "Assista ao vídeo até o final para liberar o teste de conhecimento.";
    }

    modal.classList.add("aberto");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    prepararAreaDoPlayer();

    playerVideoaula = new YT.Player(
        "playerVideoaula",
        {
            videoId: videoId,

            playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
                playsinline: 1
            },

            events: {
                onStateChange:
                    verificarEstadoDoVideo,

                onError:
                    tratarErroDoVideo
            }
        }
    );
}

// ==========================================
// ALERTA COM TRADUÇÃO EM LIBRAS
// ==========================================

function conteudoAlertaComLibras(texto) {
    return `
        <div style="display:grid;gap:12px;text-align:left;">
            <div style="padding:12px;background:#f2fbff;border-left:5px solid #5fa8d3;border-radius:12px;">
                ${texto}
            </div>

            <iframe
                id="videoAlertaVideoaula"
                src="${VIDEO_ALERTA_VIDEOAULA}?rel=0&modestbranding=1"
                title="Tradução do alerta da videoaula em Libras"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="width:100%;height:260px;background:#000;border:2px solid #5fa8d3;border-radius:14px;"
            ></iframe>

            <button
                id="repetirAlertaVideoaula"
                type="button"
                style="width:100%;min-height:40px;padding:8px 12px;background:#dff4ff;color:#1d3557;border:2px solid #5fa8d3;border-radius:12px;font-weight:900;cursor:pointer;"
            >
                ↻ Repetir tradução em Libras
            </button>
        </div>
    `;
}

function ativarVideoDoAlerta() {
    const video = document.getElementById(
        "videoAlertaVideoaula"
    );

    const botao = document.getElementById(
        "repetirAlertaVideoaula"
    );

    if (!video || !botao) return;

    botao.addEventListener("click", function () {
        video.src = "";

        setTimeout(function () {
            video.src =
                VIDEO_ALERTA_VIDEOAULA +
                "?rel=0&modestbranding=1&autoplay=1";
        }, 100);
    });
}

function pararVideoDoAlerta() {
    const video = document.getElementById(
        "videoAlertaVideoaula"
    );

    if (video) video.src = "";
}

// ==========================================
// VERIFICAR FINAL DO VÍDEO
// ==========================================
function verificarEstadoDoVideo(evento) {
    if (
        evento.data !==
        YT.PlayerState.ENDED
    ) {
        return;
    }

    if (etapaVideoAtual === null) {
        return;
    }

    const etapaAssistida =
        etapaVideoAtual;

    const progresso =
        obterProgressoCurso();

    const aulaJaConcluida =
        progresso.concluidas.includes(
            etapaAssistida
        );

    const botaoTeste =
        document.querySelector(
            '.etapa-curso[data-etapa="' +
            etapaAssistida +
            '"] .btn-jogo'
        );

    /*
     * Registra que o vídeo foi assistido.
     * Se já estava registrado, não duplica.
     */

    registrarAulaAssistida(
        etapaAssistida
    );

    fecharModalVideoaula();

    /* A revisão da multiplicação é uma etapa preparatória. */
    if (etapaAssistida === 1) {
        if (!aulaJaConcluida) {
            concluirEtapaPotenciacao(1);
        }

        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "success",
                title: aulaJaConcluida
                    ? "Revisão concluída!"
                    : "Preparação concluída!",
                html: conteudoAlertaComLibras(
                    aulaJaConcluida
                        ? "Você terminou de rever a multiplicação."
                        : "A revisão da multiplicação foi concluída. A Aula 2 está liberada."
                ),
                confirmButtonText: "Continuar trilha",
                confirmButtonColor: "#1d3557",
                allowOutsideClick: false,
                customClass: {
                    popup: "alerta-reforca"
                },
                didOpen: ativarVideoDoAlerta,
                willClose: pararVideoDoAlerta
            });
        } else {
            alert(
                "Preparação concluída!\n\n" +
                "A Aula 2 está liberada."
            );
        }

        return;
    }

    /*
     * FLUXO DE REVISÃO:
     * a aula já havia sido concluída.
     */

    if (aulaJaConcluida) {
        if (
            typeof Swal !== "undefined"
        ) {
            Swal.fire({
                icon: "success",

                title:
                    "Revisão concluída!",

                html:
                    conteudoAlertaComLibras(
                        "Você terminou de rever esta videoaula."
                    ),

                showCancelButton: true,

                confirmButtonText:
                    "Voltar à trilha",

                cancelButtonText:
                    "Refazer verificação",

                confirmButtonColor:
                    "#1d3557",

                cancelButtonColor:
                    "#5fa8d3",

                allowOutsideClick: false,

                customClass: {
                    popup: "alerta-reforca"
                },

                didOpen:
                    ativarVideoDoAlerta,

                willClose:
                    pararVideoDoAlerta
            }).then(
                function (resultado) {
                    if (
                        resultado.dismiss ===
                        Swal.DismissReason.cancel
                    ) {
                        abrirTesteNovamente(
                            etapaAssistida,
                            botaoTeste
                        );
                    }
                }
            );

            return;
        }

        const refazer =
            confirm(
                "Revisão concluída!\n\n" +
                "Deseja refazer a verificação?"
            );

        if (refazer) {
            abrirTesteNovamente(
                etapaAssistida,
                botaoTeste
            );
        }

        return;
    }

    /*
     * PRIMEIRO ACESSO:
     * pergunta se quer fazer o teste.
     */

    if (typeof Swal !== "undefined") {
        Swal.fire({
            icon: "success",

            title:
                "Videoaula concluída!",

            html:
                conteudoAlertaComLibras(
                    "Deseja fazer agora a verificação de conhecimento desta aula?"
                ),

            showCancelButton: true,

            confirmButtonText:
                "Fazer verificação",

            cancelButtonText:
                "Fazer depois",

            confirmButtonColor:
                "#1d3557",

            cancelButtonColor:
                "#5fa8d3",

            allowOutsideClick: false,

            customClass: {
                popup: "alerta-reforca"
            },

            didOpen:
                ativarVideoDoAlerta,

            willClose:
                pararVideoDoAlerta
        }).then(
            function (resultado) {
                if (
                    resultado.isConfirmed &&
                    botaoTeste
                ) {
                    botaoTeste.click();

                    return;
                }

                if (botaoTeste) {
                    botaoTeste.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }
        );

        return;
    }

    const continuar =
        confirm(
            "Videoaula concluída!\n\n" +
            "Deseja fazer agora a verificação?"
        );

    if (
        continuar &&
        botaoTeste
    ) {
        botaoTeste.click();
    }
}
// ==========================================
// ERRO DO YOUTUBE
// ==========================================

function tratarErroDoVideo(evento) {
    console.error(
        "Erro do YouTube:",
        evento.data
    );

    fecharModalVideoaula();

    mostrarMensagem(
        "Não foi possível abrir o vídeo",
        "Confira se o vídeo permite reprodução em outros sites.",
        "error"
    );
}


// ==========================================
// RECRIAR ÁREA DO PLAYER
// ==========================================

function prepararAreaDoPlayer() {
    if (playerVideoaula) {
        try {
            playerVideoaula.destroy();
        } catch (erro) {
            console.warn(
                "O player anterior já estava fechado."
            );
        }
    }

    playerVideoaula = null;

    const area =
        document.querySelector(
            ".videoaula-player"
        );

    if (area) {
        area.innerHTML =
            '<div id="playerVideoaula"></div>';
    }
}


// ==========================================
// FECHAR MODAL
// ==========================================

function fecharModalVideoaula() {
    const modal =
        document.getElementById(
            "modalVideoaula"
        );

    if (modal) {
        modal.classList.remove("aberto");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    document.body.style.overflow = "";

    prepararAreaDoPlayer();

    etapaVideoAtual = null;
    videoTerminou = false;
}


// ==========================================
// ABRIR TESTE
// ==========================================

function abrirTeste(numero, destino) {
    const progresso =
        obterProgressoCurso();

    if (
        numero >
        progresso.etapaLiberada
    ) {
        mostrarMensagem(
            "Etapa bloqueada",
            "Conclua o teste anterior para liberar esta etapa.",
            "warning"
        );

        return;
    }

    if (
        !progresso.aulasAssistidas.includes(
            numero
        )
    ) {
        mostrarMensagem(
            "Assista primeiro à aula",
            "O teste será liberado quando o vídeo terminar.",
            "warning"
        );

        return;
    }

    if (
        !destino ||
        destino === "#" ||
        destino.includes("youtube.com") ||
        destino.includes("youtu.be")
    ) {
        mostrarMensagem(
            "Teste indisponível",
            "O jogo desta etapa ainda não foi cadastrado.",
            "info"
        );

        return;
    }

    sessionStorage.setItem(
        "testeCursoAtual",
        String(numero)
    );

    window.location.href =
        destino;
}

// ==========================================
// ABRIR NOVAMENTE
// ==========================================

function abrirTesteNovamente(
    numero,
    botaoTeste
) {
    if (!botaoTeste) {
        mostrarMensagem(
            "Teste indisponível",
            "O jogo desta aula ainda não foi cadastrado.",
            "info"
        );

        return;
    }

    const destino =
        botaoTeste.getAttribute(
            "href"
        );

    if (
        !destino ||
        destino === "#" ||
        destino.includes(
            "youtube.com"
        ) ||
        destino.includes(
            "youtu.be"
        )
    ) {
        mostrarMensagem(
            "Teste indisponível",
            "O jogo desta aula ainda não foi cadastrado.",
            "info"
        );

        return;
    }

    sessionStorage.setItem(
        "testeCursoAtual",
        String(numero)
    );

    sessionStorage.setItem(
        "testeSendoRefeito",
        "true"
    );

    window.location.href =
        destino;
}

// ==========================================
// CONFIGURAR LINKS
// ==========================================

function configurarLinksDoCurso() {
    const links =
        document.querySelectorAll(
            ".etapa-curso a[data-acao]"
        );

    links.forEach(function (link) {
        link.addEventListener(
            "click",
            function (evento) {
                evento.preventDefault();

                const card =
                    link.closest(
                        ".etapa-curso"
                    );

                if (!card) {
                    return;
                }

                const numero =
                    Number(
                        card.dataset.etapa
                    );

                const tipo =
                    link.dataset.acao;

                if (tipo === "aula") {
                    abrirVideoaula(
                        numero,
                        link.dataset.videoId || ""
                    );
                }

                if (tipo === "teste") {
                    abrirTeste(
                        numero,
                        link.getAttribute("href")
                    );
                }
            }
        );
    });
}


// ==========================================
// REGISTRAR TESTE CONCLUÍDO
// ==========================================

function concluirEtapaPotenciacao(numero) {
    numero = Number(numero);

    if (
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > TOTAL_ETAPAS
    ) {
        return;
    }

    const progresso =
        obterProgressoCurso();

    if (
        !progresso.concluidas.includes(
            numero
        )
    ) {
        progresso.concluidas.push(
            numero
        );

        progresso.concluidas.sort(
            function (a, b) {
                return a - b;
            }
        );
    }

    progresso.etapaLiberada =
        Math.min(
            TOTAL_ETAPAS,
            Math.max(
                progresso.etapaLiberada,
                numero + 1
            )
        );

    salvarProgressoCurso(progresso);
    atualizarCursoNaTela();
    atualizarAcompanhamentoDaTrilha();
}


// ==========================================
// ALERTAS
// ==========================================

function mostrarMensagem(
    titulo,
    texto,
    icone
) {
    if (
        typeof Swal !== "undefined"
    ) {
        return Swal.fire({
            icon: icone,
            title: titulo,
            html: conteudoAlertaComLibras(texto),
            confirmButtonColor:
                "#1d3557",
            confirmButtonText:
                "OK",
            allowOutsideClick: false,
            customClass: {
                popup: "alerta-reforca"
            },
            didOpen: ativarVideoDoAlerta,
            willClose: pararVideoDoAlerta
        });
    }

    alert(
        titulo +
        "\n\n" +
        texto
    );

    return Promise.resolve();
}


// ==========================================
// BOTÃO VOLTAR
// ==========================================

function voltarPagina() {
    if (
        document.referrer &&
        document.referrer !==
        window.location.href
    ) {
        window.history.back();

        return;
    }

    window.location.href =
        "matematica.html";
}


// ==========================================
// INICIAR PÁGINA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {
        atualizarCursoNaTela();
        configurarLinksDoCurso();
        atualizarAcompanhamentoDaTrilha();
        configurarJanelaLibrasDaTrilha();

        const fechar =
            document.getElementById(
                "fecharVideoaula"
            );

        const modal =
            document.getElementById(
                "modalVideoaula"
            );

        if (fechar) {
            fechar.addEventListener(
                "click",
                fecharModalVideoaula
            );
        }

        if (modal) {
            modal.addEventListener(
                "click",
                function (evento) {
                    if (
                        evento.target === modal
                    ) {
                        fecharModalVideoaula();
                    }
                }
            );
        }

        document.addEventListener(
            "keydown",
            function (evento) {
                if (
                    evento.key === "Escape" &&
                    modal &&
                    modal.classList.contains(
                        "aberto"
                    )
                ) {
                    fecharModalVideoaula();
                }
            }
        );
    }
);
// ==========================================
// RELATÓRIO GERAL DA POTENCIAÇÃO
// ==========================================

const NOMES_DAS_ETAPAS = {
    1: "Revisão da multiplicação",
    2: "Base e expoente",
    3: "Casos especiais",
    4: "Potências de base 10",
    5: "Propriedades"
};


function obterResultadosPotenciacao() {
    try {
        const resultados =
            JSON.parse(
                localStorage.getItem(
                    chaveLocalDoUsuario("resultadosPotenciacao")
                )
            );

        return Array.isArray(resultados)
            ? resultados
            : [];

    } catch (erro) {
        console.error(
            "Erro ao recuperar resultados:",
            erro
        );

        return [];
    }
}


function atualizarRelatorioPotenciacao() {
    const progresso =
        obterProgressoCurso();

    const resultados =
        obterResultadosPotenciacao();

    atualizarResumoDoRelatorio(
        resultados
    );

    atualizarAndamentoDasEtapas(
        progresso
    );

    atualizarDesempenhoDosConteudos(
        resultados
    );

    atualizarRecomendacoes(
        progresso,
        resultados
    );

    verificarConclusaoDaTrilha(
        progresso
    );
}


// ==========================================
// RESUMO GERAL
// ==========================================

function atualizarResumoDoRelatorio(
    resultados
) {
    const circulo =
        document.getElementById(
            "circuloDesempenho"
        );

    const percentualTexto =
        document.getElementById(
            "percentualDesempenho"
        );

    const totalTestes =
        document.getElementById(
            "totalTestesRealizados"
        );

    const mediaTexto =
        document.getElementById(
            "mediaAcertos"
        );

    const percentuais =
        resultados
            .map(function (resultado) {
                return Number(
                    resultado.percentual
                );
            })
            .filter(function (valor) {
                return Number.isFinite(valor);
            });

    const media =
        percentuais.length > 0
            ? Math.round(
                percentuais.reduce(
                    function (total, valor) {
                        return total + valor;
                    },
                    0
                ) / percentuais.length
            )
            : 0;

    if (circulo) {
        circulo.style.setProperty(
            "--desempenho",
            media
        );
    }

    if (percentualTexto) {
        percentualTexto.textContent =
            media + "%";
    }

    if (totalTestes) {
        totalTestes.textContent =
            resultados.length;
    }

    if (mediaTexto) {
        mediaTexto.textContent =
            media + "%";
    }
}


// ==========================================
// ANDAMENTO DAS AULAS
// ==========================================

function atualizarAndamentoDasEtapas(
    progresso
) {
    const area =
        document.getElementById(
            "andamentoEtapas"
        );

    if (!area) {
        return;
    }

    area.innerHTML = "";

    for (
        let etapa = 1;
        etapa <= TOTAL_ETAPAS;
        etapa++
    ) {
        const item =
            document.createElement("div");

        item.className =
            "andamento-item";

        let situacao =
            "Bloqueada";

        if (
            progresso.concluidas.includes(
                etapa
            )
        ) {
            situacao =
                "Concluída ✓";

            item.classList.add(
                "concluida"
            );

        } else if (
            progresso.aulasAssistidas.includes(
                etapa
            )
        ) {
            situacao =
                "Teste disponível";

            item.classList.add(
                "em-andamento"
            );

        } else if (
            etapa <=
            progresso.etapaLiberada
        ) {
            situacao =
                "Disponível";

            item.classList.add(
                "em-andamento"
            );
        }

        item.innerHTML =
            "<span>Aula " +
            etapa +
            "</span>" +
            "<strong>" +
            situacao +
            "</strong>";

        area.appendChild(item);
    }
}


// ==========================================
// DESEMPENHO POR CONTEÚDO
// ==========================================

function atualizarDesempenhoDosConteudos(
    resultados
) {
    const area =
        document.getElementById(
            "desempenhoPorConteudo"
        );

    if (!area) {
        return;
    }

    const desempenho = {};

    resultados.forEach(
        function (resultado) {
            const porTopico =
                resultado.desempenhoPorTopico ||
                {};

            Object.keys(porTopico).forEach(
                function (topico) {
                    const dados =
                        porTopico[topico];

                    if (!desempenho[topico]) {
                        desempenho[topico] = {
                            acertos: 0,
                            total: 0
                        };
                    }

                    desempenho[topico].acertos +=
                        Number(
                            dados.acertos
                        ) || 0;

                    desempenho[topico].total +=
                        Number(
                            dados.total
                        ) || 0;
                }
            );
        }
    );

    const topicos =
        Object.keys(desempenho);

    if (topicos.length === 0) {
        area.innerHTML = `
            <p class="relatorio-vazio">
                Realize os testes para visualizar
                seu desempenho.
            </p>
        `;

        return;
    }

    area.innerHTML = "";

    topicos.forEach(function (topico) {
        const dados =
            desempenho[topico];

        const percentual =
            dados.total > 0
                ? Math.round(
                    (
                        dados.acertos /
                        dados.total
                    ) * 100
                )
                : 0;

        const item =
            document.createElement("div");

        item.className =
            "desempenho-item";

        if (percentual < 70) {
            item.classList.add(
                "atencao"
            );
        }

        item.innerHTML = `
            <div class="desempenho-texto">
                <span>${topico}</span>
                <strong>${percentual}%</strong>
            </div>

            <div class="desempenho-barra">
                <div
                    style="width: ${percentual}%"
                ></div>
            </div>
        `;

        area.appendChild(item);
    });
}


// ==========================================
// RECOMENDAÇÕES
// ==========================================

function atualizarRecomendacoes(
    progresso,
    resultados
) {
    const area =
        document.getElementById(
            "recomendacoesAluno"
        );

    if (!area) {
        return;
    }

    if (resultados.length === 0) {
        area.innerHTML = `
            <p>
                Comece pela primeira videoaula
                e realize a verificação.
            </p>
        `;

        return;
    }

    const dificuldades =
        new Set();

    resultados.forEach(
        function (resultado) {
            const lista =
                resultado.dificuldades ||
                [];

            lista.forEach(
                function (topico) {
                    dificuldades.add(topico);
                }
            );
        }
    );

    if (dificuldades.size > 0) {
        let html =
            "<p>Recomendamos revisar:</p><ul>";

        dificuldades.forEach(
            function (topico) {
                html +=
                    "<li>" +
                    topico +
                    "</li>";
            }
        );

        html += "</ul>";

        area.innerHTML = html;

        return;
    }

    if (
        progresso.concluidas.length ===
        TOTAL_ETAPAS
    ) {
        area.innerHTML = `
            <p>
                Excelente! Você demonstrou
                bom domínio dos conteúdos.
            </p>
        `;

        return;
    }

    area.innerHTML = `
        <p>
            Continue para a próxima etapa
            da trilha.
        </p>
    `;
}


// ==========================================
// CONCLUSÃO DA TRILHA
// ==========================================

function verificarConclusaoDaTrilha(
    progresso
) {
    const conclusao =
        document.getElementById(
            "conclusaoPotenciacao"
        );

    if (!conclusao) {
        return;
    }

    conclusao.hidden =
        progresso.concluidas.length !==
        TOTAL_ETAPAS;
}


// ==========================================
// ACOMPANHAMENTO SIMPLIFICADO DA TRILHA
// ==========================================

function atualizarAcompanhamentoDaTrilha() {
    const progresso = obterProgressoCurso();
    atualizarAndamentoDasEtapas(progresso);
    verificarConclusaoDaTrilha(progresso);
}


// ==========================================
// JANELA DE ORIENTAÇÃO EM LIBRAS
// ==========================================

function configurarJanelaLibrasDaTrilha() {
    const video = document.getElementById(
        "videoLibrasTrilha"
    );

    const botao = document.getElementById(
        "repetirVideoLibrasTrilha"
    );

    if (!video || !botao) {
        return;
    }

    const enderecoOriginal = video.src;

    botao.addEventListener("click", function () {
        video.src = "";

        setTimeout(function () {
            const separador = enderecoOriginal.includes("?")
                ? "&"
                : "?";

            video.src =
                enderecoOriginal +
                separador +
                "autoplay=1";
        }, 100);
    });
}