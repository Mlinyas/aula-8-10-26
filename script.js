let numeros = [];
const delay = 700;

const btn = document.getElementById("ordenar-btn");
const container = document.querySelector(".numeros");
const mensagem = document.querySelector(".mensagem");

function gerenciarAcao() {
    if (btn.textContent === "Ordenar números") {
        executarBubbleSort();
    } else {
        gerarNovosValores();
    }
}

function gerarNovosValores() {
    numeros = [];

    container.innerHTML = "";
    mensagem.textContent = "";

    btn.textContent = "Ordenar números";
    btn.disabled = false;

    for (let i = 0; i < 5; i++) {
        numeros.push(Math.floor(Math.random() * 99) + 1);
    }

    renderizarNumeros();
}

function renderizarNumeros() {
    container.innerHTML = "";

    numeros.forEach((num, index) => {
        const elemento = document.createElement("div");

        elemento.className = "numero";
        elemento.id = `numero-${index}`;
        elemento.textContent = num;

        container.appendChild(elemento);
    });
}

function esperar(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo));
}

async function executarBubbleSort() {
    btn.disabled = true;

    for (let i = 0; i < numeros.length - 1; i++) {
        let trocou = false;

        for (let j = 0; j < numeros.length - i - 1; j++) {
            const numero1 = document.getElementById(`numero-${j}`);
            const numero2 = document.getElementById(`numero-${j + 1}`);

            numero1.classList.add("destaque");
            numero2.classList.add("destaque");

            await esperar(delay);

            if (numeros[j] > numeros[j + 1]) {
                [numeros[j], numeros[j + 1]] = [numeros[j + 1], numeros[j]];

                renderizarNumeros();

                const novoNumero1 = document.getElementById(`numero-${j}`);
                const novoNumero2 = document.getElementById(`numero-${j + 1}`);

                novoNumero1.classList.add("troca");
                novoNumero2.classList.add("troca");

                await esperar(delay);

                trocou = true;
            }

            const elementos = document.querySelectorAll(".numero");

            elementos.forEach(elemento => {
                elemento.classList.remove("destaque");
            });
        }

        if (!trocou) {
            break;
        }
    }

    mensagem.textContent = "Números ordenados!";
    btn.textContent = "Novos números";
    btn.disabled = false;
}

btn.addEventListener("click", gerenciarAcao);

window.onload = gerarNovosValores;