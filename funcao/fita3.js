const cenas = [

    {
        imagem: "../Fotos/escrivaninha.png",
        texto: `MEMÓRIA 003

CARTA EXTRAVIADA`
    },

    {
        imagem: "../Fotos/escrivaninha.png",
        texto: `14/11/1994

Um envelope lacrado foi encontrado sobre a escrivaninha de N-27.

Não havia remetente nem destinatário.`
    },

    {
        imagem: "../Fotos/carta.png",
        texto: `O papel parecia antigo, mas a tinta parecia quase fresca.

O selo no canto do envelope exibia um desenho familiar: uma ave de rapina noturna.`
    },

    {
        imagem: "../Fotos/carta-aberta.png",
        texto: `Ao abrir, o conteúdo dizia:

"Não importa o quão escuro fique o corredor, eu sei que você está vigiando. Como uma coruja que guia o viajante no meio do silêncio."`
    },

    {
        imagem: "../Fotos/carta-aberta.png",
        texto: `O restante do texto está ilegível, consumido por estática analógica.

B-M0 › "Identifique a palavra que se repete em todas as fitas para restaurar o arquivo."`
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
    <p>37%</p>
    <p>
        A carta foi restaurada. N-27 valorizava cada palavra escrita à mão.<br>
        B-M0 › "A coruja esteve em todos os registros. Ela guia. Ela observa. Ela conecta."
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
    if (resposta === "CORUJA") {
        Estado.registrarConclusaoDeFita(3);
        try { FitasUI.showSuccess({ percent: '37%', html: 'A carta foi restaurada. B-M0 › "A coruja esteve em todos os registros."', onComplete: mostrarFinal }); } catch(e) { mostrarFinal(); }
    } else {
        try { FitasUI.showError('Resposta não reconhecida — pense em aves noturnas com visão aguçada.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}
