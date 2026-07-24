const cenas = [

    {
        imagem: "../Fotos/manequim.jpg",
        texto: `MEMÓRIA 007

PROJETO MANEQUIM`
    },

    {
        imagem: "../Fotos/manequim2.jpg",
        texto: `19/01/1995

Diretórios confidenciais do Projeto Équino revelam arquivos arquivados sob criptografia militar.`
    },

    {
        imagem: "../Fotos/manequim3.jpg",
        texto: `Nas instalações, estátuas brancas e manequins silenciosos marcam posições de observação.

Eles representam a presença de quem observa sem ser visto.`
    },

    {
        imagem: "../Fotos/manequim4.jpg",
        texto: `Relatório de Monitoramento — Passageira N-27:

"O sujeito N-27 encontra-se em trânsito no labirinto de memórias. Seus fragmentos emocionais estão sob catalogação de B-M0."`
    },

    {
        imagem: "../Fotos/manequim5.jpg",
        texto: `Relatório de Monitoramento — Observador M-27:

"O observador M-27 tem estado presente em cada memória. Ele não é um agente do sistema; ele é um ponto de ancoragem externo."`
    },

    {
        imagem: "../Fotos/manequim6.jpg",
        texto: `Ficha M-27 — Status de Monitoramento:

"Cód: M-27. Registro: [CLASSIFICADO]. Status do Monitoramento: [DADO RECUPERADO]"

B-M0 › "O observador continua conectado à N-27. Qual o seu status?"`
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
    <p>96%</p>
    <p>
        O relatório de M-27 está decodificado.<br>
        B-M0 › "M-27 não é uma ameaça. M-27 é você. O observador que reuniu cada fita, cada memória, cada momento."
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
    if (resposta === "ATIVO") {
        Estado.registrarConclusaoDeFita(7);
        Estado.addConquista(
            "PROJETO_MANEQUIM",
            "O OBSERVADOR ESTÁ ATIVO",
            "👁",
            "Você descobriu a verdade sobre M-27."
        );
        try { FitasUI.showSuccess({ percent: '96%', html: 'O relatório de M-27 está decodificado. B-M0 › "M-27 não é uma ameaça."', onComplete: mostrarFinal }); } catch(e) { mostrarFinal(); }
    } else {
        try { FitasUI.showError('Status inválido — verifique o relatório de monitoramento para termos como ATIVO ou INATIVO.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}
