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




// ==========================================
// ELEMENTOS DOS MODAIS
// ==========================================

const btnLogin = document.getElementById("btnLogin");

const modalLogin = document.getElementById("modalLogin");
const fecharLogin = document.getElementById("fecharLogin");

const abrirCadastro = document.getElementById("abrirCadastro");
const modalCadastro = document.getElementById("modalCadastro");
const fecharCadastro = document.getElementById("fecharCadastro");

const modalPerfil = document.getElementById("modalPerfil");
const fecharPerfil = document.getElementById("fecharPerfil");

const modalTermos = document.getElementById("modalTermos");
const abrirTermos = document.getElementById("abrirTermos");
const fecharTermos = document.getElementById("fecharTermos");
const concordarTermos = document.getElementById("concordarTermos");
const fecharSemConcordar = document.getElementById("fecharSemConcordar");

const VIDEOS_LIBRAS_INTERFACE = {
    "cadastro-campos-ausentes": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "cadastro-nome-obrigatorio": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "cadastro-email-invalido": "https://www.youtube.com/embed/-7ezU-XEo4M",
    "cadastro-senha-curta": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "cadastro-servico-indisponivel": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "cadastro-concluido": "https://www.youtube.com/embed/xZGu3c7eqow",
    "erro-cadastro": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "login-campos-ausentes": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "login-email-invalido": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "login-senha-obrigatoria": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "login-servico-indisponivel": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "boas-vindas-login": "https://www.youtube.com/embed/xZGu3c7eqow",
    "erro-login": "https://www.youtube.com/embed/-7ezU-XEo4M",
    "exclusao-sessao-ausente": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "erro-exclusao": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "recuperacao-servico-indisponivel": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "email-enviado": "https://www.youtube.com/embed/3yRcnOu1pOM",
    "erro-envio-recuperacao": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "excluir-conta": "https://www.youtube.com/embed/AnEFltlubiM",
    "conta-excluida": "https://www.youtube.com/embed/S3Pa0YYU5xE",
    "recuperar-senha": "https://www.youtube.com/embed/IJ88LcEX1TM",
    "comentario-sem-estrelas": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "comentario-sem-texto": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "comentario-linguagem-inadequada": "https://www.youtube.com/embed/r9AoQVkUUvU",
    "comentario-enviado": "https://www.youtube.com/embed/xsSWJSPeiOg",
    "comentario-erro-envio": "https://www.youtube.com/embed/r9AoQVkUUvU"
};


// ==========================================
// ABRIR LOGIN OU PERFIL
// ==========================================

if (btnLogin) {
    btnLogin.onclick = function () {
        const usuarioLogado = obterUsuarioLocal();

        if (usuarioLogado) {
            mostrarPerfil();
        } else if (modalLogin) {
            modalLogin.style.display = "flex";
        }
    };
}


// ==========================================
// FECHAR MODAIS
// ==========================================

if (fecharLogin) {
    fecharLogin.onclick = function () {
        modalLogin.style.display = "none"; pararVideosInterface(modalLogin);
    };
}

if (fecharCadastro) {
    fecharCadastro.onclick = function () {
        modalCadastro.style.display = "none"; pararVideosInterface(modalCadastro);
    };
}

if (fecharPerfil) {
    fecharPerfil.onclick = function () {
        modalPerfil.style.display = "none";
    };
}

if (fecharTermos) {
    fecharTermos.onclick = function () {
        modalTermos.style.display = "none"; pararVideosInterface(modalTermos);
    };
}


// ==========================================
// ABRIR CADASTRO
// ==========================================

if (abrirCadastro) {
    abrirCadastro.onclick = function () {
        if (modalLogin) {
            modalLogin.style.display = "none"; pararVideosInterface(modalLogin);
        }

        if (modalCadastro) {
            modalCadastro.style.display = "flex";
        }
    };
}


// ==========================================
// CÓDIGO DE ÉTICA
// ==========================================

if (abrirTermos) {
    abrirTermos.onclick = function () {
        if (modalTermos) {
            modalTermos.style.display = "flex";
        }
    };
}

if (concordarTermos) {
    concordarTermos.onclick = function () {
        const aceite = document.getElementById("aceitarTermos");

        if (aceite) {
            aceite.checked = true;
        }

        if (modalTermos) {
            modalTermos.style.display = "none"; pararVideosInterface(modalTermos);
        }
    };
}

if (fecharSemConcordar) {
    fecharSemConcordar.onclick = function () {
        const aceite = document.getElementById("aceitarTermos");

        if (aceite) {
            aceite.checked = false;
        }

        if (modalTermos) {
            modalTermos.style.display = "none"; pararVideosInterface(modalTermos);
        }
    };
}


// ==========================================
// USUÁRIO SALVO NO NAVEGADOR
// ==========================================

function obterUsuarioLocal() {
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (erro) {
        return null;
    }
}


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

async function cadastrar() {
    const nomeInput = document.getElementById("nomeCadastro");
    const emailInput = document.getElementById("emailCadastro");
    const senhaInput = document.getElementById("senhaCadastro");
    const aceiteInput = document.getElementById("aceitarTermos");
    const respostaComunidade = lerRespostaComunidade();

    if (!nomeInput || !emailInput || !senhaInput || !aceiteInput) {
        exibirAlerta("error", "Erro", "Os campos do cadastro não foram encontrados.", null, null, "cadastro-campos-ausentes");

        return;
    }

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const senha = senhaInput.value;
    // O ranking público usa apenas primeiro e último nome, sem e-mail ou nomes do meio.
    const participarRanking = true;

    if (!nome) {
        exibirAlerta("warning", "Atenção", "Informe seu nome.", null, null, "cadastro-nome-obrigatorio");

        return;
    }

    if (!email || !emailInput.checkValidity()) {
        exibirAlerta("warning", "Atenção", "Informe um e-mail válido.", null, null, "cadastro-email-invalido");

        return;
    }

    if (senha.length < 6) {
        exibirAlerta("warning", "Atenção", "A senha deve ter pelo menos 6 caracteres.", null, null, "cadastro-senha-curta");

        return;
    }

    if (!auth || !db) {
        exibirAlerta("error", "Erro", "O Firebase não está disponível.", null, null, "cadastro-servico-indisponivel");

        return;
    }

    let usuarioCriado = null;

    try {
        // Mantém a pessoa conectada depois de fechar o navegador.
        await auth.setPersistence(
            firebase.auth.Auth.Persistence.LOCAL
        );

        /*
         * A senha é enviada diretamente ao Firebase Authentication.
         * Ela não será gravada no Firestore.
         */
        const credencial =
            await auth.createUserWithEmailAndPassword(
                email,
                senha
            );

        usuarioCriado = credencial.user;

        // Guarda o nome no perfil do Firebase Authentication.
        await usuarioCriado.updateProfile({
            displayName: nome
        });

        /*
         * Dados que serão armazenados no Firestore.
         * Observe que não existe nenhum campo chamado "senha".
         */
        const participaPesquisa = aceiteInput.checked;

        const dadosUsuario = {
            nome: nome,
            email: email,
            pontos: 0,
            aulas: 0,
            jogos: 0,
            quantidadeAcessos: 0,
            quantidadeConteudosAcessados: 0,
            participarRanking: participarRanking,

            consentimentoPesquisa: participaPesquisa,
            perfilComunidade: participaPesquisa ? respostaComunidade : null,

            dataAceiteTermos: participaPesquisa
                ? firebase.firestore.FieldValue.serverTimestamp()
                : null,

            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp(),
            dataCriacao:
                firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            await db
                .collection("usuarios")
                .doc(usuarioCriado.uid)
                .set(dadosUsuario);

        } catch (erroFirestore) {
            /*
             * Se o Firestore recusar a gravação, excluímos a conta
             * recém-criada para não deixar um cadastro incompleto.
             */
            await usuarioCriado.delete();

            throw erroFirestore;
        }

        const sessaoUsuario = {
            uid: usuarioCriado.uid,
            nome: nome,
            email: email,
            pontos: 0,
            aulas: 0,
            jogos: 0,
            participarRanking: participarRanking
        };

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(sessaoUsuario)
        );

        if (modalCadastro) {
            modalCadastro.style.display = "none"; pararVideosInterface(modalCadastro);
        }

        limparFormularioCadastro();
        mostrarUsuario();
        registrarAcessoPrivado(usuarioCriado).catch(erro => console.error("Registro de acesso pendente:", erro));

        exibirAlerta("success", "Cadastro concluído!", `Bem-vindo(a), ${nome}!`, 1600, null, "cadastro-concluido");

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        exibirAlerta("error", "Erro ao cadastrar", traduzirErroFirebase(erro.code), null, null, "erro-cadastro");
    }
}


// ==========================================
// LOGIN
// ==========================================

// A autorização é conferida no Firebase antes desta função.
// A sessão local permite testar as aulas sem criar participante da pesquisa.
function iniciarSessaoAdministrativaDeTeste(usuario) {
    let anterior = null;
    try { anterior = JSON.parse(localStorage.getItem("usuarioLogado")); } catch (_) {}
    const mesmaConta = anterior && anterior.uid === usuario.uid;
    const sessao = {
        uid: usuario.uid,
        nome: usuario.displayName || (mesmaConta && anterior.nome) || "Administradora",
        email: usuario.email,
        pontos: mesmaConta ? anterior.pontos || 0 : 0,
        aulas: mesmaConta ? anterior.aulas || 0 : 0,
        jogos: mesmaConta ? anterior.jogos || 0 : 0,
        participarRanking: false,
        administrativa: true
    };
    localStorage.setItem("usuarioLogado", JSON.stringify(sessao));
    mostrarUsuario();
    registrarAcessoPrivado(usuario).catch(erro => console.error("Registro do teste pendente:", erro));
}

async function login() {
    const emailInput = document.getElementById("loginEmail");
    const senhaInput = document.getElementById("senhaLogin");

    if (!emailInput || !senhaInput) {
        exibirAlerta("error", "Erro", "Os campos de login não foram encontrados.", null, null, "login-campos-ausentes");

        return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const senha = senhaInput.value;

    if (!email || !emailInput.checkValidity()) {
        exibirAlerta("warning", "Atenção", "Informe um e-mail válido.", null, null, "login-email-invalido");

        return;
    }

    if (!senha) {
        exibirAlerta("warning", "Atenção", "Informe sua senha.", null, null, "login-senha-obrigatoria");

        return;
    }

    if (!auth || !db) {
        exibirAlerta("error", "Erro", "O Firebase não está disponível.", null, null, "login-servico-indisponivel");

        return;
    }

    try {
        await auth.setPersistence(
            firebase.auth.Auth.Persistence.LOCAL
        );

        const credencial =
            await auth.signInWithEmailAndPassword(
                email,
                senha
            );

        const usuario = credencial.user;
        if (await contaAdministradora(usuario.uid)) {
            iniciarSessaoAdministrativaDeTeste(usuario);
            if (modalLogin) modalLogin.style.display = "none"; pararVideosInterface(modalLogin);
            limparFormularioLogin();
            return;
        }

        const referencia = db
            .collection("usuarios")
            .doc(usuario.uid);

        const documento = await referencia.get();

        let dadosUsuario;

        if (documento.exists) {
            dadosUsuario = documento.data();

            /*
             * Se uma versão antiga do site salvou a senha no
             * Firestore, este trecho apaga somente esse campo.
             */
            if (
                Object.prototype.hasOwnProperty.call(
                    dadosUsuario,
                    "senha"
                )
            ) {
                await referencia.update({
                    senha:
                        firebase.firestore.FieldValue.delete()
                });

                delete dadosUsuario.senha;
            }

        } else {
            /*
             * Caso a conta exista no Authentication, mas ainda não
             * tenha um documento no Firestore, o perfil é recriado.
             */
            dadosUsuario = {
                uid: usuario.uid,

                nome:
                    usuario.displayName ||
                    email.split("@")[0],

                email: usuario.email,

                    pontos: 0,
                aulas: 0,
                jogos: 0,

                consentimentoPesquisa: false,
                dataAceiteTermos: null,
                participarRanking: true,

                dataCriacao:
                    firebase.firestore.FieldValue.serverTimestamp()
            };

            await referencia.set(dadosUsuario);
        }

        const sessaoUsuario = {
            uid: usuario.uid,

            nome:
                dadosUsuario.nome ||
                usuario.displayName ||
                email.split("@")[0],

            email: usuario.email,

            pontos: dadosUsuario.pontos || 0,
            aulas: dadosUsuario.aulas || 0,
            jogos: dadosUsuario.jogos || 0,
            participarRanking: Boolean(dadosUsuario.participarRanking)
        };

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(sessaoUsuario)
        );

        if (modalLogin) {
            modalLogin.style.display = "none"; pararVideosInterface(modalLogin);
        }

        limparFormularioLogin();
        mostrarUsuario();
        registrarAcessoPrivado(usuario).catch(erro => console.error("Registro de acesso pendente:", erro));

        exibirAlerta("success", "Bem-vindo(a)!", `Olá, ${sessaoUsuario.nome}!`, 1600, null, "boas-vindas-login");

    } catch (erro) {
        console.error("Erro no login:", erro);

        exibirAlerta("error", "Não foi possível entrar", traduzirErroFirebase(erro.code), null, null, "erro-login");
    }
}


// ==========================================
// MOSTRAR NOME DO USUÁRIO
// ==========================================

function mostrarUsuario() {
    const usuario = obterUsuarioLocal();

    if (!usuario) {
        if (btnLogin) {
            btnLogin.innerHTML = "👤 Entrar";
        }

        return;
    }

    if (btnLogin) {
        btnLogin.innerHTML = "👤 " + usuario.nome;
    }

    const nomeUsuario =
        document.getElementById("nomeUsuario");

    const pontos =
        document.getElementById("pontos");

    const aulas =
        document.getElementById("aulas");

    const jogos =
        document.getElementById("jogos");

    if (nomeUsuario) {
        nomeUsuario.innerText = usuario.nome;
    }

    if (pontos) {
        pontos.innerText = usuario.pontos || 0;
    }

    if (aulas) {
        aulas.innerText = usuario.aulas || 0;
    }

    if (jogos) {
        jogos.innerText = usuario.jogos || 0;
    }
}


// ==========================================
// MOSTRAR PERFIL
// ==========================================

function mostrarPerfil() {
    const usuario = obterUsuarioLocal();

    if (!usuario) {
        if (modalLogin) {
            modalLogin.style.display = "flex";
        }

        return;
    }

    mostrarUsuario();
    atualizarPerfilLocal();
    carregarIdentificacaoComunidade();
    sincronizarResumoNoFirebase();

    if (modalPerfil) {
        modalPerfil.style.display = "flex";
    }
}


// ==========================================
// RESUMO LOCAL DE APRENDIZAGEM
// ==========================================

function lerDadosLocais(chave, valorPadrao) {
    try {
        const valor = JSON.parse(localStorage.getItem(chave));
        return valor === null ? valorPadrao : valor;
    } catch (erro) {
        return valorPadrao;
    }
}

const TRILHAS_PERFIL = {
    Potenciacao: { titulo: "Potenciação", total: 5, pagina: "potenciacao.html" },
    Radiciacao: { titulo: "Radiciação", total: 4, pagina: "radiciacao.html" }
};
function dadosDaTrilhaNoPerfil(nome) {
    const config = TRILHAS_PERFIL[nome];
    const progresso = lerDadosLocais(chaveLocalDoUsuario("progressoCurso" + nome), {}) || {};
    const etapasValidas = lista => [...new Set((Array.isArray(lista) ? lista : []).map(Number))]
        .filter(n => Number.isInteger(n) && n >= 1 && n <= config.total).sort((a,b) => a-b);
    const assistidas = etapasValidas(progresso.aulasAssistidas);
    const concluidas = etapasValidas(progresso.concluidas);
    const resultados = lerHistoricoDePontos(nome);
    const percentuais = resultados.map(r => Number(r.percentual)).filter(Number.isFinite);
    const pendentes = assistidas.filter(n => !concluidas.includes(n));
    const proxima = Array.from({length: config.total}, (_,i) => i+1).find(n => !assistidas.includes(n));
    return {
        ...config, nome, assistidas, etapasConcluidas: concluidas, pendentes, resultados,
        concluidas: concluidas.length, iniciada: assistidas.length > 0 || concluidas.length > 0 || resultados.length > 0,
        media: percentuais.length ? Math.round(percentuais.reduce((a,b)=>a+b,0) / percentuais.length) : null,
        proximaAula: proxima || null
    };
}
function obterResumoAprendizagem() {
    const potenciacao = dadosDaTrilhaNoPerfil("Potenciacao");
    const radiciacao = dadosDaTrilhaNoPerfil("Radiciacao");
    const todosResultados = [...potenciacao.resultados, ...radiciacao.resultados];
    const valores = todosResultados.map(r=>Number(r.percentual)).filter(Number.isFinite);
    return {
        aulas: potenciacao.concluidas + radiciacao.concluidas,
        assistidas: potenciacao.assistidas.length + radiciacao.assistidas.length,
        jogos: todosResultados.length,
        media: valores.length ? Math.round(valores.reduce((a,b)=>a+b,0)/valores.length) : 0,
        pontos: somarUltimasNotas(todosResultados),
        potenciacao, radiciacao
    };
}
function definirTexto(id, texto) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = texto;
}
function escreverListaPerfil(id, textos) {
    const area = document.getElementById(id);
    if (!area) return;
    area.replaceChildren();
    textos.forEach(texto => {
        const item = document.createElement("p"); item.textContent = texto; area.appendChild(item);
    });
}
function atualizarPerfilLocal() {
    const usuario = obterUsuarioLocal(), resumo = obterResumoAprendizagem();
    if (usuario) definirTexto("nomeUsuario", usuario.nome || "Aluno");
    definirTexto("perfilAulas", resumo.assistidas);
    definirTexto("perfilTestes", resumo.jogos);
    definirTexto("perfilMedia", resumo.jogos ? resumo.media + "%" : "—");
    definirTexto("perfilPontos", resumo.pontos);
    const trilhas = [resumo.potenciacao, resumo.radiciacao];
    trilhas.forEach(dados => atualizarTrilhaNoPerfil(dados.nome, dados));
    const iniciadas = trilhas.filter(t=>t.iniciada);
    const vazio = document.getElementById("perfilSemTrilhas");
    if (vazio) vazio.hidden = iniciadas.length > 0;
    escreverListaPerfil("perfilPontosFortes", iniciadas.some(t=>t.resultados.length)
        ? iniciadas.filter(t=>t.media !== null).map(t=>t.titulo + ": média de " + t.media + "% em " + t.resultados.length + " tentativa(s).")
        : ["Faça uma verificação para visualizar seu desempenho. Assistir à aula não gera uma nota."]);
    const passos = [];
    iniciadas.forEach(t => {
        if (t.pendentes.length) passos.push(t.titulo + ": verificações pendentes das aulas " + t.pendentes.join(", ") + ". Você pode fazê-las quando preferir.");
        if (t.proximaAula) passos.push(t.titulo + ": continue assistindo pela aula " + t.proximaAula + ".");
        if (!t.proximaAula && t.concluidas === t.total) passos.push(t.titulo + ": todas as etapas concluídas. Você pode revisar as aulas.");
        const ultimos = new Map();
        [...t.resultados].sort((a,b)=>dataResultadoPerfil(a)-dataResultadoPerfil(b)).forEach(r=>ultimos.set(r.modulo || r.nomeModulo,r));
        const topicos = new Map();
        ultimos.forEach(r => (Array.isArray(r.respostas) ? r.respostas : []).forEach(q => {
            if (!q.topico) return;
            const dados = topicos.get(q.topico) || {acertos:0,total:0};
            dados.total++; if (q.acertou === true) dados.acertos++;
            topicos.set(q.topico,dados);
        }));
        const revisar = [...topicos].map(([nome,d])=>({nome,percentual:Math.round(d.acertos/d.total*100)}))
            .filter(d=>d.percentual<70).sort((a,b)=>a.percentual-b.percentual).slice(0,3);
        if (revisar.length) passos.push(t.titulo + " — revise: " + revisar.map(d=>d.nome + " (" + d.percentual + "% de acertos)").join("; ") + ".");
        else if (t.media !== null && t.media < 70) passos.push("Reveja as explicações e refaça os exercícios de " + t.titulo + ".");
    });
    escreverListaPerfil("perfilRecomendacoes", passos.length ? passos : ["Escolha uma trilha em Matemática para começar."]);

}
const EXERCICIOS_DO_PERFIL = {
    Potenciacao: [
        ["revisaoMultiplicacao", "Revisão da multiplicação"],
        ["potenciacao", "Base, expoente e potência"],
        ["casosEspeciais", "Casos especiais"],
        ["baseDez", "Potências de base 10"],
        ["propriedades", "Propriedades da potenciação"]
    ],
    Radiciacao: [
        ["introducao", "Introdução à radiciação"],
        ["propriedades", "Propriedades da radiciação"]
    ]
};
function atualizarTrilhaNoPerfil(nome, dados) {
    const card = document.getElementById("perfil" + nome + "Card");
    if (card) card.hidden = !dados.iniciada;
    if (!dados.iniciada) return;
    const area = document.getElementById("perfil" + nome + "Notas");
    if (!area) return;
    area.replaceChildren();
    const ultimas = new Map();
    [...dados.resultados].sort((a,b)=>dataResultadoPerfil(a)-dataResultadoPerfil(b))
        .forEach(r=>ultimas.set(r.modulo,r));
    EXERCICIOS_DO_PERFIL[nome].forEach(([modulo,titulo]) => {
        const resultado = ultimas.get(modulo);
        const linha = document.createElement("li");
        const rotulo = document.createElement("span");
        rotulo.className = "perfil-nota-exercicio";
        rotulo.textContent = titulo;
        const nota = document.createElement("strong");
        nota.className = "perfil-nota-valor";
        if (resultado) {
            nota.textContent = pontosDoResultado(resultado) + "/100";
            nota.setAttribute("aria-label", pontosDoResultado(resultado) + " de 100 pontos");
            const detalhe = document.createElement("small");
            const acertos = Number(resultado.acertos);
            detalhe.textContent = Number.isFinite(acertos)
                ? acertos + " acerto(s)" : "Última tentativa";
            if (resultado.concluido === false) detalhe.textContent += " · tentativa encerrada antes do fim";
            rotulo.appendChild(detalhe);
        } else {
            nota.textContent = "Não realizado";
            nota.classList.add("perfil-nota-pendente");
        }
        linha.append(rotulo,nota);area.appendChild(linha);
    });
    const link = document.getElementById("perfil" + nome + "Continuar");
    if (link) { link.href = dados.pagina; link.textContent = "Ver trilha →"; }
}

function dataResultadoPerfil(resultado) {
    const data = resultado.realizadoEm;
    if (data && typeof data.toMillis === "function") return data.toMillis();
    return Date.parse(data) || 0;
}

async function sincronizarResumoNoFirebase() {
    if (!auth || !db || !auth.currentUser) return;
    try {
        const resumo = await enviarPendenciasRanking(auth.currentUser.uid);
        mostrarUsuario();
        if (resumo) {
            definirTexto("perfilPontos", resumo.pontos);
            definirTexto("perfilTestes", resumo.jogos);
            definirTexto("perfilMedia", resumo.media + "%");
        }
        await atualizarRankingPublico();
    } catch (erro) {
        console.error("Não foi possível atualizar o ranking agora:", erro);
    }
}

function atualizarContinuarEstudando() {
    const area = document.getElementById("continuarEstudando");
    if (!area) return;

    const usuario = obterUsuarioLocal();
    area.replaceChildren();
    if (!usuario) return;

    const resumo = obterResumoAprendizagem();
    const titulo = document.createElement("h3");
    titulo.textContent = "📘 Continuar estudando";

    const link = document.createElement("a");
    const trilhas = [resumo.potenciacao, resumo.radiciacao];
    const dados = trilhas.find(t=>t.iniciada && (t.concluidas<t.total || t.assistidas.length<t.total)) || trilhas.find(t=>t.iniciada);
    if (!dados) return;
    const etapa = dados.proximaAula || dados.pendentes[0];
    link.href = dados.pagina + (etapa ? "#aula-" + etapa : "");
    link.textContent = "Continuar " + dados.titulo + " →";

    area.append(titulo, link);
}

async function atualizarRankingPublico() {
    const lista = document.getElementById("rankingLista");
    if (!lista || !db) return;
    try {
        // Ordenar no servidor: sem o recorte incorreto de 50 usuários aleatórios.
        const consulta = await db.collection("rankingPublico").orderBy("pontos", "desc").get();
        const participantes = [];
        consulta.forEach(documento => {
            const dados = documento.data();
            participantes.push({ uid: documento.id, nome: dados.nome || "Aluno", pontos: Number(dados.pontos) || 0 });
        });
        participantes.sort((a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome, "pt-BR") || a.uid.localeCompare(b.uid));
        lista.replaceChildren();
        if (!participantes.length) {
            const vazio = document.createElement("p");
            vazio.textContent = "O ranking ainda não possui participantes.";
            lista.appendChild(vazio); return;
        }
        const usuario = obterUsuarioLocal();
        const uid = auth && auth.currentUser ? auth.currentUser.uid : usuario && usuario.uid;
        const minhaPosicao = participantes.findIndex(p => p.uid === uid);
        const exibidos = participantes.slice(0, 3).map((p, i) => ({ ...p, posicao: i + 1 }));
        if (minhaPosicao >= 3) exibidos.push({ ...participantes[minhaPosicao], posicao: minhaPosicao + 1 });
        const medalhas = ["🥇", "🥈", "🥉"];
        exibidos.forEach(participante => {
            const item = document.createElement("p");
            item.className = "ranking-item";
            item.textContent = (medalhas[participante.posicao - 1] || "⭐") + " " + participante.posicao + "º-" + participante.nome + ":" + participante.pontos + "pontos";
            lista.appendChild(item);
        });
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
        lista.textContent = "Não foi possível carregar o ranking agora.";
    }
}


// ==========================================
// SAIR
// ==========================================

async function sair() {
    try {
        if (auth) {
            await auth.signOut();
        }
    } catch (erro) {
        console.error("Erro ao encerrar sessão:", erro);
    }

    localStorage.removeItem("usuarioLogado");

    if (modalPerfil) {
        modalPerfil.style.display = "none";
    }

    if (btnLogin) {
        btnLogin.innerHTML = "👤 Entrar";
    }

    window.location.reload();
}


// ==========================================
// EXCLUIR CONTA
// ==========================================

async function excluirConta() {
    if (typeof Swal === "undefined") {
        return;
    }

    const resultado = await Swal.fire({
        title: "Excluir conta?",
        html: montarConteudoAlertaLibras(
            "Seu cadastro, seu progresso e seus comentários serão apagados permanentemente.",
            "excluir-conta"
        ),
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#b00020",
        cancelButtonColor: "#247ba0",

        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        customClass: { popup: "alerta-reforca-acessivel" },
        didOpen: function (popup) {
            prepararVideosLibras(popup);
        },
            willClose: function (popup) { pararVideosInterface(popup); }
    });

    if (!resultado.isConfirmed) {
        return;
    }

    try {
        const usuario = await aguardarUsuarioFirebase();

        if (!auth || !usuario) {
            exibirAlerta("warning", "Sessão não encontrada", "Não foi possível localizar a conta conectada.", null, null, "exclusao-sessao-ausente");

            return;
        }

        const tokenDaSessao = await usuario.getIdTokenResult();
        const autenticadoEm = Number(tokenDaSessao.claims.auth_time) * 1000;
        if (!Number.isFinite(autenticadoEm) || Date.now() - autenticadoEm >= 5 * 60 * 1000) {
            abrirLoginDaExclusao(usuario.email);
            return;
        }

        await apagarColecaoEmLotes(
            db.collection("usuarios").doc(usuario.uid).collection("resultados")
        );
        await apagarColecaoEmLotes(
            db.collection("usuarios").doc(usuario.uid).collection("atividades")
        );
        await apagarColecaoEmLotes(
            db.collection("usuarios").doc(usuario.uid).collection("acessos")
        );
        for (const colecao of ["conteudosAcessados", "aulasAssistidas", "melhoresResultados"]) {
            await apagarColecaoEmLotes(db.collection("usuarios").doc(usuario.uid).collection(colecao));
        }
        await excluirComentariosDaConta(usuario.uid);
        await db.collection("rankingPublico").doc(usuario.uid).delete();

        await db
            .collection("usuarios")
            .doc(usuario.uid)
            .delete();

        await usuario.delete();

        limparDadosLocaisDaContaExcluida(usuario.uid);

        await Swal.fire({
            icon: "success",
            title: "Conta excluída",
            html: montarConteudoAlertaLibras("Seu cadastro foi removido.", "conta-excluida"),
            showConfirmButton: true,
            confirmButtonText: "Entendi",
            customClass: { popup: "alerta-reforca-acessivel" },
            didOpen: function (popup) {
                prepararVideosLibras(popup);
            },
            willClose: function (popup) { pararVideosInterface(popup); }
        });

        window.location.reload();

    } catch (erro) {
        console.error("Erro ao excluir conta:", erro);

        if (erro.code === "auth/requires-recent-login") {
            abrirLoginDaExclusao();
            return;
        }

        exibirAlerta("error", "Erro ao excluir", traduzirErroFirebase(erro.code), null, null, "erro-exclusao");
    }
}

function abrirLoginDaExclusao(email) {
    if (modalPerfil) modalPerfil.style.display = "none";
    const campoEmail = document.getElementById("loginEmail");
    const campoSenha = document.getElementById("senhaLogin");
    if (campoEmail && email) campoEmail.value = email;
    if (campoSenha) campoSenha.value = "";
    if (modalLogin) modalLogin.style.display = "flex";
    if (campoSenha) campoSenha.focus();
}

function aguardarUsuarioFirebase() {
    if (!auth) return Promise.resolve(null);
    if (auth.currentUser) return Promise.resolve(auth.currentUser);

    return new Promise(function (resolve) {
        let finalizado = false;
        const encerrar = function (usuario) {
            if (finalizado) return;
            finalizado = true;
            resolve(usuario || null);
        };
        const cancelarObservacao = auth.onAuthStateChanged(function (usuario) {
            cancelarObservacao();
            encerrar(usuario);
        });
        setTimeout(function () {
            cancelarObservacao();
            encerrar(auth.currentUser);
        }, 3000);
    });
}

async function apagarColecaoEmLotes(referenciaColecao) {
    await apagarConsultaEmLotes(referenciaColecao.limit(400));
}

async function apagarConsultaEmLotes(consulta) {
    let resultado = await consulta.get();

    while (!resultado.empty) {
        const lote = db.batch();
        resultado.docs.forEach(function (documento) {
            lote.delete(documento.ref);
        });
        await lote.commit();
        resultado = await consulta.get();
    }
}


// ==========================================
// MOSTRAR E OCULTAR SENHA
// ==========================================

function alternarSenha(idCampo, icone) {
    const campo = document.getElementById(idCampo);

    if (!campo) {
        return;
    }

    if (campo.type === "password") {
        campo.type = "text";
        icone.innerHTML = "🙈";
        icone.setAttribute("aria-label", "Ocultar senha");
        icone.title = "Ocultar senha";

    } else {
        campo.type = "password";
        icone.innerHTML = "👁️";
        icone.setAttribute("aria-label", "Mostrar senha");
        icone.title = "Mostrar senha";
    }
}


// ==========================================
// RECUPERAR SENHA
// ==========================================

async function esqueceuSenha(evento) {
    if (evento) {
        evento.preventDefault();
    }

    if (!auth) {
        exibirAlerta("error", "Erro", "O Firebase não está disponível.", null, null, "recuperacao-servico-indisponivel");

        return;
    }

    let email = "";

    const campoEmail =
        document.getElementById("loginEmail");

    if (campoEmail) {
        email = campoEmail.value.trim().toLowerCase();
    }

    if (typeof Swal === "undefined") {
        if (!email) {
            email = prompt(
                "Digite o e-mail usado no cadastro:"
            );
        }

        if (!email) {
            return;
        }

        try {
            await auth.sendPasswordResetEmail(email);

            alert(
                "O link de redefinição foi enviado para seu e-mail."
            );

        } catch (erro) {
            alert(traduzirErroFirebase(erro.code));
        }

        return;
    }

    const resultado = await Swal.fire({
        title: "Recuperar senha",
        html: montarConteudoAlertaLibras(
            "Informe o e-mail usado no cadastro para receber o link de redefinição.",
            "recuperar-senha"
        ),

        input: "email",
        inputValue: email,

        inputPlaceholder: "seuemail@exemplo.com",

        showCancelButton: true,

        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        customClass: { popup: "alerta-reforca-acessivel" },
        didOpen: function (popup) {
            prepararVideosLibras(popup);
        },
            willClose: function (popup) { pararVideosInterface(popup); },

        inputValidator: function (valor) {
            if (!valor) {
                return "Informe seu e-mail.";
            }
        }
    });

    if (!resultado.isConfirmed) {
        return;
    }

    try {
        await auth.sendPasswordResetEmail(
            resultado.value.trim().toLowerCase()
        );

        exibirAlerta("success", "E-mail enviado", "Confira sua caixa de entrada e a pasta de spam.", null, null, "email-enviado");

    } catch (erro) {
        console.error(
            "Erro ao enviar recuperação de senha:",
            erro
        );

        exibirAlerta("error", "Não foi possível enviar", traduzirErroFirebase(erro.code), null, null, "erro-envio-recuperacao");
    }
}


// ==========================================
// LIMPAR FORMULÁRIOS
// ==========================================

function limparFormularioLogin() {
    const formulario =
        document.getElementById("formLogin");

    if (formulario) {
        formulario.reset();
    }
}

function limparFormularioCadastro() {
    const formulario =
        document.getElementById("formCadastro");

    if (formulario) {
        formulario.reset();
    }
}


// ==========================================
// PESQUISA
// ==========================================

function pesquisarConteudo() {
    const campo =
        document.getElementById("campoPesquisa");

    if (!campo) {
        return;
    }

    const pesquisa =
        campo.value.trim().toLowerCase();

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(function (card) {
        const nome =
            card.dataset.nome
                ? card.dataset.nome.toLowerCase()
                : "";

        card.style.display =
            nome.includes(pesquisa)
                ? "block"
                : "none";
    });
}


// ==========================================
// ABRIR JOGOS
// ==========================================

function abrirJogo(tipo) {
    const paginas = {
        potencia: "jogo_potencia.html",
        radiciacao: "jogoradiciacao.html",
        planocartesiano: "planocartesiano.html"
    };

    if (paginas[tipo]) {
        window.location.href = paginas[tipo];
    }
}


// ==========================================
// VOLTAR PÁGINA
// ==========================================

function voltarPagina() {
    history.back();
}


// ==========================================
// ALERTAS
// ==========================================

function exibirAlerta(
    icon,
    title,
    text,
    timer = null,
    callback = null,
    chaveVideo
) {
    if (typeof Swal !== "undefined") {
        Swal.fire({
            icon: icon,
            title: title,
            html: montarConteudoAlertaLibras(text, chaveVideo),
            timer: null,
            showConfirmButton: true,
            confirmButtonText: "Entendi",
            customClass: {
                popup: "alerta-reforca-acessivel"
            },
            didOpen: function (popup) {
                prepararVideosLibras(popup);
            },
            willClose: function (popup) { pararVideosInterface(popup); }
        }).then(function () {
            if (callback) {
                callback();
            }
        });

    } else {
        alert(title + ": " + text);

        if (callback) {
            callback();
        }
    }
}

function escaparHtml(valor) {
    const elemento = document.createElement("div");
    elemento.textContent = String(valor || "");
    return elemento.innerHTML;
}

function montarConteudoAlertaLibras(texto, chaveVideo) {
    const endereco = normalizarVideoYouTube(VIDEOS_LIBRAS_INTERFACE[chaveVideo]);
    const video = endereco
        ? '<iframe class="video-libras-alerta" src="' + escaparHtml(endereco) + '" title="Tradução do aviso em Libras" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        : '';
    return '<div class="alerta-conteudo-acessivel"><div class="janela-libras-alerta" aria-label="Janela de tradução em Libras"><strong>Janela de Libras</strong>' + video +
        '<p class="libras-video-pendente"' + (endereco ? ' hidden' : '') + '>A tradução deste aviso em Libras será inserida aqui.</p>' +
        '<button type="button" class="repetir-video-interface"' + (endereco ? '' : ' hidden') + '>↻ Repetir tradução</button></div><p>' + escaparHtml(texto) + '</p></div>';
}

function prepararVideosLibras(raiz = document) {
    raiz.querySelectorAll('.libras-video-box iframe, iframe.video-libras-alerta').forEach(function(video) {
        const endereco = normalizarVideoYouTube(video.getAttribute('src'));
        const caixa = video.closest('.libras-video-box, .janela-libras-alerta, .janela-libras-interface');
        const janela = video.closest('.janela-libras-alerta, .janela-libras-interface') || caixa;
        const pendente = janela ? janela.querySelector('.libras-video-pendente') : null;
        const botao = janela ? janela.querySelector('.repetir-video-interface') : null;
        video.hidden = !endereco;
        video.style.display = endereco ? "" : "none";
        if (pendente) { pendente.hidden = Boolean(endereco); pendente.style.display = endereco ? "none" : ""; }
        if (botao) botao.hidden = !endereco;
        if (!endereco) { video.removeAttribute('src'); return; }
        video.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
        video.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        video.setAttribute('allowfullscreen','');
        video.dataset.youtubeOriginal = endereco;
        if (video.getAttribute('src') !== endereco) video.src = endereco;
        if (botao && botao.dataset.repetirPreparado !== 'true') {
            botao.dataset.repetirPreparado = 'true';
            botao.addEventListener('click', function() {
                video.src = normalizarVideoYouTube(video.dataset.youtubeOriginal, true);
            });
        }
    });
}
function pararVideosInterface(raiz) {
    if (!raiz) return;
    raiz.querySelectorAll('.libras-video-box iframe, iframe.video-libras-alerta').forEach(function(video) {
        const endereco = normalizarVideoYouTube(video.dataset.youtubeOriginal || video.getAttribute('src'));
        if (endereco) video.src = endereco;
    });
}


// ==========================================
// TRADUZIR ERROS DO FIREBASE
// ==========================================

function traduzirErroFirebase(codigo) {
    switch (codigo) {
        case "auth/invalid-email":
            return "O e-mail informado é inválido.";

        case "auth/email-already-in-use":
            return (
                "Este e-mail já possui cadastro. " +
                "Entre usando seu e-mail e sua senha."
            );

        case "auth/weak-password":
            return "A senha deve ter pelo menos 6 caracteres.";

        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "E-mail ou senha incorretos.";

        case "auth/operation-not-allowed":
            return (
                "Ative o provedor E-mail/senha " +
                "no Firebase Authentication."
            );

        case "auth/too-many-requests":
            return (
                "Muitas tentativas foram realizadas. " +
                "Aguarde alguns minutos."
            );

        case "auth/network-request-failed":
            return (
                "Falha de conexão. Confira sua internet " +
                "e tente novamente."
            );

        case "auth/unauthorized-domain":
            return (
                "O domínio deste site não está autorizado " +
                "no Firebase Authentication."
            );

        case "auth/requires-recent-login":
            return (
                "Por segurança, saia e entre novamente " +
                "antes de realizar essa operação."
            );

        case "permission-denied":
            return (
                "O Firestore recusou o acesso. " +
                "Confira as regras do banco."
            );

        default:
            if (codigo) {
                return "O Firebase retornou o erro: " + codigo;
            }

            return (
                "Ocorreu um erro. Abra o Console do navegador " +
                "para conferir os detalhes."
            );
    }
}


// ==========================================
// EVENTOS DOS FORMULÁRIOS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {
        mostrarUsuario();
        atualizarPerfilLocal();
        atualizarContinuarEstudando();
        atualizarRankingPublico();

        const campoPesquisa =
            document.getElementById("campoPesquisa");

        if (campoPesquisa) {
            campoPesquisa.value = "";
        }

        const formLogin =
            document.getElementById("formLogin");

        if (formLogin) {
            formLogin.addEventListener(
                "submit",
                function (evento) {
                    evento.preventDefault();
                    login();
                }
            );
        }

        const formCadastro =
            document.getElementById("formCadastro");

        if (formCadastro) {
            formCadastro.addEventListener(
                "submit",
                function (evento) {
                    evento.preventDefault();
                    cadastrar();
                }
            );
        }
    }
);


// ==========================================
// ACOMPANHAR ESTADO DO FIREBASE
// ==========================================

if (auth) {
    auth.onAuthStateChanged(
        async function (usuarioFirebase) {
            if (!usuarioFirebase) {
                /*
                 * Não apagamos aqui imediatamente para evitar conflito
                 * durante o carregamento inicial. O botão será ajustado
                 * pela sessão local.
                 */
                return;
            }

            try {
                if (await contaAdministradora(usuarioFirebase.uid)) {
                    iniciarSessaoAdministrativaDeTeste(usuarioFirebase);
                    return;
                }

                const documento = await db
                    .collection("usuarios")
                    .doc(usuarioFirebase.uid)
                    .get();

                if (!documento.exists) {
                    return;
                }

                const dados = documento.data();

                const sessao = {
                    uid: usuarioFirebase.uid,

                    nome:
                        dados.nome ||
                        usuarioFirebase.displayName ||
                        usuarioFirebase.email.split("@")[0],

                    email: usuarioFirebase.email,

                    pontos: dados.pontos || 0,
                    aulas: dados.aulas || 0,
                    jogos: dados.jogos || 0,
                    participarRanking:
                        Boolean(dados.participarRanking)
                };

                localStorage.setItem(
                    "usuarioLogado",
                    JSON.stringify(sessao)
                );

                mostrarUsuario();
                await sincronizarResumoNoFirebase();

            } catch (erro) {
                console.error(
                    "Erro ao recuperar sessão do usuário:",
                    erro
                );
            }
        }
    );
}


// ==========================================
// FECHAR MODAIS CLICANDO FORA
// ==========================================

window.addEventListener(
    "click",
    function (evento) {
        if (evento.target === modalLogin) {
            modalLogin.style.display = "none"; pararVideosInterface(modalLogin);
        }

        if (evento.target === modalCadastro) {
            modalCadastro.style.display = "none"; pararVideosInterface(modalCadastro);
        }

        if (evento.target === modalPerfil) {
            modalPerfil.style.display = "none";
        }

        if (evento.target === modalTermos) {
            modalTermos.style.display = "none"; pararVideosInterface(modalTermos);
        }
    }
);

async function registrarVideoConcluido(
    tematica,
    etapa
) {
    const usuario =
        firebase.auth().currentUser;

    if (!usuario) {
        return;
    }

    const atividade = {
        tipo:
            "video_concluido",

        tematica:
            tematica,

        etapa:
            etapa,

        realizadoEm:
            firebase.firestore
                .FieldValue
                .serverTimestamp()
    };

    await db
        .collection("usuarios")
        .doc(usuario.uid)
        .collection("atividades")
        .add(atividade);
}


// ==========================================
// CONTADOR PÚBLICO DE VISITAS DO INDEX
// ==========================================

const CHAVE_NAO_CONTAR_VISITAS = "reforcaNaoContarEsteDispositivo";
const CHAVE_VISITA_INDEX_NA_SESSAO = "reforcaVisitaIndexRegistrada";

function configurarExclusaoDoContador() {
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.get("nao-contar-visita") === "1") {
        localStorage.setItem(CHAVE_NAO_CONTAR_VISITAS, "true");
        parametros.delete("nao-contar-visita");

        const novaConsulta = parametros.toString();
        const enderecoLimpo = window.location.pathname +
            (novaConsulta ? "?" + novaConsulta : "") +
            window.location.hash;

        window.history.replaceState({}, document.title, enderecoLimpo);
    }
}

async function atualizarContadorDeVisitas() {
    const numeroVisitas = document.getElementById("numeroVisitas");
    if (!numeroVisitas || !db) return;

    configurarExclusaoDoContador();

    const ignorarEsteDispositivo =
        localStorage.getItem(CHAVE_NAO_CONTAR_VISITAS) === "true";

    const visitaJaRegistradaNestaSessao =
        sessionStorage.getItem(CHAVE_VISITA_INDEX_NA_SESSAO) === "true";

    const referencia = db.collection("estatisticas").doc("visitas-index");

    try {
        if (!ignorarEsteDispositivo && !visitaJaRegistradaNestaSessao) {
            await referencia.set({
                total: firebase.firestore.FieldValue.increment(1),
                atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            /*
             * A marcação só acontece depois que o Firebase confirma a gravação.
             * Atualizar a página não soma outra visita na mesma sessão.
             */
            sessionStorage.setItem(
                CHAVE_VISITA_INDEX_NA_SESSAO,
                "true"
            );
        }

        const documento = await referencia.get();
        const total = documento.exists
            ? Number(documento.data().total) || 0
            : 0;

        numeroVisitas.textContent = total.toLocaleString("pt-BR");
    } catch (erro) {
        console.error("Erro ao atualizar o contador de visitas:", erro);
        numeroVisitas.textContent = "Indisponível";
    }
}


// ==========================================
// INICIAR RECURSOS ACESSÍVEIS DA INTERFACE
// ==========================================

prepararVideosLibras(document);
atualizarContadorDeVisitas();

// ==========================================
// disciplina suspenso
// ==========================================
function myFunction() {
  var x = document.getElementById("menu-links");
  if (x.className === "menu-links") {
    x.className += " responsive";
  } else {
    x.className = "menu-links";
  }
}
