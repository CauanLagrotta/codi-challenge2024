// Metas segue a mesma lógica das entradas e saidas

const metasInput = document.getElementById("meta");
const metasItensLi = document.getElementById("metasLi");
const espacoMeta = document.getElementById("metas");
const buttonMeta = document.querySelector("#botaoConcluirMeta");
let itemMeta = JSON.parse(localStorage.getItem('allitemsMeta')) || [];

function addMeta() {
    if (metasInput.value === '') {
        alert('Você não pode adicionar uma meta vazia!');
        return;
    }

    const valorMeta = document.getElementById("valorMeta").value;

    itemMeta.push({
        meta: metasInput.value,
        value: parseFloat(valorMeta)
    });

    salvarNoLocalStorage();
    metasInput.value = "";
    concluirMeta();
}

function concluirMeta() {
    let novaLi = '';
    itemMeta.forEach((item, posicao) => {
        novaLi += `
            <li class="metajs">
                <p>${item.meta}</p> 
                <p>R$ ${item.value.toFixed(2)}</p>
                <img src="./images/trash.png" alt="" onclick="deletarMeta(${posicao})">
            </li>`;
    });

    metasItensLi.innerHTML = novaLi;
}

function deletarMeta(posicao) {
    itemMeta.splice(posicao, 1);
    salvarNoLocalStorage();
    concluirMeta();
}

function salvarNoLocalStorage() {
    localStorage.setItem('allitemsMeta', JSON.stringify(itemMeta));
}

function recarregarTela() {
    concluirMeta();
}

recarregarTela();
buttonMeta.addEventListener('click', addMeta);
