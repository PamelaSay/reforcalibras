"use strict";

function normalizarVideoYouTube(endereco, autoplay = false, permitirId = false) {
    const entrada = String(endereco || '').trim();
    let id = permitirId && /^[A-Za-z0-9_-]{11}$/.test(entrada) ? entrada : '';
    let inicio = '';
    if (!id) {
        try {
            const url = new URL(entrada);
            if (url.protocol !== 'https:' || url.username || url.password || url.port) return '';
            const host = url.hostname.toLowerCase();
            if (host === 'youtu.be') {
                const partes = url.pathname.split('/').filter(Boolean);
                if (partes.length !== 1) return '';
                id = partes[0];
            } else if (['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(host)) {
                if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
                else {
                    const trecho = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})\/?$/);
                    id = trecho ? trecho[1] : '';
                }
            } else return '';
            const tempo = url.searchParams.get('start') || '';
            if (/^\d+$/.test(tempo)) inicio = '&start=' + tempo;
        } catch (_) { return ''; }
    }
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return '';
    return 'https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1' + inicio + (autoplay ? '&autoplay=1' : '');
}



const VIDEO_TESTE = "https://www.youtube.com/embed/r9AoQVkUUvU";
const TOTAL_VIDAS = 3;
const QUESTOES_POR_PARTIDA = 10;
const V = VIDEO_TESTE;

const VIDEOS_ALERTAS_JOGO = {
    "troca-permitida-partida-iniciada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "troca-permitida-partida-finalizada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "troca-bloqueada-partida-iniciada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "troca-bloqueada-partida-finalizada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "saida-partida-iniciada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "saida-sem-respostas": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "concluido-introducao": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "fim-vidas-introducao": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "concluido-propriedades": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "fim-vidas-propriedades": "https://www.youtube.com/embed/r9AoQVkUUvU"
};

const configuracaoModulos = {
    introducao: {
        titulo: "Introdução à Radiciação",
        instrucao: "Analise quadrados, cubos e os elementos da radiciação."
    },
    propriedades: {
        titulo: "Propriedades da Radiciação",
        instrucao: "Use produto, quociente e simplificação de radicais."
    }
};

const bancoDeQuestoes = {
    introducao: [
        {id:"rad-int-01",topico:"Raiz quadrada",nivel:1,pergunta:"Qual é a medida do lado de um quadrado com área igual a 25?",representacao:"Área do quadrado = 25 unidades²",alternativas:["5","10","12,5","25"],correta:"5",dica:"Procure um número que, multiplicado por ele mesmo, resulte em 25.",explicacao:"Como 5 × 5 = 25, o lado do quadrado mede 5 unidades. Portanto, √25 = 5.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-02",topico:"Raiz quadrada",nivel:1,pergunta:"Qual é a raiz quadrada de 36?",representacao:"√36",alternativas:["6","4","18","72"],correta:"6",dica:"Qual número multiplicado por ele mesmo resulta em 36?",explicacao:"6 × 6 = 36. Portanto, √36 = 6.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-03",topico:"Raiz cúbica",nivel:1,pergunta:"Qual é a raiz cúbica de 27?",representacao:"∛27",alternativas:["3","6","9","27"],correta:"3",dica:"Procure um número que, multiplicado por ele mesmo três vezes, resulte em 27.",explicacao:"3 × 3 × 3 = 27. Portanto, ∛27 = 3.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-04",topico:"Formação de cubos",nivel:1,pergunta:"Um cubo possui volume igual a 64. Qual é a medida de sua aresta?",representacao:"Volume do cubo = 64 unidades³",alternativas:["4","2","8","16"],correta:"4",dica:"A aresta participa três vezes da multiplicação.",explicacao:"4 × 4 × 4 = 64. Assim, ∛64 = 4 e a aresta mede 4 unidades.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-05",topico:"Índice",nivel:1,pergunta:"Na expressão ∛125 = 5, qual é o índice?",representacao:"³√125 = 5",alternativas:["3","5","25","125"],correta:"3",dica:"O índice é o número pequeno colocado junto ao radical.",explicacao:"O número 3 é o índice. Ele indica que a operação é uma raiz cúbica.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-06",topico:"Radicando",nivel:1,pergunta:"Na expressão √49 = 7, qual é o radicando?",representacao:"√49 = 7",alternativas:["49","7","2","√"],correta:"49",dica:"O radicando é o número que aparece dentro do radical.",explicacao:"Na expressão √49 = 7, o número 49 está dentro do radical. Portanto, ele é o radicando.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-07",topico:"Raiz",nivel:1,pergunta:"Na expressão ∛8 = 2, qual é a raiz?",representacao:"³√8 = 2",alternativas:["2","3","8","24"],correta:"2",dica:"A raiz é o resultado da operação.",explicacao:"Como 2 × 2 × 2 = 8, o resultado da operação e a raiz são iguais a 2.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-08",topico:"Raízes exatas",nivel:2,pergunta:"Qual destas raízes quadradas é exata?",representacao:"Escolha a expressão com resultado inteiro",alternativas:["√49","√20","√30","√50"],correta:"√49",dica:"Procure um radicando que seja o quadrado de um número inteiro.",explicacao:"Como 7 × 7 = 49, temos √49 = 7. Por isso, √49 é uma raiz exata.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-09",topico:"Caso com zero",nivel:1,pergunta:"Qual é o valor de √0?",representacao:"√0",alternativas:["0","1","2","Não existe"],correta:"0",dica:"Zero multiplicado por ele mesmo continua sendo zero.",explicacao:"Como 0 × 0 = 0, temos √0 = 0.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-int-10",topico:"Caso com um",nivel:1,pergunta:"Qual é o valor de ∛1?",representacao:"³√1",alternativas:["1","0","3","Não existe"],correta:"1",dica:"Um multiplicado por ele mesmo não muda de valor.",explicacao:"Como 1 × 1 × 1 = 1, temos ∛1 = 1.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"}
    ],
    propriedades: [
        {id:"rad-pro-01",topico:"Produto de radicais",nivel:1,pergunta:"Qual propriedade aparece em √(9 × 4) = √9 × √4?",representacao:"√(9 × 4) = √9 × √4",alternativas:["Produto","Quociente","Adição","Subtração"],correta:"Produto",dica:"Observe a operação que aparece entre 9 e 4.",explicacao:"A raiz de um produto pode ser escrita como o produto das raízes, quando os radicais possuem o mesmo índice.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-02",topico:"Produto de radicais",nivel:1,pergunta:"Qual é o valor de √9 × √16?",representacao:"√9 × √16",alternativas:["12","7","25","144"],correta:"12",dica:"Calcule separadamente √9 e √16.",explicacao:"√9 = 3 e √16 = 4. Portanto, √9 × √16 = 3 × 4 = 12.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-03",topico:"Produto de radicais",nivel:1,pergunta:"Qual é o valor de √(25 × 4)?",representacao:"√(25 × 4)",alternativas:["10","7","20","100"],correta:"10",dica:"Separe a raiz do produto em √25 × √4.",explicacao:"√(25 × 4) = √25 × √4 = 5 × 2 = 10.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-04",topico:"Quociente de radicais",nivel:1,pergunta:"Qual é o valor de √(64 ÷ 4)?",representacao:"√(64 ÷ 4)",alternativas:["4","2","8","16"],correta:"4",dica:"Você pode calcular √64 ÷ √4.",explicacao:"√(64 ÷ 4) = √64 ÷ √4 = 8 ÷ 2 = 4.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-05",topico:"Quociente de radicais",nivel:1,pergunta:"Qual propriedade aparece em √(49 ÷ 1) = √49 ÷ √1?",representacao:"√(49 ÷ 1) = √49 ÷ √1",alternativas:["Quociente","Produto","Potência","Adição"],correta:"Quociente",dica:"Observe a divisão apresentada dentro e fora do radical.",explicacao:"A raiz de um quociente pode ser escrita como o quociente das raízes, com divisor diferente de zero.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-06",topico:"Simplificação",nivel:2,pergunta:"Qual é a forma simplificada de √12?",representacao:"√12 = √(4 × 3)",alternativas:["2√3","3√2","4√3","6√2"],correta:"2√3",dica:"O fator 4 possui raiz quadrada exata.",explicacao:"√12 = √(4 × 3) = √4 × √3 = 2√3.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-07",topico:"Simplificação",nivel:2,pergunta:"Qual é a forma simplificada de √18?",representacao:"√18 = √(9 × 2)",alternativas:["3√2","2√3","6√2","9√2"],correta:"3√2",dica:"Separe o fator 9, pois ele possui raiz exata.",explicacao:"√18 = √(9 × 2) = √9 × √2 = 3√2.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-08",topico:"Simplificação",nivel:2,pergunta:"Qual é a forma simplificada de √50?",representacao:"√50 = √(25 × 2)",alternativas:["5√2","2√5","10√5","25√2"],correta:"5√2",dica:"O número 25 é um quadrado perfeito.",explicacao:"√50 = √(25 × 2) = √25 × √2 = 5√2.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-09",topico:"Fatoração",nivel:2,pergunta:"Qual fator com raiz exata ajuda a simplificar √20?",representacao:"20 = fator exato × outro fator",alternativas:["4","2","5","10"],correta:"4",dica:"Procure um quadrado perfeito que seja divisor de 20.",explicacao:"O número 4 divide 20 e possui raiz exata. Assim, √20 = √(4 × 5) = 2√5.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"},
        {id:"rad-pro-10",topico:"Simplificação",nivel:3,pergunta:"Sabendo que 72 = 36 × 2, qual é a forma simplificada de √72?",representacao:"√72 = √(36 × 2)",alternativas:["6√2","2√6","3√8","12√2"],correta:"6√2",dica:"Calcule a raiz quadrada do fator 36.",explicacao:"√72 = √(36 × 2) = √36 × √2 = 6√2.",videoPergunta:V,videoDica:V,videoExplicacao:"https://www.youtube.com/embed/r9AoQVkUUvU",videoExplicacaoErro:"https://www.youtube.com/embed/r9AoQVkUUvU"}
    ]
};

let moduloAtual = "introducao";
let questoes = [];
let indice = 0;
let pontos = 0;
let vidas = TOTAL_VIDAS;
let sequencia = 0;
let partidaFinalizada = false;
let bloqueado = false;
let dicaUsada = false;
let resultados = [];
const el = {};

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    localizarElementos();
    adicionarEventos();
    const recebido = new URLSearchParams(location.search).get("modulo");
    if (recebido && bancoDeQuestoes[recebido]) moduloAtual = recebido;
    carregarModulosConcluidos();
    exercicioDeEntrada = moduloAtual;
    iniciarPartida(moduloAtual);
}

function localizarElementos() {
    const ids = {pontos:"pontos",questaoAtual:"questaoAtual",totalQuestoes:"totalQuestoes",tituloModulo:"tituloModulo",topico:"topicoPergunta",nivel:"nivelPergunta",instrucao:"instrucao",pergunta:"textoPergunta",representacao:"representacaoDesafio",alternativas:"alternativas",botaoDica:"botaoDica",areaDica:"areaDica",textoDica:"textoDica",video:"videoLibras",videoIndisponivel:"videoIndisponivel",repetir:"botaoRepetirLibras",preenchimento:"preenchimentoProgresso",barra:"barraProgresso",porcentagem:"porcentagemProgresso",vidas:"vidas",sequencia:"valorSequencia",voltar:"botaoVoltar",sair:"botaoSair"};
    Object.entries(ids).forEach(([chave,id]) => el[chave] = document.getElementById(id));
    el.modulos = document.querySelectorAll(".botao-modulo[data-modulo]");
}

function adicionarEventos() {
    el.botaoDica.addEventListener("click", alternarDica);
    el.repetir.addEventListener("click", repetirVideo);
    el.voltar.addEventListener("click", confirmarSaida);
    el.sair.addEventListener("click", confirmarSaida);
    el.modulos.forEach(botao => botao.addEventListener("click", () => selecionarModulo(botao.dataset.modulo)));
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function iniciarPartida(modulo) {
    partidaFinalizada = false;
    moduloAtual = modulo;
    indice = 0; pontos = 0; vidas = TOTAL_VIDAS; sequencia = 0;
    bloqueado = false; dicaUsada = false; resultados = [];
    questoes = embaralhar(bancoDeQuestoes[modulo]).slice(0, QUESTOES_POR_PARTIDA).map(q => ({...q, alternativasSorteadas:embaralhar(q.alternativas)}));
    atualizarModulo();
    mostrarQuestao();
}

// O exercício de entrada continua acessível pelo link da aula no YouTube.
// Isso não marca a aula como assistida nem libera os demais exercícios.
let exercicioDeEntrada = null;
const ETAPAS_DOS_EXERCICIOS = { introducao: [1, 2, 3], propriedades: [4] };
function podeAbrirExercicio(modulo) {
    if (modulo === exercicioDeEntrada) return true;
    try {
        const progresso = JSON.parse(localStorage.getItem(chaveUsuario("progressoCursoRadiciacao"))) || {};
        const assistidas = Array.isArray(progresso.aulasAssistidas)
            ? progresso.aulasAssistidas.map(Number) : [];
        return (ETAPAS_DOS_EXERCICIOS[modulo] || []).some(etapa => assistidas.includes(etapa));
    } catch (erro) { return false; }
}

async function selecionarModulo(modulo) {
    const destino = modulo;
    if (!bancoDeQuestoes[destino] || destino === moduloAtual) return;
    const permitido = podeAbrirExercicio(destino);
    const terminou = partidaFinalizada;
    const mensagem = permitido
        ? "Deseja trocar de exercício? A partida atual será encerrada e o exercício selecionado começará do início."
        : "Para fazer este exercício, assista primeiro à aula correspondente na trilha. Você também pode acessar o exercício pelo link na descrição da aula no YouTube.";
    const chaveVideo = (permitido ? 'troca-permitida-' : 'troca-bloqueada-') +
        (terminou ? 'partida-finalizada' : 'partida-iniciada');
    const resposta = await Swal.fire({
        icon: permitido ? "question" : "warning",
        title: "Trocar de exercício?",
        html: montarAvisoTrocaExercicio(mensagem, chaveVideo),
        showCancelButton: true,
        confirmButtonText: permitido ? "Trocar de exercício" : "Ir para a trilha",
        cancelButtonText: terminou ? "Jogar este exercício novamente" : "Continuar aqui",
        confirmButtonColor: "#1d3557",
        allowOutsideClick: false, allowEscapeKey: false,
        customClass: { popup: "alerta-reforca" },
        didOpen: prepararTraducaoTroca,
        willClose: () => {
            const video = document.getElementById("videoTrocaExercicio");
            if (video) video.src = "";
        }
    });
    if (resposta.isConfirmed) {
        if (permitido) iniciarPartida(destino);
        else window.location.href = "radiciacao.html";
        return;
    }
    if (terminou) { iniciarPartida(moduloAtual); }
    // Em uma partida ativa, cancelar preserva a pergunta, pontos e vidas.
}

// Vídeo provisório já referenciado no projeto. Substituir pela tradução deste aviso.
function montarAvisoTrocaExercicio(mensagem, chaveVideo) {
    // Reutiliza exatamente o layout dos alertas de saída existentes.
    return htmlAlertaTraducao(mensagem, "Troca de exercício em Libras", chaveVideo)
        .replaceAll("videoAlerta", "videoTrocaExercicio")
        .replaceAll("repetirVideoAlerta", "repetirTrocaExercicio");
}
function prepararTraducaoTroca() {
    const video = document.getElementById("videoTrocaExercicio");
    const repetir = document.getElementById("repetirTrocaExercicio");
    if (video && repetir) repetir.addEventListener("click", function () {
        video.src = "";
        setTimeout(function () {
            video.src = urlVideo(video.dataset.videoOriginal, true);
        }, 100);
    });
}

function atualizarModulo() {
    const config = configuracaoModulos[moduloAtual];
    el.tituloModulo.textContent = config.titulo;
    el.instrucao.textContent = config.instrucao;
    el.modulos.forEach(botao => {
        const ativo = botao.dataset.modulo === moduloAtual;
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
        const estado = botao.querySelector(".estado-modulo");
        if (estado) estado.textContent = ativo ? "▶" : (botao.classList.contains("concluido") ? "✓" : "○");
    });
}

function mostrarQuestao() {
    const q = questoes[indice];
    bloqueado = false; dicaUsada = false;
    el.topico.textContent = q.topico.toUpperCase();
    el.nivel.textContent = "NÍVEL " + q.nivel;
    el.pergunta.textContent = q.pergunta;
    el.representacao.textContent = q.representacao;
    el.textoDica.textContent = q.dica;
    el.areaDica.hidden = true;
    el.botaoDica.textContent = "💡 Ver dica";
    el.botaoDica.setAttribute("aria-expanded", "false");
    criarAlternativas(q);
    carregarVideo(q.videoPergunta, "Tradução da pergunta em Libras");
    atualizarStatus();
}

function criarAlternativas(q) {
    el.alternativas.replaceChildren();
    q.alternativasSorteadas.forEach((texto, i) => {
        const botao = document.createElement("button");
        botao.type = "button"; botao.className = "botao-alternativa"; botao.dataset.resposta = texto;
        const letra = document.createElement("span"); letra.className = "letra-alternativa"; letra.textContent = ["A","B","C","D"][i];
        const resposta = document.createElement("span"); resposta.textContent = texto;
        botao.append(letra, resposta);
        botao.addEventListener("click", () => verificarResposta(texto, botao));
        el.alternativas.appendChild(botao);
    });
}

async function verificarResposta(escolhida, botaoEscolhido) {
    if (bloqueado) return;
    bloqueado = true;
    const q = questoes[indice];
    const acertou = escolhida === q.correta;
    el.alternativas.querySelectorAll("button").forEach(botao => {
        botao.disabled = true;
        if (botao.dataset.resposta === q.correta) botao.classList.add("correta");
        else if (botao === botaoEscolhido) botao.classList.add("incorreta");
        else botao.classList.add("neutra");
    });
    if (acertou) { pontos += 10; sequencia++; } else { vidas--; sequencia = 0; }
    resultados.push({id:q.id,topico:q.topico,respostaEscolhida:escolhida,respostaCorreta:q.correta,acertou,dicaUtilizada:dicaUsada});
    atualizarStatus();
    await alertaExplicacao(acertou, q);
    if (vidas <= 0) return finalizar(false);
    indice++;
    atualizarStatus();
    if (indice >= questoes.length) return finalizar(true);
    mostrarQuestao();
}

function alternarDica() {
    const abrir = el.areaDica.hidden;
    el.areaDica.hidden = !abrir;
    el.botaoDica.setAttribute("aria-expanded", String(abrir));
    el.botaoDica.textContent = abrir ? "💡 Ocultar dica" : "💡 Ver dica";
    if (abrir) { dicaUsada = true; carregarVideo(questoes[indice].videoDica, "Tradução da dica em Libras"); }
    else carregarVideo(questoes[indice].videoPergunta, "Tradução da pergunta em Libras");
}

function urlVideo(url, autoplay = false) {
    return normalizarVideoYouTube(url, autoplay) || "about:blank";
}

function carregarVideo(url, titulo) {
    if (!normalizarVideoYouTube(url)) { el.video.hidden = true; el.repetir.hidden = true; el.videoIndisponivel.hidden = false; return; }
    el.videoIndisponivel.hidden = true; el.video.hidden = false; el.repetir.hidden = false;
    el.video.title = titulo; el.video.src = urlVideo(url);
}

function repetirVideo() {
    const q = questoes[indice];
    const url = el.areaDica.hidden ? q.videoPergunta : q.videoDica;
    el.video.src = "";
    setTimeout(() => el.video.src = urlVideo(url, true), 100);
}

async function alertaExplicacao(acertou, q) {
    await Swal.fire({
        icon: acertou ? "success" : "error",
        title: acertou ? "Muito bem!" : "Vamos revisar",
        html:`<div class="explicacao-resposta"><div class="texto-explicacao">${q.explicacao}</div><iframe id="videoExplicacao" class="video-explicacao" src="${urlVideo((acertou ? q.videoExplicacao : q.videoExplicacaoErro))}" title="Explicação da resposta em Libras" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><button id="repetirExplicacao" class="botao-alerta-repetir" type="button">↻ Repetir explicação em Libras</button></div>`,
        confirmButtonText:"Continuar",confirmButtonColor:"#1d3557",allowOutsideClick:false,customClass:{popup:"alerta-reforca"},
        didOpen:()=>{const v=document.getElementById("videoExplicacao");const b=document.getElementById("repetirExplicacao");if(v&&b)b.onclick=()=>{v.src="";setTimeout(()=>v.src=urlVideo((acertou ? q.videoExplicacao : q.videoExplicacaoErro),true),100);};},
        willClose:()=>{const v=document.getElementById("videoExplicacao");if(v)v.src="";}
    });
}

function atualizarStatus() {
    el.pontos.textContent = pontos;
    el.questaoAtual.textContent = Math.min(indice + 1, questoes.length);
    el.totalQuestoes.textContent = questoes.length;
    el.sequencia.textContent = sequencia;
    el.vidas.innerHTML = "❤️".repeat(vidas) + `<span class="somente-leitor">${vidas} vidas restantes</span>`;
    const percentual = Math.round((indice / questoes.length) * 100);
    el.preenchimento.style.width = percentual + "%";
    el.porcentagem.textContent = percentual + "%";
    el.barra.setAttribute("aria-valuenow", String(percentual));
}

function chaveUsuario(base) {
    return typeof chaveLocalDoUsuario === "function" ? chaveLocalDoUsuario(base) : base;
}

function salvarResultado(concluido) {
    const acertos = resultados.filter(r => r.acertou).length;
    const total = resultados.length;
    const resultado = {jogo:"jogo_matematica_radiciacao",tematica:"Radiciação",modulo:moduloAtual,nomeModulo:configuracaoModulos[moduloAtual].titulo,etapa:Number(sessionStorage.getItem("testeCursoAtual"))||null,pontuacao:pontos,acertos,erros:total-acertos,totalRespondido:total,percentual:total?Math.round(acertos/total*100):0,concluido,respostas:resultados,realizadoEm:new Date().toISOString()};
    identificarResultado(resultado);
    let historico=[];try{historico=JSON.parse(localStorage.getItem(chaveUsuario("resultadosRadiciacao")))||[];}catch(e){historico=[];}
    historico.push(resultado);localStorage.setItem(chaveUsuario("resultadosRadiciacao"),JSON.stringify(historico));
    if(concluido){marcarModuloConcluido(moduloAtual);registrarConclusaoNaTrilha();}
    salvarFirebase(resultado);
    return resultado;
}

function registrarConclusaoNaTrilha() {
    const etapa = Number(sessionStorage.getItem("testeCursoAtual"));
    if (!Number.isInteger(etapa) || etapa < 1) return;
    const chave = chaveUsuario("progressoCursoRadiciacao");
    let progresso={etapaLiberada:1,aulasAssistidas:[],concluidas:[]};try{progresso=JSON.parse(localStorage.getItem(chave))||progresso;}catch(e){}
    if(!Array.isArray(progresso.concluidas))progresso.concluidas=[];
    if(!progresso.concluidas.includes(etapa))progresso.concluidas.push(etapa);
    progresso.etapaLiberada=Math.max(Number(progresso.etapaLiberada)||1,etapa+1);
    localStorage.setItem(chave,JSON.stringify(progresso));
    sessionStorage.removeItem("testeCursoAtual");
}

function marcarModuloConcluido(modulo) {
    const chave=chaveUsuario("modulosJogoRadiciacaoConcluidos");let lista=[];try{lista=JSON.parse(localStorage.getItem(chave))||[];}catch(e){}
    if(!lista.includes(modulo))lista.push(modulo);localStorage.setItem(chave,JSON.stringify(lista));carregarModulosConcluidos();
}

function carregarModulosConcluidos() {
    const chave=chaveUsuario("modulosJogoRadiciacaoConcluidos");let lista=[];try{lista=JSON.parse(localStorage.getItem(chave))||[];}catch(e){}
    document.querySelectorAll(".botao-modulo[data-modulo]").forEach(b=>b.classList.toggle("concluido",lista.includes(b.dataset.modulo)));
}

async function salvarFirebase(resultado) {
    try { await salvarResultadoComPontuacao(resultado); }
    catch (erro) { console.error("Resultado pendente de envio ao ranking:", erro); }
}

async function finalizar(concluido) {
    if (!resultados.length || partidaFinalizada) return;
    partidaFinalizada = true;
    const resultado=salvarResultado(concluido);
    const chaveVideo = (concluido ? 'concluido-' : 'fim-vidas-') + moduloAtual;
    const resposta=await Swal.fire({icon:concluido?"success":"warning",title:concluido?"Exercício concluído!":"Suas vidas terminaram",html:`<div class="explicacao-resposta"><div class="texto-explicacao">Você acertou <strong>${resultado.acertos} de ${resultado.totalRespondido}</strong> desafios.<br>Pontuação: <strong>${pontos}</strong>.<br>Aproveitamento: <strong>${resultado.percentual}%</strong>.</div><iframe id="videoFinal" data-video-original="${urlVideo(VIDEOS_ALERTAS_JOGO[chaveVideo])}" class="video-explicacao" src="${urlVideo(VIDEOS_ALERTAS_JOGO[chaveVideo])}" title="Resultado do jogo em Libras" allowfullscreen></iframe><button id="repetirFinal" class="botao-alerta-repetir" type="button">↻ Repetir tradução em Libras</button></div>`,showDenyButton:true,showCancelButton:true,confirmButtonText:"Voltar para a trilha",denyButtonText:"Jogar novamente",cancelButtonText:"Avaliar o jogo",confirmButtonColor:"#1d3557",denyButtonColor:"#5fa8d3",cancelButtonColor:"#d9a900",allowOutsideClick:false,allowEscapeKey:false,customClass:{popup:"alerta-reforca"},didOpen:()=>{const v=document.getElementById("videoFinal");const b=document.getElementById("repetirFinal");if(v&&b)b.onclick=()=>{v.src="";setTimeout(()=>v.src=urlVideo(v.dataset.videoOriginal,true),100);};}});
    if(resposta.isConfirmed)location.replace("radiciacao.html");
    else if(resposta.isDenied)iniciarPartida(moduloAtual);
    else location.href="index.html#avaliacao";
}

async function confirmarSaida() {
    if (partidaFinalizada) { location.replace("radiciacao.html"); return; }
    const mensagem=resultados.length?"O progresso desta partida será perdido.":"Deseja voltar para a trilha de Radiciação?";
    const chaveVideo = resultados.length ? 'saida-partida-iniciada' : 'saida-sem-respostas';
    const resposta=await Swal.fire({icon:"question",title:"Sair do jogo?",html:htmlAlertaTraducao(mensagem, "Saída do jogo em Libras", chaveVideo),showCancelButton:true,confirmButtonText:"Sim, sair",cancelButtonText:"Continuar jogando",confirmButtonColor:"#d94b4b",cancelButtonColor:"#1d3557",didOpen:ativarRepeticaoAlerta});
    if(resposta.isConfirmed)location.replace("radiciacao.html");
}

function htmlAlertaTraducao(mensagem, tituloVideo, chaveVideo) {
    return `<div class="explicacao-resposta"><div class="texto-explicacao">${mensagem}</div><iframe id="videoAlerta" data-video-original="${urlVideo(VIDEOS_ALERTAS_JOGO[chaveVideo])}" class="video-explicacao" src="${urlVideo(VIDEOS_ALERTAS_JOGO[chaveVideo])}" title="${tituloVideo}" allowfullscreen></iframe><button id="repetirVideoAlerta" class="botao-alerta-repetir" type="button">↻ Repetir tradução em Libras</button></div>`;
}

function ativarRepeticaoAlerta() {
    const video=document.getElementById("videoAlerta");
    const botao=document.getElementById("repetirVideoAlerta");
    if(video&&botao)botao.addEventListener("click",()=>{video.src="";setTimeout(()=>video.src=urlVideo(video.dataset.videoOriginal,true),100);});
}