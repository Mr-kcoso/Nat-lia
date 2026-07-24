const cenas = [

    {
        imagem: "../Fotos/plataforma.jpg",
        texto: `MEMÓRIA 005

PLATAFORMA 9`
    },

    {
        imagem: "../Fotos/plataforma2.jpg",
        texto: `05/01/1995

Uma estação de trem deserta na calada da noite.

N-27 portava apenas um bilhete de viagem e uma maleta.`
    },

    {
        imagem: "../Fotos/plataforma3.jpg",
        texto: `O relógio no topo do painel marcava exatamente 22:27.

O ar parecia denso, carregado de estática. N-27 seguiu pelo corredor em direção ao ponto de embarque.`
    },

    {
        imagem: "../Fotos/plataforma4.jpg",
        texto: `Ao passar pela Plataforma 9, as luzes piscaram e o cenário se desfez.

As paredes amarelas, o piso úmido, o zumbido incessante das lâmpadas fluorescentes...`
    },

    {
        imagem: "../Fotos/plataforma5.jpg",
        texto: `O sistema de B-M0 perdeu a rastreabilidade direta.

"N-27 entrou nas Backrooms. O observador M-27 seguiu imediatamente para o mesmo setor para manter contato."

B-M0 › "Qual é o número de identificação do setor?"`
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
    <p>69%</p>
    <p>
        O portal se fechou. As Backrooms são a manifestação física dos esquecimentos de N-27.<br>
        B-M0 › "M-27 escreveu: ela se perdeu no labirinto amarelo, mas eu a estou seguindo. Não vou deixá-la sozinha lá."
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
    if (input === "27") {
        Estado.registrarConclusaoDeFita(5);
        try { FitasUI.showSuccess({ percent: '69%', html: 'O portal se fechou. B‑M0 › "M-27 escreveu: ela se perdeu no labirinto amarelo."', onComplete: mostrarFinal }); } catch(e) { mostrarFinal(); }
    } else {
        try { FitasUI.showError('Número incorreto — verifique relatórios e códigos mencionados nas cenas.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}
