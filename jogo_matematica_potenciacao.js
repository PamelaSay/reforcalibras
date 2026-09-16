"use strict";


/* =====================================================
   FUNÇÃO DE CRIAÇÃO DAS QUESTÕES
===================================================== */

function criarQuestao(configuracao) {
    return {
        id: configuracao.id,
        topico: configuracao.topico,
        nivel: configuracao.nivel || 1,
        pergunta: configuracao.pergunta,
        representacao: configuracao.representacao,
        alternativas: configuracao.alternativas,
        correta: configuracao.correta,
        dica: configuracao.dica,
        explicacao: configuracao.explicacao,
        videoPergunta: configuracao.videoPergunta || "",
        videoDica: configuracao.videoDica || "",
        videoExplicacao: configuracao.videoExplicacao || ""
    };
}


/* =====================================================
   CONFIGURAÇÃO DOS MÓDULOS
===================================================== */

const configuracaoModulos = {
    revisaoMultiplicacao: {
        titulo: "Revisão de multiplicação",
        conteudo: "Adição de parcelas iguais e cálculo",
        instrucao: "Observe a operação e escolha a alternativa correta."
    },

    potenciacao: {
        titulo: "Potenciação",
        conteudo: "Base, expoente, leitura e cálculo",
        instrucao:
            "Analise a potência e escolha a alternativa correta."
    },

    casosEspeciais: {
        titulo: "Casos especiais",
        conteudo: "Expoentes e bases especiais",
        instrucao:
            "Observe a base e o expoente antes de responder."
    },

    baseDez: {
        titulo: "Potências de base 10",
        conteudo: "Base 10 e escrita numérica",
        instrucao:
            "Relacione a potência de base 10 com sua escrita numérica."
    },

    propriedades: {
        titulo: "Propriedades",
        conteudo: "Propriedades da potenciação",
        instrucao:
            "Identifique a propriedade adequada para resolver o desafio."
    }
};


/* =====================================================
   BANCO DE QUESTÕES
===================================================== */

const bancoDeQuestoes = {

    /* =================================================
       MÓDULO 1 — REVISÃO DE MULTIPLICAÇÃO
    ================================================= */

    revisaoMultiplicacao: [
        criarQuestao({
            id: "mult-01", topico: "Adição repetida", nivel: 1,
            pergunta: "Qual é o resultado desta adição?",
            representacao: "2 + 2 + 2 + 2",
            alternativas: ["6", "8", "4", "10"], correta: "8",
            dica: "Some as quatro parcelas iguais a 2.",
            explicacao: "2 + 2 + 2 + 2 = 8. Também podemos escrever 4 × 2 = 8.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-02", topico: "Adição repetida", nivel: 1,
            pergunta: "Qual multiplicação representa esta adição?",
            representacao: "5 + 5 + 5",
            alternativas: ["5 × 5", "3 × 5", "5 × 3 × 5", "3 + 5"], correta: "3 × 5",
            dica: "Conte quantas vezes a parcela 5 aparece.",
            explicacao: "A parcela 5 aparece três vezes. Portanto, 5 + 5 + 5 = 3 × 5.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-03", topico: "Adição repetida", nivel: 1,
            pergunta: "Qual multiplicação representa esta adição?",
            representacao: "2 + 2 + 2 + 2 + 2",
            alternativas: ["2 × 2", "5 × 2", "2 × 5 × 2", "5 + 2"], correta: "5 × 2",
            dica: "Conte quantas vezes a parcela 2 aparece.",
            explicacao: "A parcela 2 aparece cinco vezes. Portanto, a multiplicação é 5 × 2.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-04", topico: "Representação", nivel: 1,
            pergunta: "Qual adição representa esta multiplicação?",
            representacao: "6 × 3",
            alternativas: ["6 + 6 + 6", "3 + 3 + 3 + 3 + 3 + 3", "6 + 3", "3 + 6 + 3"], correta: "3 + 3 + 3 + 3 + 3 + 3",
            dica: "Escreva seis parcelas iguais a 3.",
            explicacao: "6 × 3 representa seis parcelas iguais a 3.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-05", topico: "Representação", nivel: 1,
            pergunta: "Qual multiplicação representa esta adição?",
            representacao: "7 + 7 + 7",
            alternativas: ["7 × 7", "3 × 7", "7 × 3 × 7", "3 + 7"], correta: "3 × 7",
            dica: "Conte quantas vezes a parcela 7 aparece.",
            explicacao: "A parcela 7 aparece três vezes. Portanto, 7 + 7 + 7 = 3 × 7.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-06", topico: "Cálculo", nivel: 2,
            pergunta: "Qual é o resultado de 4 × 5?", representacao: "4 × 5",
            alternativas: ["9", "15", "20", "25"], correta: "20",
            dica: "Some quatro parcelas iguais a 5.",
            explicacao: "5 + 5 + 5 + 5 = 20. Logo, 4 × 5 = 20.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-07", topico: "Cálculo", nivel: 2,
            pergunta: "Qual é o resultado de 3 × 6?", representacao: "3 × 6",
            alternativas: ["9", "12", "18", "21"], correta: "18",
            dica: "Some três parcelas iguais a 6.",
            explicacao: "6 + 6 + 6 = 18. Logo, 3 × 6 = 18.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-08", topico: "Cálculo", nivel: 2,
            pergunta: "Qual é o resultado de 8 × 4?", representacao: "8 × 4",
            alternativas: ["24", "28", "32", "36"], correta: "32",
            dica: "Some oito parcelas iguais a 4.",
            explicacao: "Oito grupos de quatro totalizam 32. Logo, 8 × 4 = 32.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-09", topico: "Tabuada", nivel: 3,
            pergunta: "Qual é o resultado de 9 × 3?", representacao: "9 × 3",
            alternativas: ["18", "21", "27", "30"], correta: "27",
            dica: "Some nove parcelas iguais a 3.",
            explicacao: "Nove grupos de três totalizam 27. Logo, 9 × 3 = 27.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),
        criarQuestao({
            id: "mult-10", topico: "Tabuada", nivel: 3,
            pergunta: "Qual é o resultado de 10 × 7?", representacao: "10 × 7",
            alternativas: ["17", "60", "70", "80"], correta: "70",
            dica: "Observe o que acontece quando multiplicamos por 10.",
            explicacao: "Dez grupos de sete totalizam 70. Logo, 10 × 7 = 70.",
            videoPergunta: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica: "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao: "https://www.youtube.com/embed/r9AoQVkUUvU"
        })
    ],

    /* =================================================
       MÓDULO 2 — POTENCIAÇÃO
    ================================================= */

    potenciacao: [

        criarQuestao({
            id: "pot-01",
            topico: "Leitura de potência",
            nivel: 1,
            pergunta: "Como se lê corretamente a potência 2³?",
            representacao: "2³",
            alternativas: [
                "Dois elevado ao cubo",
                "Dois vezes três",
                "Três elevado ao quadrado",
                "Dois elevado a um"
            ],
            correta: "Dois elevado ao cubo",
            dica:
                "O número pequeno indica o expoente da potência.",
            explicacao:
                "A expressão 2³ é lida como dois elevado à terceira potência ou dois elevado ao cubo.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-02",
            topico: "Elementos da potência",
            nivel: 1,
            pergunta: "Na potência 5⁴, qual número é a base?",
            representacao: "5⁴",
            alternativas: ["5", "4", "20", "625"],
            correta: "5",
            dica:
                "A base é o número que será multiplicado por ele mesmo.",
            explicacao:
                "Em 5⁴, a base é 5 e o expoente é 4.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-03",
            topico: "Elementos da potência",
            nivel: 1,
            pergunta: "Na potência 7², qual número é o expoente?",
            representacao: "7²",
            alternativas: ["2", "7", "14", "49"],
            correta: "2",
            dica:
                "O expoente aparece acima e à direita da base.",
            explicacao:
                "Em 7², o número 7 é a base e o número 2 é o expoente.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-04",
            topico: "Representação",
            nivel: 1,
            pergunta:
                "Qual potência representa o produto 3 × 3 × 3 × 3?",
            representacao: "3 × 3 × 3 × 3",
            alternativas: ["3⁴", "4³", "3 × 5", "12²"],
            correta: "3⁴",
            dica:
                "Conte quantas vezes o fator 3 aparece.",
            explicacao:
                "O fator 3 aparece quatro vezes. Portanto, 3 × 3 × 3 × 3 = 3⁴.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-05",
            topico: "Desenvolvimento",
            nivel: 1,
            pergunta:
                "Qual produto representa corretamente a potência 4³?",
            representacao: "4³",
            alternativas: [
                "4 × 4 × 4",
                "4 × 3",
                "3 × 3 × 3 × 3",
                "4 + 4 + 4"
            ],
            correta: "4 × 4 × 4",
            dica:
                "O expoente indica quantas vezes a base aparece como fator.",
            explicacao:
                "Em 4³, a base 4 aparece três vezes como fator: 4 × 4 × 4.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-06",
            topico: "Cálculo",
            nivel: 2,
            pergunta: "Qual é o valor de 3³?",
            representacao: "3³",
            alternativas: ["27", "9", "6", "81"],
            correta: "27",
            dica:
                "Escreva a base 3 vezes como fator.",
            explicacao:
                "3³ = 3 × 3 × 3 = 27.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-07",
            topico: "Cálculo",
            nivel: 2,
            pergunta: "Qual é o valor de 2⁵?",
            representacao: "2⁵",
            alternativas: ["32", "10", "25", "16"],
            correta: "32",
            dica:
                "Multiplique cinco fatores iguais a 2.",
            explicacao:
                "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-08",
            topico: "Comparação",
            nivel: 2,
            pergunta:
                "Qual das potências possui o maior valor?",
            representacao: "2⁴ ,    3²  ,  5¹  ,   2³",
            alternativas: ["2⁴", "3²", "5¹", "2³"],
            correta: "2⁴",
            dica:
                "Calcule o valor de cada potência antes de comparar.",
            explicacao:
                "2⁴ = 16, 3² = 9, 5¹ = 5 e 2³ = 8. Portanto, 2⁴ possui o maior valor.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-09",
            topico: "Problema",
            nivel: 2,
            pergunta:
                "Um quadrado possui lado medindo 6 cm. Qual potência representa sua área?",
            representacao: "Área do quadrado = lado × lado",
            alternativas: ["6²", "6³", "2⁶", "6 × 2"],
            correta: "6²",
            dica:
                "A área do quadrado é o produto da medida do lado por ela mesma.",
            explicacao:
                "Como a área é 6 × 6, podemos representá-la por 6².",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pot-10",
            topico: "Problema",
            nivel: 3,
            pergunta:
                "Um cubo possui aresta medindo 4 cm. Qual é o seu volume?",
            representacao: "Volume do cubo = aresta³",
            alternativas: ["64 cm³", "16 cm³", "12 cm³", "8 cm³" ],
            correta: "64 cm³",
            dica:
                "Multiplique 4 por ele mesmo três vezes.",
            explicacao:
                "O volume é 4³ = 4 × 4 × 4 = 64 cm³.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        })
    ],


    /* =================================================
       MÓDULO 2 — CASOS ESPECIAIS
    ================================================= */

    casosEspeciais: [

        criarQuestao({
            id: "esp-01",
            topico: "Expoente zero",
            nivel: 1,
            pergunta: "Qual é o valor de 8⁰?",
            representacao: "8⁰",
            alternativas: ["1", "0", "9", "80"],
            correta: "1",
            dica:
                "Considere a regra das potências de base não nula e expoente zero.",
            explicacao:
                "Toda potência de base diferente de zero e expoente zero é igual a 1. Portanto, 8⁰ = 1.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-02",
            topico: "Expoente um",
            nivel: 1,
            pergunta: "Qual é o valor de 12¹?",
            representacao: "12¹",
            alternativas: ["12", "1", "0", "144"],
            correta: "12",
            dica:
                "Observe quantas vezes a base aparece como fator.",
            explicacao:
                "Toda potência de expoente 1 é igual à própria base. Portanto, 12¹ = 12.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-03",
            topico: "Base um",
            nivel: 1,
            pergunta: "Qual é o valor de 1⁹?",
            representacao: "1⁹",
            alternativas: ["1", "9", "0", "81"],
            correta: "1",
            dica:
                "Multiplicar o número 1 por ele mesmo não altera seu valor.",
            explicacao:
                "Uma potência de base 1 é sempre igual a 1. Portanto, 1⁹ = 1.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-04",
            topico: "Base zero",
            nivel: 1,
            pergunta: "Qual é o valor de 0⁵?",
            representacao: "0⁵",
            alternativas: ["0", "1", "5", "Não existe"],
            correta: "0",
            dica:
                "A base zero será multiplicada por ela mesma cinco vezes.",
            explicacao:
                "Zero elevado a um expoente natural positivo é igual a zero. Portanto, 0⁵ = 0.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-05",
            topico: "Expoente zero",
            nivel: 2,
            pergunta: "Se a ≠ 0, -1 e 1, qual das igualdades está correta?",
            representacao: "a ≠ 0",
            alternativas: [
                "a⁰ = 1",
                "a⁰ = 0",
                "a⁰ = a",
                "a⁰ = −a"
            ],
            correta: "a⁰ = 1",
            dica:
                "A condição a ≠ 0 é importante para aplicar essa regra.",
            explicacao:
                "Para toda base a diferente de zero, temos a⁰ = 1.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-06",
            topico: "Base negativa",
            nivel: 2,
            pergunta: "Qual é o valor de (−3)²?",
            representacao: "(−3)²",
            alternativas: ["9", "−9", "6", "−6"],
            correta: "9",
            dica:
                "Os parênteses indicam que o sinal negativo faz parte da base.",
            explicacao:
                "(−3)² = (−3) × (−3) = 9.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-07",
            topico: "Base negativa",
            nivel: 2,
            pergunta: "Qual é o valor de (−2)³?",
            representacao: "(−2)³",
            alternativas: ["−8", "8", "−6", "6"],
            correta: "−8",
            dica:
                "Uma quantidade ímpar de fatores negativos produz resultado negativo.",
            explicacao:
                "(−2)³ = (−2) × (−2) × (−2) = −8.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-08",
            topico: "Parênteses",
            nivel: 2,
            pergunta: "Qual é o valor de −2²?",
            representacao: "−2²",
            alternativas: ["−4", "4", "−2", "2"],
            correta: "−4",
            dica:
                "Sem parênteses, o expoente atua somente sobre o número 2.",
            explicacao:
                "Em −2², calculamos primeiro 2² = 4 e depois aplicamos o sinal negativo. Assim, −2² = −4.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-09",
            topico: "Comparação de sinais",
            nivel: 3,
            pergunta: "Das expressões abaixo afirmação está correta?",
            representacao: "(−4)²  ,   −4²",
            alternativas: [
                "(−4)² = 16 e −4² = −16",
                "As duas expressões são iguais a 4",
                "As duas expressões são iguais a −16",
                "(−4)² = −16 e −4² = 16"
            ],
            correta: "(−4)² = 16 e −4² = −16",
            dica:
                "Observe em qual expressão o sinal negativo está dentro dos parênteses.",
            explicacao:
                "Em (−4)², a base é −4 e o resultado é 16. Em −4², apenas o 4 é elevado ao quadrado, resultando em −16.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "esp-10",
            topico: "Análise",
            nivel: 3,
            pergunta: "Qual expressão possui resultado igual a 1?",
            representacao: "Escolha uma expressão",
            alternativas: ["15⁰", "0⁶", "6¹", "(−1)³"],
            correta: "15⁰",
            dica:
                "Procure uma potência com base não nula e expoente zero.",
            explicacao:
                "Como 15 é diferente de zero, 15⁰ = 1.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        })
    ],


    /* =================================================
       MÓDULO 3 — POTÊNCIAS DE BASE 10
    ================================================= */

    baseDez: [

        criarQuestao({
            id: "dez-01",
            topico: "Cálculo",
            nivel: 1,
            pergunta: "Qual é o valor de 10²?",
            representacao: "10²",
            alternativas: ["100", "20", "10", "1 000"],
            correta: "100",
            dica:
                "O expoente indica a quantidade de fatores iguais a 10.",
            explicacao:
                "10² = 10 × 10 = 100.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-02",
            topico: "Cálculo",
            nivel: 1,
            pergunta: "Qual é o valor de 10⁴?",
            representacao: "10⁴",
            alternativas: [
                "10 000",
                "1 000",
                "40",
                "100 000"
            ],
            correta: "10 000",
            dica:
                "Uma potência de base 10 e expoente positivo forma o número 1 seguido de zeros.",
            explicacao:
                "10⁴ = 10 × 10 × 10 × 10 = 10 000.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-03",
            topico: "Representação",
            nivel: 1,
            pergunta:
                "Qual potência de base 10 representa o número 1 000?",
            representacao: "1 000",
            alternativas: ["10³", "10²", "10⁴", "10 × 3"],
            correta: "10³",
            dica:
                "Conte quantos zeros aparecem depois do número 1.",
            explicacao:
                "O número 1 000 possui três zeros. Portanto, 1 000 = 10³.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-04",
            topico: "Representação",
            nivel: 1,
            pergunta:
                "Qual número é representado por 10⁵?",
            representacao: "10⁵",
            alternativas: [
                "100 000",
                "10 000",
                "1 000 000",
                "50"
            ],
            correta: "100 000",
            dica:
                "Escreva o número 1 seguido de cinco zeros.",
            explicacao:
                "10⁵ é igual ao número 1 seguido de cinco zeros: 100 000.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-05",
            topico: "Decomposição",
            nivel: 2,
            pergunta: "Qual é o valor de 4 × 10³?",
            representacao: "4 × 10³",
            alternativas: ["4 000", "400", "40", "12 000"],
            correta: "4 000",
            dica:
                "Primeiro determine o valor de 10³.",
            explicacao:
                "Como 10³ = 1 000, temos 4 × 1 000 = 4 000.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-06",
            topico: "Decomposição",
            nivel: 2,
            pergunta:
                "Qual expressão representa o número 70 000?",
            representacao: "70 000",
            alternativas: [
                "7 × 10⁴",
                "7 × 10³",
                "70 × 10⁴",
                "7⁴"
            ],
            correta: "7 × 10⁴",
            dica:
                "Determine o valor correspondente a 10⁴.",
            explicacao:
                "Como 10⁴ = 10 000, então 7 × 10⁴ = 70 000.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-07",
            topico: "Sistema decimal",
            nivel: 2,
            pergunta:
                "Qual é o valor posicional do algarismo 6 no número 6 234?",
            representacao: "6 234",
            alternativas: [
                "6 × 10³",
                "6 × 10²",
                "6 × 10¹",
                "6 × 10⁴"
            ],
            correta: "6 × 10³",
            dica:
                "O algarismo 6 ocupa a ordem dos milhares.",
            explicacao:
                "O algarismo 6 representa 6 000, que pode ser escrito como 6 × 10³.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-08",
            topico: "Decomposição decimal",
            nivel: 3,
            pergunta:
                "Qual é a decomposição correta do número 3 205?",
            representacao: "3 205",
            alternativas: [
                "3 × 10³ + 2 × 10² + 5 × 10⁰",
                "3 × 10² + 2 × 10¹ + 5 × 10⁰",
                "3 × 10³ + 2 × 10¹ + 5 × 10⁰",
                "3 × 10⁴ + 2 × 10³ + 5 × 10²"
            ],
            correta:
                "3 × 10³ + 2 × 10² + 5 × 10⁰",
            dica:
                "Observe a posição ocupada por cada algarismo.",
            explicacao:
                "3 205 = 3 × 1 000 + 2 × 100 + 0 × 10 + 5 × 1. Portanto, 3 205 = 3 × 10³ + 2 × 10² + 5 × 10⁰.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-09",
            topico: "Comparação",
            nivel: 2,
            pergunta:
                "Qual potência representa o maior número?",
            representacao: "10³     10⁵     10²     10⁴",
            alternativas: ["10⁵", "10⁴", "10³", "10²"],
            correta: "10⁵",
            dica:
                "Para potências de mesma base maior que 1, compare os expoentes.",
            explicacao:
                "Como todas possuem base 10, a potência de maior expoente possui o maior valor. Portanto, 10⁵ é a maior.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "dez-10",
            topico: "Problema",
            nivel: 3,
            pergunta:
                "Um arquivo possui 2 × 10⁶ bytes. Quantos bytes ele possui?",
            representacao: "2 × 10⁶ bytes",
            alternativas: [
                "2 000 000 bytes",
                "200 000 bytes",
                "20 000 000 bytes",
                "12 000 000 bytes"
            ],
            correta: "2 000 000 bytes",
            dica:
                "10⁶ corresponde ao número 1 seguido de seis zeros.",
            explicacao:
                "Como 10⁶ = 1 000 000, temos 2 × 10⁶ = 2 000 000 bytes.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        })
    ],


    /* =================================================
       MÓDULO 4 — PROPRIEDADES
    ================================================= */

    propriedades: [

        criarQuestao({
            id: "pro-01",
            topico: "Produto de potências",
            nivel: 1,
            pergunta:
                "Qual é a forma simplificada de 2³ × 2⁴?",
            representacao: "2³ × 2⁴",
            alternativas: ["2⁷", "4⁷", "2¹²", "4¹²"],
            correta: "2⁷",
            dica:
                "Observe que as potências possuem a mesma base.",
            explicacao:
                "No produto de potências de mesma base, conservamos a base e somamos os expoentes: 2³ × 2⁴ = 2³⁺⁴ = 2⁷.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-02",
            topico: "Produto de potências",
            nivel: 1,
            pergunta: "Simplifique a⁵ × a².",
            representacao: "a⁵ × a²",
            alternativas: ["a⁷", "a¹⁰", "2a⁷", "a³"],
            correta: "a⁷",
            dica:
                "As duas potências possuem a mesma base.",
            explicacao:
                "Conservamos a base a e somamos os expoentes: a⁵ × a² = a⁵⁺² = a⁷.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-03",
            topico: "Quociente de potências",
            nivel: 1,
            pergunta:
                "Qual é a forma simplificada de 5⁸ ÷ 5³?",
            representacao: "5⁸ ÷ 5³",
            alternativas: ["5⁵", "5¹¹", "1⁵", "5²⁴"],
            correta: "5⁵",
            dica:
                "As potências possuem a mesma base e estão sendo divididas.",
            explicacao:
                "No quociente de potências de mesma base, conservamos a base e subtraímos os expoentes: 5⁸ ÷ 5³ = 5⁸⁻³ = 5⁵.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-04",
            topico: "Quociente de potências",
            nivel: 1,
            pergunta: "Simplifique x⁶ ÷ x².",
            representacao: "x⁶ ÷ x²",
            alternativas: ["x⁴", "x³", "x⁸", "x¹²"],
            correta: "x⁴",
            dica:
                "Conserve a base x e considere os expoentes.",
            explicacao:
                "Subtraímos os expoentes: x⁶ ÷ x² = x⁶⁻² = x⁴.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-05",
            topico: "Potência de potência",
            nivel: 2,
            pergunta:
                "Qual é a forma simplificada de (3²)⁴?",
            representacao: "(3²)⁴",
            alternativas: ["3⁸", "3⁶", "3¹⁶", "12²"],
            correta: "3⁸",
            dica:
                "Existe uma potência elevada a outro expoente.",
            explicacao:
                "Na potência de potência, conservamos a base e multiplicamos os expoentes: (3²)⁴ = 3²·⁴ = 3⁸.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-06",
            topico: "Potência de potência",
            nivel: 2,
            pergunta:
                "Qual expressão é equivalente a (a³)²?",
            representacao: "(a³)²",
            alternativas: ["a⁶", "a⁵", "a⁹", "2a³"],
            correta: "a⁶",
            dica:
                "Observe os dois expoentes presentes na expressão.",
            explicacao:
                "Multiplicamos os expoentes: (a³)² = a³·² = a⁶.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-07",
            topico: "Potência de um produto",
            nivel: 2,
            pergunta:
                "Qual expressão é equivalente a (2 × 5)³?",
            representacao: "(2 × 5)³",
            alternativas: [
                "2³ × 5³",
                "2³ × 5",
                "2 × 5³",
                "2⁵ × 5²"
            ],
            correta: "2³ × 5³",
            dica:
                "O expoente atua sobre todos os fatores que estão dentro dos parênteses.",
            explicacao:
                "Na potência de um produto, elevamos cada fator ao expoente: (2 × 5)³ = 2³ × 5³.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-08",
            topico: "Potência de um quociente",
            nivel: 2,
            pergunta:
                "Qual expressão é equivalente a (6 ÷ 3)²?",
            representacao: "(6 ÷ 3)²",
            alternativas: [
                "6² ÷ 3²",
                "6² ÷ 3",
                "6 ÷ 3²",
                "6³ ÷ 3²"
            ],
            correta: "6² ÷ 3²",
            dica:
                "O expoente atua sobre os dois termos do quociente.",
            explicacao:
                "Na potência de um quociente, elevamos o dividendo e o divisor ao mesmo expoente: (6 ÷ 3)² = 6² ÷ 3².",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-09",
            topico: "Desafio combinado",
            nivel: 3,
            pergunta:
                "Simplifique (2³ × 2²) ÷ 2⁴.",
            representacao: "(2³ × 2²) ÷ 2⁴",
            alternativas: ["2", "2⁵", "2⁹", "1"],
            correta: "2",
            dica:
                "Resolva primeiro o produto e depois o quociente.",
            explicacao:
                "(2³ × 2²) ÷ 2⁴ = 2³⁺²⁻⁴ = 2¹ = 2.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        }),

        criarQuestao({
            id: "pro-10",
            topico: "Análise de erro",
            nivel: 3,
            pergunta:
                "Um aluno afirmou que 3² × 3⁴ = 9⁶. Qual é a correção adequada?",
            representacao: "3² × 3⁴",
            alternativas: [
                "3² × 3⁴ = 3⁶",
                "3² × 3⁴ = 9⁸",
                "3² × 3⁴ = 6⁶",
                "3² × 3⁴ = 3⁸"
            ],
            correta: "3² × 3⁴ = 3⁶",
            dica:
                "Verifique se a base deve ser conservada ou multiplicada.",
            explicacao:
                "Como as bases são iguais, conservamos a base 3 e somamos os expoentes: 3² × 3⁴ = 3²⁺⁴ = 3⁶.",
            videoPergunta:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoDica:
                "https://www.youtube.com/embed/r9AoQVkUUvU",
            videoExplicacao:
                "https://www.youtube.com/embed/r9AoQVkUUvU"
        })
    ]
};


/* =====================================================
   ESTADO DO JOGO
===================================================== */

const QUANTIDADE_POR_PARTIDA = 10;
const TOTAL_VIDAS = 3;

let moduloAtual = "potenciacao";
let questoesDaPartida = [];
let indiceQuestao = 0;
let pontos = 0;
let vidas = TOTAL_VIDAS;
let sequenciaAcertos = 0;
let respostaBloqueada = false;
let dicaUtilizada = false;
let resultadosDaPartida = [];

const elementos = {};

/* =====================================================
   ARQUIVOS E TÍTULOS DOS MÓDULOS
===================================================== */

const arquivosDosModulos = {
    revisaoMultiplicacao: "jogo_potenciacao_revisao_multiplicacao.html",
    potenciacao: "jogo_potenciacao.html",
    casosEspeciais: "jogo_potenciacao_casos_especiais.html",
    baseDez: "jogo_potenciacao_base_10.html",
    propriedades: "jogo_potenciacao_propriedades.html"
};

function obterModuloPelaUrl() {
    const moduloDaConsulta =
        new URLSearchParams(window.location.search).get("modulo");

    if (bancoDeQuestoes[moduloDaConsulta]) {
        return moduloDaConsulta;
    }

    const arquivoAtual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    return Object.keys(arquivosDosModulos).find(function (modulo) {
        return arquivosDosModulos[modulo] === arquivoAtual;
    }) || null;
}

function atualizarTituloDaAba(modulo) {
    const configuracao = configuracaoModulos[modulo];

    if (!configuracao) return;

    document.title = configuracao.titulo + " | Reforça Libras";
}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicacao
);

function iniciarAplicacao() {
    localizarElementos();
    adicionarEventos();
    carregarModulosConcluidos();
    const moduloSolicitado = obterModuloPelaUrl();

    if (bancoDeQuestoes[moduloSolicitado]) {
        moduloAtual = moduloSolicitado;
    }

    iniciarPartida(moduloAtual);
}

function localizarElementos() {
    elementos.pontos =
        document.getElementById("pontos");

    elementos.questaoAtual =
        document.getElementById("questaoAtual");

    elementos.totalQuestoes =
        document.getElementById("totalQuestoes");

    elementos.tituloModulo =
        document.getElementById("tituloModulo");

    elementos.topico =
        document.getElementById("topicoPergunta");

    elementos.nivel =
        document.getElementById("nivelPergunta");

    elementos.instrucao =
        document.getElementById("instrucao");

    elementos.pergunta =
        document.getElementById("textoPergunta");

    elementos.representacao =
        document.getElementById("representacaoDesafio");

    elementos.alternativas =
        document.getElementById("alternativas");

    elementos.botaoDica =
        document.getElementById("botaoDica");

    elementos.areaDica =
        document.getElementById("areaDica");

    elementos.textoDica =
        document.getElementById("textoDica");

    elementos.video =
        document.getElementById("videoLibras");

    elementos.videoIndisponivel =
        document.getElementById("videoIndisponivel");

    elementos.repetirLibras =
        document.getElementById("botaoRepetirLibras");

    elementos.preenchimento =
        document.getElementById("preenchimentoProgresso");

    elementos.barraProgresso =
        document.getElementById("barraProgresso");

    elementos.porcentagem =
        document.getElementById("porcentagemProgresso");

    elementos.vidas =
        document.getElementById("vidas");

    elementos.sequencia =
        document.getElementById("valorSequencia");

    elementos.botaoVoltar =
        document.getElementById("botaoVoltar");

    elementos.botaoSair =
        document.getElementById("botaoSair");

    elementos.botoesModulo =
        document.querySelectorAll(".botao-modulo");
}

function adicionarEventos() {
    elementos.botaoDica.addEventListener(
        "click",
        alternarDica
    );

    elementos.repetirLibras.addEventListener(
        "click",
        repetirTraducao
    );

    elementos.botaoVoltar.addEventListener(
        "click",
        sairDoJogo
    );

    elementos.botaoSair.addEventListener(
        "click",
        sairDoJogo
    );

    elementos.botoesModulo.forEach(function (botao) {
        botao.addEventListener("click", function () {
            selecionarModulo(botao.dataset.modulo);
        });
    });
}


/* =====================================================
   EMBARALHAMENTO
===================================================== */

function embaralhar(lista) {
    const copia = [...lista];

    for (
        let indice = copia.length - 1;
        indice > 0;
        indice -= 1
    ) {
        const sorteado =
            Math.floor(Math.random() * (indice + 1));

        [copia[indice], copia[sorteado]] =
            [copia[sorteado], copia[indice]];
    }

    return copia;
}

function prepararPartida(questoesDoModulo) {
    const selecionadas = questoesDoModulo
        .slice(0, QUANTIDADE_POR_PARTIDA);

    return [1, 2, 3]
        .flatMap(function (nivel) {
            return embaralhar(
                selecionadas.filter(function (questao) {
                    return questao.nivel === nivel;
                })
            );
        })
        .map(function (questao) {
            return {
                ...questao,

                alternativasEmbaralhadas:
                    embaralhar(questao.alternativas)
            };
        });
}

function iniciarPartida(modulo) {
    moduloAtual = modulo;
    indiceQuestao = 0;
    pontos = 0;
    vidas = TOTAL_VIDAS;
    sequenciaAcertos = 0;
    respostaBloqueada = false;
    dicaUtilizada = false;
    resultadosDaPartida = [];

    questoesDaPartida = prepararPartida(
        bancoDeQuestoes[moduloAtual]
    );

    atualizarModuloAtivo();
    atualizarTituloDaAba(moduloAtual);
    mostrarQuestao();
}


/* =====================================================
   TROCA DE MÓDULO
===================================================== */

async function selecionarModulo(novoModulo) {
    if (!bancoDeQuestoes[novoModulo]) return;
    if (novoModulo === moduloAtual) return;

    if (resultadosDaPartida.length === 0) {
        iniciarPartida(novoModulo);
        return;
    }

    const resposta = await Swal.fire({
        icon: "question",
        title: "Trocar de módulo?",
        text:
            "A partida atual será encerrada e o novo módulo começará com outra ordem de questões.",
        showCancelButton: true,
        confirmButtonText: "Trocar módulo",
        cancelButtonText: "Continuar aqui",
        confirmButtonColor: "#1d3557",
        cancelButtonColor: "#64748b",
        customClass: {
            popup: "alerta-reforca"
        }
    });

    if (resposta.isConfirmed) {
        iniciarPartida(novoModulo);
    }
}

function atualizarModuloAtivo() {
    const configuracao =
        configuracaoModulos[moduloAtual];

    elementos.tituloModulo.textContent =
        configuracao.titulo;

    elementos.instrucao.textContent =
        configuracao.instrucao;

    elementos.botoesModulo.forEach(function (botao) {
        const ativo =
            botao.dataset.modulo === moduloAtual;

        botao.classList.toggle("ativo", ativo);
        botao.setAttribute(
            "aria-pressed",
            String(ativo)
        );

        const estado =
            botao.querySelector(".estado-modulo");

        if (estado && ativo) {
            estado.textContent = "▶";
        } else if (
            estado &&
            !botao.classList.contains("concluido")
        ) {
            estado.textContent = "○";
        }
    });
}


/* =====================================================
   EXIBIÇÃO DA QUESTÃO
===================================================== */

function mostrarQuestao() {
    const questao =
        questoesDaPartida[indiceQuestao];

    if (!questao) {
        finalizarPartida(true);
        return;
    }

    respostaBloqueada = false;
    dicaUtilizada = false;

    elementos.topico.textContent =
        questao.topico.toUpperCase();

    elementos.nivel.textContent =
        "NÍVEL " + questao.nivel;

    elementos.pergunta.textContent =
        questao.pergunta;

    elementos.representacao.textContent =
        questao.representacao;

    elementos.textoDica.textContent =
        questao.dica;

    elementos.areaDica.hidden = true;

    elementos.botaoDica.textContent =
        "💡 Ver dica";

    elementos.botaoDica.setAttribute(
        "aria-expanded",
        "false"
    );

    criarAlternativas(questao);

    carregarVideoLibras(
        questao.videoPergunta,
        "Tradução da pergunta em Libras"
    );

    atualizarStatus();
}

function criarAlternativas(questao) {
    elementos.alternativas.replaceChildren();

    const letras = ["A", "B", "C", "D"];

    questao.alternativasEmbaralhadas.forEach(
        function (alternativa, indice) {
            const botao =
                document.createElement("button");

            const letra =
                document.createElement("span");

            const texto =
                document.createElement("span");

            botao.type = "button";
            botao.className = "botao-alternativa";
            botao.dataset.resposta = alternativa;

            letra.className = "letra-alternativa";
            letra.textContent = letras[indice];

            texto.textContent = alternativa;

            botao.append(letra, texto);

            botao.addEventListener(
                "click",
                function () {
                    verificarResposta(
                        alternativa,
                        botao
                    );
                }
            );

            elementos.alternativas.appendChild(botao);
        }
    );
}


/* =====================================================
   DICA
===================================================== */

function alternarDica() {
    const questao =
        questoesDaPartida[indiceQuestao];

    const abrirDica =
        elementos.areaDica.hidden;

    elementos.areaDica.hidden = !abrirDica;

    elementos.botaoDica.textContent =
        abrirDica
            ? "💡 Ocultar dica"
            : "💡 Ver dica";

    elementos.botaoDica.setAttribute(
        "aria-expanded",
        String(abrirDica)
    );

    if (abrirDica) {
        dicaUtilizada = true;

        carregarVideoLibras(
            questao.videoDica,
            "Tradução da dica em Libras"
        );
    } else {
        carregarVideoLibras(
            questao.videoPergunta,
            "Tradução da pergunta em Libras"
        );
    }
}


/* =====================================================
   CORREÇÃO
===================================================== */

async function verificarResposta(
    respostaSelecionada,
    botaoSelecionado
) {
    if (respostaBloqueada) return;

    respostaBloqueada = true;

    const questao =
        questoesDaPartida[indiceQuestao];

    const acertou =
        respostaSelecionada === questao.correta;

    const botoes =
        elementos.alternativas.querySelectorAll(
            ".botao-alternativa"
        );

    botoes.forEach(function (botao) {
        botao.disabled = true;

        if (
            botao.dataset.resposta ===
            questao.correta
        ) {
            botao.classList.add("correta");
        } else if (botao === botaoSelecionado) {
            botao.classList.add("incorreta");
        } else {
            botao.classList.add("neutra");
        }
    });

    let pontosDaQuestao = 0;

    if (acertou) {
        sequenciaAcertos += 1;
        pontosDaQuestao = 10;

        if (sequenciaAcertos >= 3) {
            pontosDaQuestao += 2;
        }

        pontos += pontosDaQuestao;
    } else {
        sequenciaAcertos = 0;
        if (moduloAtual !== "revisaoMultiplicacao") {
            vidas -= 1;
        }
    }

    resultadosDaPartida.push({
        idQuestao: questao.id,
        ordemApresentada: indiceQuestao + 1,
        topico: questao.topico,
        nivel: questao.nivel,
        pergunta: questao.pergunta,
        respostaSelecionada: respostaSelecionada,
        respostaCorreta: questao.correta,

        alternativasApresentadas:
            [...questao.alternativasEmbaralhadas],

        acertou: acertou,
        dicaUtilizada: dicaUtilizada,
        pontosObtidos: pontosDaQuestao
    });

    atualizarStatus();

    await mostrarExplicacao(questao, acertou);

    if (vidas <= 0) {
        finalizarPartida(false);
        return;
    }

    indiceQuestao += 1;

    if (
        indiceQuestao >=
        questoesDaPartida.length
    ) {
        finalizarPartida(true);
        return;
    }

    mostrarQuestao();
}


/* =====================================================
   VÍDEOS DO YOUTUBE
===================================================== */

function criarEnderecoYouTube(
    endereco,
    reproducaoAutomatica = false
) {
    if (!endereco) return "";

    const separador =
        endereco.includes("?") ? "&" : "?";

    return endereco +
        separador +
        "rel=0&modestbranding=1" +
        (reproducaoAutomatica ? "&autoplay=1" : "");
}

function carregarVideoLibras(endereco, titulo) {
    pararVideoPrincipal();

    if (!endereco) {
        elementos.video.hidden = true;
        elementos.repetirLibras.hidden = true;
        elementos.videoIndisponivel.hidden = false;
        return;
    }

    elementos.video.title =
        titulo || "Tradução em Libras";

    elementos.video.src =
        criarEnderecoYouTube(endereco);

    elementos.video.hidden = false;
    elementos.repetirLibras.hidden = false;
    elementos.videoIndisponivel.hidden = true;
}

function pararVideoPrincipal() {
    if (!elementos.video) return;

    elementos.video.src = "";
}

function repetirTraducao() {
    const questao =
        questoesDaPartida[indiceQuestao];

    if (!questao) return;

    const dicaEstaAberta =
        !elementos.areaDica.hidden;

    const endereco = dicaEstaAberta
        ? questao.videoDica
        : questao.videoPergunta;

    const titulo = dicaEstaAberta
        ? "Tradução da dica em Libras"
        : "Tradução da pergunta em Libras";

    elementos.video.src = "";

    setTimeout(function () {
        elementos.video.title = titulo;

        elementos.video.src =
            criarEnderecoYouTube(endereco, true);
    }, 100);
}


/* =====================================================
   ALERTA DE EXPLICAÇÃO
===================================================== */

function montarConteudoExplicacao(questao) {
    let conteudo = `
        <div class="explicacao-resposta">

            <div class="texto-explicacao">
                ${questao.explicacao}
            </div>
    `;

    if (questao.videoExplicacao) {
        conteudo += `
            <iframe
                id="videoExplicacaoAlerta"
                class="video-explicacao"
                src="${criarEnderecoYouTube(
                    questao.videoExplicacao
                )}"
                title="Explicação da resposta em Libras"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>

            <button
                id="repetirExplicacaoAlerta"
                class="botao-alerta-repetir"
                type="button"
            >
                ↻ Repetir explicação em Libras
            </button>
        `;
    } else {
        conteudo += `
            <p class="aviso-video-explicacao">
                O vídeo com a explicação em Libras
                será inserido neste espaço.
            </p>
        `;
    }

    conteudo += "</div>";

    return conteudo;
}

function mostrarExplicacao(questao, acertou) {
    if (typeof Swal === "undefined") {
        window.alert(
            (
                acertou
                    ? "Resposta correta!\n\n"
                    : "Vamos revisar!\n\n"
            ) +
            questao.explicacao
        );

        return Promise.resolve();
    }

    return Swal.fire({
        icon: acertou ? "success" : "error",

        title: acertou
            ? "Resposta correta!"
            : "Vamos revisar!",

        html: montarConteudoExplicacao(questao),

        confirmButtonText: "Continuar",
        confirmButtonColor: "#1d3557",
        allowOutsideClick: false,
        allowEscapeKey: true,

        customClass: {
            popup: "alerta-reforca"
        },

        didOpen: function () {
            const video =
                document.getElementById(
                    "videoExplicacaoAlerta"
                );

            const repetir =
                document.getElementById(
                    "repetirExplicacaoAlerta"
                );

            if (!video || !repetir) return;

            repetir.addEventListener(
                "click",
                function () {
                    video.src = "";

                    setTimeout(function () {
                        video.src =
                            criarEnderecoYouTube(
                                questao.videoExplicacao,
                                true
                            );
                    }, 100);
                }
            );
        },

        willClose: function () {
            const video =
                document.getElementById(
                    "videoExplicacaoAlerta"
                );

            if (video) {
                video.src = "";
            }
        }
    });
}


/* =====================================================
   ATUALIZAÇÃO DO PAINEL
===================================================== */

function atualizarStatus() {
    const total = questoesDaPartida.length;

    elementos.pontos.textContent = pontos;

    elementos.questaoAtual.textContent =
        Math.min(indiceQuestao + 1, total);

    elementos.totalQuestoes.textContent = total;

    elementos.sequencia.textContent =
        sequenciaAcertos;

    atualizarVidas();

    const respondidas =
        resultadosDaPartida.length;

    const percentual = total > 0
        ? Math.round(
            (respondidas / total) * 100
        )
        : 0;

    elementos.preenchimento.style.width =
        percentual + "%";

    elementos.porcentagem.textContent =
        percentual + "%";

    elementos.barraProgresso.setAttribute(
        "aria-valuenow",
        String(percentual)
    );
}

function atualizarVidas() {
    elementos.vidas.replaceChildren();

    for (
        let indice = 0;
        indice < TOTAL_VIDAS;
        indice += 1
    ) {
        const coracao =
            document.createElement("span");

        coracao.setAttribute(
            "aria-hidden",
            "true"
        );

        coracao.textContent =
            indice < vidas ? "❤️" : "🩶";

        elementos.vidas.appendChild(coracao);
    }

    const textoAcessivel =
        document.createElement("span");

    textoAcessivel.className = "somente-leitor";

    textoAcessivel.textContent =
        vidas +
        (
            vidas === 1
                ? " vida restante"
                : " vidas restantes"
        );

    elementos.vidas.appendChild(
        textoAcessivel
    );
}


/* =====================================================
   ANÁLISE DOS RESULTADOS
===================================================== */

function analisarResultados() {
    const desempenhoPorTopico = {};

    resultadosDaPartida.forEach(
        function (resultado) {
            if (
                !desempenhoPorTopico[
                    resultado.topico
                ]
            ) {
                desempenhoPorTopico[
                    resultado.topico
                ] = {
                    acertos: 0,
                    erros: 0,
                    total: 0,
                    percentual: 0
                };
            }

            const dados =
                desempenhoPorTopico[
                    resultado.topico
                ];

            dados.total += 1;

            if (resultado.acertou) {
                dados.acertos += 1;
            } else {
                dados.erros += 1;
            }

            dados.percentual = Math.round(
                (
                    dados.acertos /
                    dados.total
                ) * 100
            );
        }
    );

    const dificuldades =
        Object.keys(
            desempenhoPorTopico
        ).filter(function (topico) {
            return (
                desempenhoPorTopico[
                    topico
                ].percentual < 70
            );
        });

    return {
        desempenhoPorTopico:
            desempenhoPorTopico,

        dificuldades:
            dificuldades
    };
}

function criarResultadoFinal(concluiu) {
    const acertos =
        resultadosDaPartida.filter(
            function (resultado) {
                return resultado.acertou;
            }
        ).length;

    const totalRespondido =
        resultadosDaPartida.length;

    const percentual =
        totalRespondido > 0
            ? Math.round(
                (
                    acertos /
                    totalRespondido
                ) * 100
            )
            : 0;

    const analise = analisarResultados();

    return {
        jogo: "jogo_matematica_potenciacao",
        tematica: "Potenciação",
        modulo: moduloAtual,

        nomeModulo:
            configuracaoModulos[
                moduloAtual
            ].titulo,

        conteudo:
            configuracaoModulos[
                moduloAtual
            ].conteudo,

        pontuacao: pontos,
        acertos: acertos,
        erros: totalRespondido - acertos,
        totalRespondido: totalRespondido,
        totalPrevisto: questoesDaPartida.length,
        percentual: percentual,
        vidasRestantes: vidas,
        concluido: concluiu,
        respostas: resultadosDaPartida,

        desempenhoPorTopico:
            analise.desempenhoPorTopico,

        dificuldades:
            analise.dificuldades,

        realizadoEm:
            new Date().toISOString()
    };
}


/* =====================================================
   SALVAMENTO LOCAL
===================================================== */

function obterChaveLocal(chaveBase) {
    if (
        typeof chaveLocalDoUsuario ===
        "function"
    ) {
        return chaveLocalDoUsuario(chaveBase);
    }

    return chaveBase + "_visitante";
}

function salvarResultadoLocal(resultado) {
    const chave = obterChaveLocal(
        "resultadosJogoPotenciacao"
    );

    let historico = [];

    try {
        historico =
            JSON.parse(
                localStorage.getItem(chave)
            ) || [];
    } catch (erro) {
        historico = [];
    }

    historico.push(resultado);

    localStorage.setItem(
        chave,
        JSON.stringify(historico)
    );
}

function marcarModuloConcluido(modulo) {
    const chave = obterChaveLocal(
        "modulosJogoPotenciacaoConcluidos"
    );

    let concluidos = [];

    try {
        concluidos =
            JSON.parse(
                localStorage.getItem(chave)
            ) || [];
    } catch (erro) {
        concluidos = [];
    }

    if (!concluidos.includes(modulo)) {
        concluidos.push(modulo);
    }

    localStorage.setItem(
        chave,
        JSON.stringify(concluidos)
    );

    carregarModulosConcluidos();
}

function carregarModulosConcluidos() {
    const chave = obterChaveLocal(
        "modulosJogoPotenciacaoConcluidos"
    );

    let concluidos = [];

    try {
        concluidos =
            JSON.parse(
                localStorage.getItem(chave)
            ) || [];
    } catch (erro) {
        concluidos = [];
    }

    elementos.botoesModulo.forEach(
        function (botao) {
            const concluido =
                concluidos.includes(
                    botao.dataset.modulo
                );

            botao.classList.toggle(
                "concluido",
                concluido
            );

            const estado =
                botao.querySelector(
                    ".estado-modulo"
                );

            if (
                estado &&
                concluido &&
                botao.dataset.modulo !==
                    moduloAtual
            ) {
                estado.textContent = "✓";
            }
        }
    );
}


/* =====================================================
   FIREBASE
===================================================== */

async function salvarResultadoFirebase(
    resultado
) {
    if (
        typeof auth === "undefined" ||
        typeof db === "undefined" ||
        !auth ||
        !db ||
        !auth.currentUser
    ) {
        return;
    }

    const usuario = auth.currentUser;

    const dados = {
        jogo: resultado.jogo,
        tematica: resultado.tematica,
        modulo: resultado.modulo,
        nomeModulo: resultado.nomeModulo,
        conteudo: resultado.conteudo,
        pontuacao: resultado.pontuacao,
        acertos: resultado.acertos,
        erros: resultado.erros,

        totalRespondido:
            resultado.totalRespondido,

        totalPrevisto:
            resultado.totalPrevisto,

        percentual: resultado.percentual,

        vidasRestantes:
            resultado.vidasRestantes,

        concluido: resultado.concluido,
        respostas: resultado.respostas,

        desempenhoPorTopico:
            resultado.desempenhoPorTopico,

        dificuldades:
            resultado.dificuldades,

        realizadoEm:
            firebase.firestore
                .FieldValue
                .serverTimestamp()
    };

    try {
        await db
            .collection("usuarios")
            .doc(usuario.uid)
            .collection("resultados")
            .add(dados);

        await atualizarMelhorPontuacao(
            usuario.uid,
            resultado
        );
    } catch (erro) {
        console.error(
            "Erro ao salvar o resultado no Firebase:",
            erro
        );
    }
}

async function atualizarMelhorPontuacao(
    uid,
    resultado
) {
    const referencia = db
        .collection("usuarios")
        .doc(uid)
        .collection("melhoresResultados")
        .doc(resultado.modulo);

    try {
        await db.runTransaction(
            async function (transacao) {
                const documento =
                    await transacao.get(
                        referencia
                    );

                const anterior =
                    documento.exists
                        ? documento.data()
                        : null;

                const deveAtualizar =
                    !anterior ||
                    resultado.pontuacao >
                        anterior.pontuacao;

                if (deveAtualizar) {
                    transacao.set(
                        referencia,
                        {
                            jogo:
                                resultado.jogo,

                            tematica:
                                resultado.tematica,

                            modulo:
                                resultado.modulo,

                            nomeModulo:
                                resultado.nomeModulo,

                            pontuacao:
                                resultado.pontuacao,

                            percentual:
                                resultado.percentual,

                            acertos:
                                resultado.acertos,

                            atualizadoEm:
                                firebase.firestore
                                    .FieldValue
                                    .serverTimestamp()
                        }
                    );
                }
            }
        );
    } catch (erro) {
        console.error(
            "Erro ao atualizar a melhor pontuação:",
            erro
        );
    }
}


/* =====================================================
   FINALIZAÇÃO
===================================================== */

async function finalizarPartida(concluiu) {
    if (moduloAtual === "revisaoMultiplicacao") {
        concluiu =
            resultadosDaPartida.length === questoesDaPartida.length;
    }

    pararVideoPrincipal();

    const resultado =
        criarResultadoFinal(concluiu);

    salvarResultadoLocal(resultado);

    if (concluiu) {
        marcarModuloConcluido(moduloAtual);

        if (moduloAtual === "revisaoMultiplicacao") {
            liberarAulaDois();
        }
    }

    salvarResultadoFirebase(resultado);

    const revisaoConcluida =
        moduloAtual === "revisaoMultiplicacao" && concluiu;

    const titulo = revisaoConcluida
        ? "Revisão de multiplicação concluída!"
        : concluiu
        ? "Módulo concluído!"
        : "Suas vidas terminaram";

    const mensagem =
        "Você acertou <strong>" +
        resultado.acertos +
        " de " +
        resultado.totalRespondido +
        "</strong> desafios.<br>" +
        "Pontuação: <strong>" +
        resultado.pontuacao +
        " pontos</strong>.<br>" +
        "Aproveitamento: <strong>" +
        resultado.percentual +
        "%</strong>.";

    const resposta = await Swal.fire({
        icon: concluiu
            ? "success"
            : "warning",

        title: titulo,
        html: mensagem,
        showDenyButton: true,
        showCancelButton: true,

        confirmButtonText: revisaoConcluida
            ? "Continuar para a Aula 2"
            : "Jogar novamente",

        denyButtonText:
            "Escolher outro módulo",

        cancelButtonText:
            "Avaliar o jogo",

        confirmButtonColor:
            "#1d3557",

        denyButtonColor:
            "#5fa8d3",

        cancelButtonColor:
            "#d9a900",

        allowOutsideClick: false,

        customClass: {
            popup: "alerta-reforca"
        }
    });

    if (resposta.isConfirmed) {
        if (revisaoConcluida) {
            window.location.href = "potenciacao.html#aula-2";
            return;
        }

        iniciarPartida(moduloAtual);
        return;
    }

    if (resposta.isDenied) {
        rolarParaMapaNoCelular();
        return;
    }

    window.location.href =
        "index.html#avaliacao";
}

function liberarAulaDois() {
    const chave = obterChaveLocal("progressoCursoPotenciacao");
    let progresso;

    try {
        progresso = JSON.parse(localStorage.getItem(chave));
    } catch (erro) {
        progresso = null;
    }

    if (!progresso || progresso.versao !== 2) {
        progresso = {
            versao: 2,
            etapaLiberada: 1,
            aulasAssistidas: [1],
            concluidas: []
        };
    }

    if (!progresso.aulasAssistidas.includes(1)) {
        progresso.aulasAssistidas.push(1);
    }

    if (!progresso.concluidas.includes(1)) {
        progresso.concluidas.push(1);
    }

    progresso.etapaLiberada = Math.max(
        Number(progresso.etapaLiberada) || 1,
        2
    );

    localStorage.setItem(chave, JSON.stringify(progresso));
}

function rolarParaMapaNoCelular() {
    const mapa =
        document.querySelector(
            ".mapa-modulos"
        );

    if (mapa) {
        mapa.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* =====================================================
   SAÍDA DO JOGO
===================================================== */

const VIDEO_ALERTA_SAIDA =
    "https://www.youtube.com/embed/r9AoQVkUUvU";

function montarConteudoSaida(mensagem) {
    return `
        <div class="explicacao-resposta">
            <div class="texto-explicacao">
                ${mensagem}
            </div>

            <iframe
                id="videoSaidaAlerta"
                class="video-explicacao"
                src="${criarEnderecoYouTube(VIDEO_ALERTA_SAIDA)}"
                title="Tradução do alerta de saída em Libras"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>

            <button
                id="repetirSaidaAlerta"
                class="botao-alerta-repetir"
                type="button"
            >
                ↻ Repetir tradução em Libras
            </button>
        </div>
    `;
}

async function sairDoJogo() {
    const mensagem = resultadosDaPartida.length > 0
        ? "O progresso desta partida ainda não foi concluído."
        : "Deseja sair do jogo e voltar para a trilha de Potenciação?";

    const resposta = await Swal.fire({
        icon: "question",
        title: "Sair do jogo?",
        html: montarConteudoSaida(mensagem),
        showCancelButton: true,
        confirmButtonText: "Sair",
        cancelButtonText:
            "Continuar jogando",
        confirmButtonColor: "#d94b4b",
        cancelButtonColor: "#1d3557",

        customClass: {
            popup: "alerta-reforca"
        },

        didOpen: function () {
            const video =
                document.getElementById("videoSaidaAlerta");

            const repetir =
                document.getElementById("repetirSaidaAlerta");

            if (!video || !repetir) return;

            repetir.addEventListener("click", function () {
                video.src = "";

                setTimeout(function () {
                    video.src = criarEnderecoYouTube(
                        VIDEO_ALERTA_SAIDA,
                        true
                    );
                }, 100);
            });
        },

        willClose: function () {
            const video =
                document.getElementById("videoSaidaAlerta");

            if (video) {
                video.src = "";
            }
        }
    });

    if (resposta.isConfirmed) {
        voltarParaTrilha();
    }
}

function voltarParaTrilha() {
    pararVideoPrincipal();

    window.location.href =
        "potenciacao.html";
}
