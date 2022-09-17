function getCalculaValores(){
    var gramasMucarela = document.getElementById("gramas_mucarela").value;
    var gramasPizzaCheese = document.getElementById("gramas_pizza_cheese").value;
    var valorMucarela = document.getElementById("valor_mucarela").value;
    var valorPizzaCheese = document.getElementById("valor_pizza_cheese").value;
    var pizzaMes = document.getElementById("pizza_mes").value;

    var gramasCheese = gramasMucarela - (gramasMucarela * 0.10);
    var custoMucarela = (valorMucarela/1000) * gramasMucarela;
    var custoPizzaCheese = (valorPizzaCheese/1000) * gramasPizzaCheese;
    var ganhoUnidade = custoMucarela - custoPizzaCheese;
    var ganhoMes = ganhoUnidade * pizzaMes;
    var ganhoAno = ganhoMes * 12;
    
    document.getElementById("gramas_pizza_cheese").value= gramasCheese;
    document.getElementById("custo_mucarela").value = custoMucarela;
    document.getElementById("custo_pizza_cheese").value = custoPizzaCheese;
    document.getElementById("ganho_unidade").value = ganhoUnidade;
    document.getElementById("ganho_mes").value = ganhoMes;
    document.getElementById("ganho_ano").value = ganhoAno;

}

