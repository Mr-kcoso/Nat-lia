const cenas = [

    {
        imagem: "../Fotos/piano.png",
        texto: `ARQUIVO FINAL

SALA 27

B-M0 sussurra:
"Eu consegui alinhar todos os setores. O labirinto analógico está desfeito. A memória principal finalmente foi restaurada."`
    },

    {
        imagem: "../Fotos/carta-aberta.png",
        texto: `B-M0 continua:
"Natalia... você não estava perdida. E M-27 não estava vigiando você por motivos corporativos.

Estas fitas nunca foram sobre um mistério ou um desaparecimento. Elas foram criadas para que você lembrasse de algo muito importante."`
    },

    {
        imagem: "../Fotos/final.png",
        texto: `O Projeto Équino não foi um experimento militar de 1994.

Foi uma forma de eternizar os momentos felizes. Cada detalhe: o piano, o restaurante de sushi, as cartas escritas com carinho, a lua de Volterra, a coruja observadora...

Tudo são partes de uma história compartilhada.`
    },

    {
        imagem: "../Fotos/final.png",
        texto: `O sistema está 100% restaurado.

B-M0 online e operando perfeitamente.

O observador M-27 e a passageira N-27 estão conectados.

A mensagem final está pronta para ser lida.`
    }

];

let cenaAtual = 0;

const imagem   = document.getElementById("imagemCena");
const texto    = document.getElementById("texto");
const botao    = document.getElementById("continuar");
const conclusao = document.getElementById("conclusao");

function carregarCena() {
    imagem.src      = cenas[cenaAtual].imagem;
    texto.innerHTML = cenas[cenaAtual].texto;
}

function proximaCena() {
    cenaAtual++;
    if (cenaAtual < cenas.length) {
        carregarCena();
    } else {
        botao.style.display    = "none";
        conclusao.style.display = "block";
    }
}

carregarCena();

function revelarMensagemFinal() {

    // Registrar conclusão e afinidade final
    Estado.registrarConclusaoDeFita(8);

    // Conquista do arquivista completo
    Estado.addConquista(
        "ARQUIVISTA_COMPLETO",
        "ARQUIVISTA COMPLETO",
        "📼",
        "Todas as memórias foram restauradas."
    );

    const estadoFinal = Estado.get();
    const afinidades  = estadoFinal.afinidades || [];
    const conquistas  = estadoFinal.conquistas || [];

    // Gerar relatório de reconstrução com as afinidades coletadas
    const listaAfinidades = afinidades.length > 0
        ? afinidades.map(a => `<li>✓ ${a}</li>`).join("")
        : "<li>— Nenhuma afinidade registrada —</li>";

    const listaConquistas = conquistas.length > 0
        ? conquistas.map(c => `<li>${c.icone} ${c.nome}</li>`).join("")
        : "";

    document.body.innerHTML = `
<div class="fita-container" style="max-width: 700px; text-align: center;">

    <h1 style="color: #ff2a2a; text-shadow: 0 0 10px rgba(255, 42, 42, 0.8);">
        FELIZ MÊS-VERSÁRIO! ❤️
    </h1>

    <img src="../Fotos/final.png" style="width: 100%; max-height: 300px; object-fit: contain; border: 1px solid #ff2a2a; box-shadow: 0 0 20px rgba(255, 42, 42, 0.5); margin: 15px 0;">

    <div style="font-size: 1.1rem; line-height: 1.9; text-align: justify; background: rgba(12,12,12,0.9); padding: 20px; border: 1px solid #444; border-left: 3px solid #ff2a2a; margin-bottom: 20px;">
        <p style="margin-top: 0;"><strong>Natalia (N-27),</strong></p>
        <p>O Projeto Équino foi uma jornada criada para resgatar as memórias que construímos e que continuamos a construir juntos. Cada fita representa um fragmento de nossos sorrisos, das nossas piadas internas, das conversas marcantes e de cada momento especial do nosso relacionamento.</p>
        <p>Eu, o observador <strong>M-27</strong>, sempre estive e sempre estarei aqui ao seu lado, acompanhando seus passos com todo o amor do mundo, te apoiando e guardando cada lembrança nossa como o tesouro mais valioso de todos.</p>
        <p style="margin-bottom: 0;">Obrigado por ser minha parceira e por dividir a vida comigo. <strong>Feliz mês-versário! Te amo muito.</strong></p>
    </div>

    ${afinidades.length > 0 ? `
    <div style="width: 100%; background: rgba(10,10,10,0.9); border: 1px solid #444; padding: 16px; box-sizing: border-box; text-align: left; margin-bottom: 20px;">
        <p style="color: #8b0000; letter-spacing: 3px; font-size: 0.75rem; margin: 0 0 10px 0;">▸ RELATÓRIO DE RECONSTRUÇÃO — N-27</p>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 2; color: #ccc;">
            ${listaAfinidades}
        </ul>
        ${conquistas.length > 0 ? `
        <p style="color: #8b0000; letter-spacing: 3px; font-size: 0.75rem; margin: 14px 0 10px 0;">▸ CONQUISTAS</p>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 2; color: #ccc;">
            ${listaConquistas}
        </ul>` : ""}
        <p style="color: #555; font-size: 0.8rem; margin: 12px 0 0 0; letter-spacing: 1px;">IDENTIDADE RECUPERADA: 100%</p>
    </div>
    ` : ""}

    <button onclick="location.href='../menu.html'" style="margin-top: 10px; border-color: #ff2a2a; box-shadow: 0 0 10px rgba(255,42,42,0.4);">
        RETORNAR AO MENU
    </button>

</div>`;
}
