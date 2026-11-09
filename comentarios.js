// ==========================================
// CONFIGURAÇÃO DE COMENTÁRIOS COM FIREBASE
// ==========================================

// Nota inicial zero (todas apagadas)
let notaSelecionada = 0;

const palavrasProibidas = [
    "idiota", "burro", "otario", "otário", "bosta", 
    "merda", "fdp", "desgraçado", "desgracado", "imbecil", "lixo"
];

// 1. Pega o nome do usuário logado
function obterNomeUsuarioLogado() {
    const dados = localStorage.getItem("usuarioLogado") || 
                  localStorage.getItem("usuarioCadastrado") || 
                  localStorage.getItem("usuario") || 
                  localStorage.getItem("user");

    if (!dados) return "Aluno";

    let nomeEncontrado = "";
    try {
        const obj = JSON.parse(dados);
        nomeEncontrado = obj.nome || obj.name || obj.displayName || "";
    } catch (e) {
        nomeEncontrado = dados;
    }

    if (nomeEncontrado && typeof nomeEncontrado === "string") {
        if (nomeEncontrado.includes("@")) {
            nomeEncontrado = nomeEncontrado.split("@")[0];
        }
        return nomeEncontrado.charAt(0).toUpperCase() + nomeEncontrado.slice(1);
    }

    return "Aluno";
}

// 2. Função que pinta e apaga as estrelas na tela
function atualizarEstrelas(nota) {
    const estrelas = document.querySelectorAll(".estrela");
    
    estrelas.forEach((e) => {
        const valorEstrela = Number(e.dataset.nota || e.dataset.valor || e.getAttribute("data-nota") || 0);
        
        if (valorEstrela <= Number(nota) && Number(nota) > 0) {
            e.classList.add("ativa");
            e.style.color = "#FFD700"; // Cor dourada
        } else {
            e.classList.remove("ativa");
            e.style.color = "#ccc"; // Cor cinza
        }
    });
}

// 3. Ativa o clique em cada estrela
function configurarEstrelas() {
    const estrelas = document.querySelectorAll(".estrela");

    estrelas.forEach((estrela) => {
        estrela.onclick = function() {
            const valor = Number(this.dataset.nota || this.dataset.valor || this.getAttribute("data-nota") || 0);
            notaSelecionada = valor;
            atualizarEstrelas(notaSelecionada);
        };
    });

    atualizarEstrelas(notaSelecionada);
}

// 4. Salvar comentário no FIREBASE FIRESTORE
function salvarComentario() {
    const textarea = document.getElementById("comentario");
    if (!textarea) return;

    const texto = textarea.value.trim();

    if (notaSelecionada === 0) {
        avisoComentarioYouTube("warning", "Atenção", "Por favor, clique em uma das estrelas para avaliar.", "comentario-sem-estrelas");
        return;
    }

    if (texto === "") {
        avisoComentarioYouTube("warning", "Atenção", "Escreva um comentário antes de enviar.", "comentario-sem-texto");
        return;
    }

    const comentarioMinusculo = texto.toLowerCase();
    for (let palavra of palavrasProibidas) {
        if (comentarioMinusculo.includes(palavra)) {
            avisoComentarioYouTube("warning", "Atenção", "Seu comentário possui palavras inadequadas.", "comentario-linguagem-inadequada");
            return;
        }
    }

    enviarComentarioComPrivacidade(texto, notaSelecionada)
        .then(() => {
            textarea.value = ""; notaSelecionada = 0; atualizarEstrelas(0);
            avisoComentarioYouTube('success', 'Obrigado!', 'Sua avaliação foi enviada com sucesso!', "comentario-enviado");
        })
        .catch(erro => { console.error("Erro ao salvar comentário:", erro); avisoComentarioYouTube("error", "Erro ao enviar", "Erro ao enviar comentário. Tente novamente!", "comentario-erro-envio"); });
}

// 5. OUVINTE EM TEMPO REAL (Carrega lista geral e últimos comentários)
function escutarComentariosFirebase() {
    if (typeof db === 'undefined') return;

    // Escuta a coleção "comentarios" em tempo real
    db.collection("comentarios")
        .orderBy("dataCriacao", "desc")
        .onSnapshot((snapshot) => {
            const comentarios = [];

            snapshot.forEach((doc) => {
                const dados = doc.data();

                // Formata a data do Firebase
                let dataFormatada = "Recente";
                if (dados.dataCriacao && dados.dataCriacao.toDate) {
                    dataFormatada = dados.dataCriacao.toDate().toLocaleDateString("pt-BR");
                }

                comentarios.push({
                    nome: dados.nome || "Anônimo",
                    nota: dados.nota || 5,
                    texto: dados.texto || "",
                    data: dataFormatada
                });
            });

            // Atualiza os dois locais da tela
            renderizarUltimosComentarios(comentarios);
            renderizarTodosComentarios(comentarios);
        }, (error) => {
            console.error("Erro ao carregar comentários do Firebase:", error);
        });
}

// Renderiza os 5 últimos comentários
function renderizarUltimosComentarios(comentarios) {
    const lista = document.getElementById("ultimos-comentarios");

    if (!lista) return;

    lista.innerHTML = "";

    if (comentarios.length === 0) {
        lista.innerHTML = "<p>Nenhuma avaliação ainda.</p>";
        return;
    }

    comentarios.slice(0, 5).forEach(function (comentario) {
        lista.appendChild(criarCardComentario(comentario));
    });
}


function renderizarTodosComentarios(comentarios) {
    const lista = document.getElementById("lista-comentarios");

    if (!lista) return;

    lista.innerHTML = "";

    if (comentarios.length === 0) {
        lista.innerHTML = "<p>Nenhum comentário cadastrado ainda.</p>";
        return;
    }

    comentarios.forEach(function (comentario) {
        lista.appendChild(criarCardComentario(comentario));
    });
}
function criarCardComentario(comentario) {
    const card = document.createElement("article");
    card.className = "comentario-card";

    const linha = document.createElement("div");
    linha.className = "comentario-linha";

    const estrelas = document.createElement("span");
    estrelas.className = "comentario-estrelas";
    estrelas.setAttribute(
        "aria-label",
        comentario.nota + " de 5 estrelas"
    );

    estrelas.textContent = "⭐".repeat(
        Math.max(
            0,
            Math.min(5, Number(comentario.nota) || 0)
        )
    );

    const conteudo = document.createElement("p");
    conteudo.className = "comentario-conteudo";

    const nome = document.createElement("strong");
    nome.className = "comentario-nome";
    nome.textContent = comentario.nome + ":";

    const texto = document.createElement("span");
    texto.className = "comentario-texto";
    texto.textContent = " " + comentario.texto;

    conteudo.append(nome, texto);

    const data = document.createElement("time");
    data.className = "comentario-data";
    data.textContent = comentario.data;

    linha.append(estrelas, conteudo, data);
    card.appendChild(linha);

    return card;
}

// 6. Inicialização segura
function inicializar() {
    configurarEstrelas();
    escutarComentariosFirebase();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    inicializar();
}

function avisoComentarioYouTube(icon, titulo, texto, chaveVideo) {
    if (typeof exibirAlerta === 'function') return exibirAlerta(icon, titulo, texto, null, null, chaveVideo);
    alert(titulo + ': ' + texto);
}
