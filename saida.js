// Pegando os valores da saída do HTML
const saidasInput = document.getElementById("saida");
const saidasInputValue = document.getElementById("valorSaida");

const saidasItensLi = document.getElementById("saidasLi");
const espacoSaida = document.getElementById("saidas");
const buttonSaida = document.querySelector("#botaoConcluirSaida");

let itemSaida = JSON.parse(localStorage.getItem('allitemsSaida')) || [];

function addSaida(){
    if (saidasInput.value === ''){
        alert('Você não pode adicionar uma saída vazia!'); // Não pode adicionar uma saída vazia
        return;
    }

    itemSaida.push({
        tarefa: saidasInput.value,
        value: saidasInputValue.value // Pegando o valor da saída e adicionando no array que é salvo no localStorage
    });

    salvarSaidaNoLocalStorage();
    saidasInput.value = "";
    saidasInputValue.value = ""; // Limpando o input do valor da saída
    concluirSaida();
    location.reload()
}

function concluirSaida() { // Função para criar <li>'s dentro daquele <ul> do HTML
    let novaLi = '';
    itemSaida.forEach((item, index) => {
        novaLi += `
            <li class="saidajs">
                <p>${item.tarefa}</p>
                <p>R$ ${item.value}</p>
                <img src="images/trash.png" alt="" onclick="deletarSaida(${index})">
            </li>
        `;
    });

    saidasItensLi.innerHTML = novaLi;
    salvarSaidaNoLocalStorage();
    mudarOrcamentoSaida(); // Chamamos a função para ir subtraindo os valores da saída
}

function mudarOrcamentoSaida() { // Função para subtrair os valores da saída do orçamento
    var orcamentoInput = document.getElementById("orcamento");
    var somaSaidas = 0;

    itemSaida.forEach(function(input) {
        somaSaidas += parseFloat(input.value);
    });

    orcamentoInput.value = (parseFloat(orcamentoInput.value) - somaSaidas).toFixed(2);
}

function deletarSaida(posicao) { // Função para cada vez que clicar na lixeira, deletar a saída e adicionar o valor de volta ao orçamento
    var valorSaidaInputs = document.querySelectorAll(".valorSaida");
    var orcamentoInput = document.getElementById("orcamento");
    var valorRemovido = parseFloat(valorSaidaInputs[posicao]);

    itemSaida.splice(posicao, 1);

    orcamentoInput.value = (parseFloat(orcamentoInput.value) - valorRemovido).toFixed(2);

    concluirSaida();
    salvarSaidaNoLocalStorage();
    mudarOrcamentoSaida();
    recarregarTela();
    location.reload();
}

function salvarSaidaNoLocalStorage() { // Função para salvar o array no localStorage
    localStorage.setItem('allitemsSaida', JSON.stringify(itemSaida));
}

function recarregarTela(){ 
    concluirSaida();
    salvarSaidaNoLocalStorage();
}

salvarSaidaNoLocalStorage();
recarregarTela();   
buttonSaida.addEventListener('click', addSaida);

//teste