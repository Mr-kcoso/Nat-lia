const cenas = [

    {
        imagem: "../figura.png",
        texto: `MEMÓRIA 004

VOLTERRA`
    },

    {
        imagem: "../figura2.png",
        texto: `27/12/1994

Uma antiga praça na cidade de Volterra, Itália.

Sob o brilho de uma lua avermelhada, o silêncio é quase absoluto.`
    },

    {
        imagem: "../figura3.jpg",
        texto: `Nas sombras das colunas de pedra, uma silhueta misteriosa observa.

Sua postura é perfeitamente estática, indiferente ao passar das horas.`
    },

    {
        imagem: "../figura4.jpg",
        texto: `O sistema de vigilância arquivou a sequência.

Os relatórios indicam que todos os transeuntes se dispersaram com o tempo. Apenas uma presença não alterou sua posição.`
    },

    {
        imagem: "../figura4.jpg",
        texto: `B-M0 reporta:

"O observador M-27 mantém o monitoramento constante sobre N-27. A conexão permanece estável."

B-M0 › "O que permaneceu igual em todas as gravações?"`
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
    <p>51%</p>
    <p>
        A figura foi catalogada. N-27 sempre teve fascínio pela cidade de Volterra.<br>
        B-M0 › "M-27 escreveu: ela gosta de Volterra. A sensação de que o tempo não passa por lá a acalma."
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
    if (resposta === "FIGURA" || resposta === "A FIGURA") {
        Estado.registrarConclusaoDeFita(4);
        try { FitasUI.showSuccess({ percent: '51%', html: 'A figura foi catalogada. B-M0 › "M-27 escreveu: ela gosta de Volterra."', onComplete: mostrarFinal }); } catch(e) { mostrarFinal(); }
    } else {
        try { FitasUI.showError('Resposta inválida — lembre-se: pense na figura descrita, não em interpretações simbólicas.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}
