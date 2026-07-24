const cenas = [

    {
        imagem: "../Fotos/restaurante.png",
        texto: `MEMÓRIA 002

MAR ABERTO`
    },

    {
        imagem: "../Fotos/restaurante.png",
        texto: `17/04/1994

O estabelecimento foi encontrado vazio.

Nenhum registro de saída foi localizado.`
    },

    {
        imagem: "../Fotos/cardapio.png",
        texto: `O cardápio permaneceu intacto.

Nenhum item foi removido.`
    },

    {
        imagem: "../Fotos/aquario.png",
        texto: `O aquário continuava iluminado.

Não havia peixes.

Mesmo assim...

Algo parecia se mover na água.`
    },

    {
        imagem: "../Fotos/cardapio-corrompido.png",
        texto: `O arquivo sofreu degradação.

Uma entrada do cardápio permanece legível.

B-M0 › "O predador foi fragmentado. Reconstrua o nome: T - R - A - O - U - B - A"`
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
    <p>24%</p>
    <p>
        O predador era apenas um detalhe.<br>
        N-27 parecia fascinada pela imensidão e pela força das profundezas.<br>
        B-M0 › "O observador M-27 anotou: ela sempre gostou da quietude do mar aberto."
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
    if (resposta === "TUBARAO" || resposta === "TUBARÃO") {
        Estado.registrarConclusaoDeFita(2);
        try {
            FitasUI.showSuccess({ percent: '24%', html: 'O predador foi reconstruído. B‑M0 › "O observador M-27 anotou: ela sempre gostou da quietude do mar aberto."', onComplete: mostrarFinal });
        } catch (e) { mostrarFinal(); }

    } else {
        try { FitasUI.showError('Nome incorreto — reconstrua a palavra completa sem hífens.'); } catch(e) { alert('Resposta incorreta.'); }
    }
}