//Pegando os valores da entrada do html
const entradasInput = document.getElementById("entrada");
const entradasInputValue = document.getElementById("valor"); 

const entradasItensLi = document.getElementById("entradasLi"); 
const espacoEntrada = document.getElementById("entradas");
const buttonEntrada = document.querySelector("#botaoConcluirEntrada");

let itemEntrada = JSON.parse(localStorage.getItem('allitemsEntrada')) || [];

function addEntrada(){
    if (entradasInput.value === ''){
        alert('Você não pode adicionar uma entrada vazia!') // Não pode adicionar uma entrada vazia
        return;
    }

    itemEntrada.push({
        tarefa: entradasInput.value,
        value: entradasInputValue.value // pegando o valor da entrada é adicionando no array que é salvo no localstorage
    });

    salvarEntradaNoLocalStorage();
    entradasInput.value = "";
    entradasInputValue.value = ""; // limpando o input do valor da entrada
    concluirEntrada();
    location.reload();
}

function concluirEntrada() { //função para criar li's dentro daquele ul do html
    let novaLi = '';
    itemEntrada.forEach((item, index) => { 
        novaLi += `
            <li class="entradajs">
                <p>${item.tarefa}</p>  
                <p>R$ ${item.value}</p> 
                <img src="images/trash.png" alt="" onclick="deletarEntrada(${index})">
            </li>
        `;
    });

    entradasItensLi.innerHTML = novaLi;
    salvarEntradaNoLocalStorage();
    mudarOrcamentoEntrada() // chamamos a function para ir somando os valor da entrada
}
function mudarOrcamentoEntrada() { // função para somar os valores da entrada
    var orcamentoInput = document.getElementById("orcamento");
    var somaEntradas = 0;

    
    itemEntrada.forEach(function(input) {
        somaEntradas += parseFloat(input.value);
    });

    orcamentoInput.value = somaEntradas.toFixed(2);
}

function deletarEntrada(posicao) { // função para cada vez que clicar na lixeira, deletar a entrada e subtrair o valor
    var valorEntradaInputs = document.querySelectorAll(".valorEntrada");
    var orcamentoInput = document.getElementById("orcamento");
    var valorRemovido = parseFloat(valorEntradaInputs[posicao]);

    itemEntrada.splice(posicao, 1); 

    orcamentoInput.value = (parseFloat(orcamentoInput.value) - valorRemovido).toFixed(2);

    concluirEntrada();
    salvarEntradaNoLocalStorage();
    location.reload();
}

   
function salvarEntradaNoLocalStorage() { //função para salvar o array no localstorage
    localStorage.setItem('allitemsEntrada', JSON.stringify(itemEntrada));
}

function recarregarTela(){ 
    concluirEntrada();
    salvarEntradaNoLocalStorage();
}


salvarEntradaNoLocalStorage();
recarregarTela();
buttonEntrada.addEventListener('click', addEntrada);

