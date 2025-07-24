const elementoPrecoTotalCompra = document.getElementById('valor-total-compra');
const precoPassagem = 50;
let valorTotalCompra = 0;
let assentosSelecionados = [];

function selecionarCadeira(cadeira) {
    const cadeiraSelecionada = cadeira;
    if (cadeiraSelecionada.classList.contains("ocupado") === true) {
        return;
    }
    if (cadeiraSelecionada.classList.contains("selecionado")) {
        cadeiraSelecionada.classList.remove("selecionado");
        assentosSelecionados = assentosSelecionados.filter(id => id !== cadeiraSelecionada.id);
        valorTotalCompra = assentosSelecionados.length * precoPassagem;
        atualizarVisuPreco()
        return;
    }
    cadeiraSelecionada.classList.add("selecionado");
    assentosSelecionados.push(cadeiraSelecionada.id);
    valorTotalCompra = assentosSelecionados.length * precoPassagem;
    atualizarVisuPreco()
}

function atualizarVisuPreco() {
    elementoPrecoTotalCompra.innerText = `BJ$ ${valorTotalCompra}`
}

function finalizarCompra() {
    if(assentosSelecionados.length === 0) {
        return
    }
    for (const id of assentosSelecionados) {
      const assentoComprado = document.getElementById(id);
      assentoComprado.classList.remove('selecionado');
      assentoComprado.classList.add('ocupado');
    }
    assentosSelecionados = [];
    valorTotalCompra = 0;
    atualizarVisuPreco();
    verificarAssentosOcupados();
}

function verificarAssentosOcupados() {
    const assentos = document.querySelectorAll('.assento');
    const todosOcupados = Array.from(assentos).every(assento => assento.classList.contains('ocupado'));

    if (todosOcupados) {
        const videoContainer = document.getElementById('video-container');
        const video = document.getElementById('video-final');
        const mensagem = document.getElementById('mensagem-final');
        
        videoContainer.style.display = 'block';
        video.play();
    }
}