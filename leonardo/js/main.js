function getCalculaCusto() {

    var gramasMucarela = document.getElementById("gramas_mucarela").value;
    var gramasPizzaCheese = document.getElementById("gramas_pizza_cheese").value;
    var valorMucarela = document.getElementById("valor_mucarela").value;
    var valorPizzaCheese = document.getElementById("valor_pizza_cheese").value;


    var gramasCheese = gramasMucarela - (gramasMucarela * 0.10);
    var custoMucarela = (valorMucarela / 1000) * gramasMucarela;
    var custoPizzaCheese = (valorPizzaCheese / 1000) * gramasPizzaCheese;


    console.log(valorPizzaCheese / 1000);
    console.log(gramasPizzaCheese);
    console.log(custoPizzaCheese);

    document.getElementById("gramas_pizza_cheese").value = gramasCheese.toFixed(2);
    document.getElementById("custo_mucarela").value = custoMucarela.toFixed(2);
    document.getElementById("custo_pizza_cheese").value = custoPizzaCheese.toFixed(2);
    getCalculaValores(custoMucarela, custoPizzaCheese)
}


function calculaGramas() {
    var gramasMucarela = document.getElementById("gramas_mucarela").value;

    var gramasCheese = gramasMucarela - (gramasMucarela * 0.10);

    document.getElementById("gramas_pizza_cheese").value = gramasCheese.toFixed(2);
}

function getCalculaValores(custoMucarela, custoPizzaCheese) {

    var pizzaMes = document.getElementById("pizza_mes").value;

    var ganhoUnidade = custoMucarela - custoPizzaCheese;
    var ganhoMes = ganhoUnidade * pizzaMes;
    var ganhoAno = ganhoMes * 12;

    document.getElementById("ganho_unidade").value = ganhoUnidade.toFixed(2);
    document.getElementById("ganho_mes").value = ganhoMes.toFixed(2);
    document.getElementById("ganho_ano").value = ganhoAno.toFixed(2);

}

