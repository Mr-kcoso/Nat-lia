const barra = document.getElementById("progresso");
const botao = document.getElementById("entrar");
const status = document.getElementById("status");
const telaCarregamento = document.getElementById("tela-carregamento");
const telaDocumento = document.getElementById("tela-documento");
const continuarDocumento = document.getElementById("continuar-documento");

let valor = 0;

let carregamento = setInterval(() => {
    valor++;
    barra.style.width = valor + "%";

    if (valor >= 100) {
        clearInterval(carregamento);
        status.innerHTML = "DOCUMENTO DE ACESSO RECONHECIDO";
        botao.style.display = "block";
    }
}, 50);

botao.addEventListener("click", () => {
    telaCarregamento.style.display = "none";
    telaDocumento.style.display = "flex";
});

continuarDocumento.addEventListener("click", () => {
    window.location.href = "menu.html";
});