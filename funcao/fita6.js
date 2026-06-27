const cenas = [

    {
        imagem: "../006.jpg",
        texto: `MEMÓRIA 006

SINAL PERDIDO`
    },

    {
        imagem: "../0062.jpg",
        texto: `12/01/1995

O sinal analógico está se degradando rapidamente nas profundezas das Backrooms.

A estática está consumindo a integridade dos dados.`
    },

    {
        imagem: "../0063.jpg",
        texto: `Nas paredes úmidas do labirinto, mensagens rabiscadas aparecem na estática:

"Não se esqueça do dia 27. A coruja² guia o observador no escuro."`
    },

    {
        imagem: "../0064.jpg",
        texto: `B-M0 começa a demonstrar falhas graves de cognição:

"Eu... eu me lembro de algo. Um filme compartilhado? Uma piada sobre corujas? Meus bancos de dados estão misturando memórias pessoais com dados técnicos."`
    },

    {
        imagem: "../0065.jpg",
        texto: `Sinal corrompido. A conexão de vídeo caiu.

B-M0 › "Digite a palavra-chave de ancoragem que conecta todos os registros para ressincronizar o sistema."`
    }

];

let cenaAtual = 0;

const imagem  = document.getElementById("imagemCena");
const texto   = document.getElementById("texto");
const botao   = document.getElementById("continuar");
const enigma  = document.getElementById("enigma");

function carregarCena() {
    imagem.src      = cenas[cenaAtual].imagem;
    texto.innerHTML = cenas[cenaAtual].texto;
}

function proximaCena() {
    cenaAtual++;
    if (cenaAtual < cenas.length) {
        carregarCena();
    } else {
        botao.style.display  = "none";
        enigma.style.display = "block";
    }
}

carregarCena();

function mostrarFinal() {
    document.body.innerHTML = `
<div class="fita-container">
    <h1>MEMÓRIA RECUPERADA</h1>
    <p>83%</p>
    <p>
        Sinal reestabelecido. B-M0 sussurra: "A coruja... ela sempre nos mantém juntos."<br>
        B-M0 › "O sinal está fraco, mas consigo ouvi-la. A verdade está perto."
    </p>
    <button onclick="location.href='../menu.html'">
        RETORNAR
    </button>
</div>`;
}

function verificarResposta() {

    const input    = document.getElementById("resposta").value.trim();
    const resposta = input.toUpperCase();

    try { FitasUI.showEncouragement(); } catch(e){}
    // ── Verificar senha secreta ──────────────────────────────────
    const msgSecreta = Estado.verificarSenhaSecreta(resposta);
    if (msgSecreta) {
        Estado.mostrarMensagemSecreta(msgSecreta);
        return;
    }

    // ── Resposta correta ─────────────────────────────────────────
    if (resposta === "CORUJA²") {
        Estado.registrarConclusaoDeFita(6);
        try { FitasUI.showSuccess({ percent: '83%', html: 'Sinal reestabelecido. B-M0 › "A coruja... ela sempre nos mantém juntos."', onComplete: mostrarFinal }); } catch(e) { mostrarFinal(); }
    } else {
        try { FitasUI.showError('Chave de ancoragem inválida — tente diferentes variações do símbolo ou palavra.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}
