const barra = document.getElementById("progresso");
const botao = document.getElementById("entrar");
const status = document.getElementById("status");

let valor = 0;

let carregamento = setInterval(() => {

    valor++;

    barra.style.width = valor + "%";

    if (valor >= 100) {

        clearInterval(carregamento);

        status.innerHTML =
            "ARQUIVO N-27 ENCONTRADO";

        botao.style.display = "block";
    }

}, 50);