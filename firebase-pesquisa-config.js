// Mesmo projeto, mas sessão administrativa independente do login dos alunos.
// As opções são públicas de conexão; nenhuma senha é armazenada neste arquivo.
const appPesquisaPrivada = firebase.apps.find(app=>app.name==='pesquisaPrivada') ||
    firebase.initializeApp(firebaseConfig,'pesquisaPrivada');
const authPesquisa = appPesquisaPrivada.auth();
const dbPesquisa = appPesquisaPrivada.firestore();
