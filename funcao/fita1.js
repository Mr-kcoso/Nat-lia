const cenas = [

    {
        imagem: "../piano.png",
        texto: `MEMÓRIA 001

A MELODIA QUE NINGUÉM TOCOU`
    },

    {
        imagem: "../piano.png",
        texto: `03/10/1994

Estúdio 04.

Nenhum operador presente.`
    },

    {
        imagem: "../piano.png",
        texto: `03:17

As teclas começaram a afundar sozinhas.`
    },

    {
        imagem: "../piano.png",
        texto: `Objeto identificado:

SÉRIE N-27`
    },

    {
        imagem: "../partitura.png",
        texto: `A gravação foi interrompida.

A melodia parece incompleta.

B-M0 › "Identifique a nota ausente para restaurar o arquivo."`
    }

];

let cenaAtual = 0;

const imagem   = document.getElementById("imagemCena");
const texto    = document.getElementById("texto");
const botao    = document.getElementById("continuar");
const enigma   = document.getElementById("enigma");

function carregarCena() {
    imagem.src       = cenas[cenaAtual].imagem;
    texto.innerHTML  = cenas[cenaAtual].texto;
}

function proximaCena() {
    cenaAtual++;
    if (cenaAtual < cenas.length) {
        carregarCena();
    } else {
        botao.style.display   = "none";
        enigma.style.display  = "block";
    }
}

carregarCena();

function verificarResposta() {

    const input    = document.getElementById("resposta").value.trim();
    const resposta = input.toUpperCase();

    // gamified encouragement
    try { FitasUI.showEncouragement(); } catch(e){}

    // ── Verificar senha secreta ──────────────────────────────────
    const msgSecreta = Estado.verificarSenhaSecreta(resposta);
    if (msgSecreta) {
        Estado.mostrarMensagemSecreta(msgSecreta);
        return; // Não avança a fita
    }

    // ── Resposta correta ─────────────────────────────────────────
    if (resposta === "D") {
        Estado.registrarConclusaoDeFita(1);
        try {
            FitasUI.showSuccess({ percent: '12%', html: 'O piano guardava uma nota que ninguém tocou ainda.<br>B-M0 › "Interessante. N-27 conhecia esta melodia de memória."', onComplete: () => { location.href = '../menu.html'; } });
        } catch (e) {
            location.href = '../menu.html';
        }

    } else {
        try { FitasUI.showError('Fragmento inválido — tente observar a partitura e identificar a nota de transição .'); } catch(e) { alert('Resposta incorreta.'); }
    }
}