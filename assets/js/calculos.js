var situacaoPH = 0;
var situacaoP = 0;
var situacaoK = 0;
var situacaoCTC = 0;
var situacaoV1 = 0;
var recomendacaoCalagem = 0;
var percentualArgila = 0;
var cultura = "";
var data_analise = "";
var data_atual = new Date().toLocaleDateString();
var hora_atual = new Date().toLocaleTimeString();
var nome_produtor = "";


async function salvaJSON() {
    const dados = {
        situacaoPH,
        situacaoP,
        situacaoK,
        situacaoCTC,
        situacaoV1,
        recomendacaoCalagem,
        percentualArgila,
        cultura
    };
    const dadosJSON = JSON.stringify(dados, null, 2);
    const blob = new Blob([dadosJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);


    const link = document.createElement("a");
    link.href = url;
    link.download = "dados.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

}





async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Relatório de Situação do Solo", 20, 20);

    doc.setFontSize(12);
    doc.text(`pH: ${situacaoPH}`, 20, 40);
    doc.text(`Fósforo (P): ${situacaoP}`, 60, 40);
    doc.text(`Potássio (K): ${situacaoK}`, 120, 40);
    doc.text(`CTC: ${situacaoCTC}`, 20, 50);
    doc.text(`V1: ${situacaoV1}`, 60, 50);
    doc.text(`%Argila: ${percentualArgila}`, 120, 50);
    doc.text(`Recomendação de Calagem: ${recomendacaoCalagem}`, 20, 60);

    doc.text(`______________________`, 20, 70);
    doc.text(`Luiz Gabriel Deganutti`, 25, 75);
    doc.text(`Técnico em Agropecuária`, 22, 80);
    doc.text(`CFTA 05262510930`, 25, 85);


    doc.save("relatorio_solo.pdf");
}





// Função para mapear classificação para classe CSS
function getAlertClass(classificacao) {
    switch (classificacao) {
        case "Muito Baixo": return "alert-danger";
        case "Baixo": return "alert-warning";
        case "Médio": return "alert-info";
        case "Alto": return "alert-primary";
        case "Muito Alto": return "alert-success";
        case "Evitar": return "alert-dark";
        default: return "alert-secondary";
    }
}



/*
Realiza o cálculo da recomendação de calagem com base nos valores fornecidos pelo usuário.
Os valores necessários são:
- vDesejada: Valor desejado de saturação por bases (%V desejada).
- vAtual: Valor atual de saturação por bases (%V atual).
- ctc: Capacidade de troca catiônica a pH 7 (cmolc/dm³).
- prnt: Poder relativo de neutralização total do corretivo (%).
*/
document.getElementById("btnCalcular").addEventListener("click", function () {
    const vDesejada = parseFloat(document.getElementById("vDesejada").value);
    const vAtual = parseFloat(document.getElementById("v").value);
    const ctc = parseFloat(document.getElementById("ctc").value);
    const prnt = parseFloat(document.getElementById("prnt").value);

    const resultadoEl = document.getElementById("resultado");

    if (
        isNaN(vDesejada) ||
        isNaN(vAtual) ||
        isNaN(ctc) ||
        isNaN(prnt) ||
        prnt === 0
    ) {
        resultadoEl.textContent = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    const recomendacao = ((vDesejada - vAtual) * ctc) / prnt;
    resultadoEl.textContent = `Recomendação de calagem: ${recomendacao.toFixed(2)} t/ha`;
});
/**
 * Evento calcula o nível de P
 * 
 */

document.getElementById("p").addEventListener("focusout", async function () {
    const resultadoEl = document.getElementById("alertaP");
    const tipo = "p"; // fixo conforme seu JSON
    const subtipo = "argila"; // fixo conforme sua estrutura
    const faixa = document.getElementById("argila").value; // valor do select
    const valor = parseFloat(document.getElementById("p").value);

    if (!faixa || isNaN(valor)) {
        resultadoEl.className = "alert alert-warning";
        resultadoEl.textContent = "⚠️ Selecione a faixa de argila e informe o valor de P.";
        return;
    }

    try {
        const response = await fetch('jsons/niveis.json');
        const data = await response.json();

        // Verifica se o tipo e subtipo existem no JSON
        if (!data[tipo] || !data[tipo][subtipo] || !data[tipo][subtipo][faixa]) {
            resultadoEl.className = "alert alert-warning";
            resultadoEl.textContent = "⚠️ Faixa de argila não encontrada no JSON.";
            return;
        }

        const dados = data[tipo][subtipo][faixa];

        // Ordena os valores numéricos
        const valoresOrdenados = Object.keys(dados)
            .map(key => ({ valor: parseFloat(key), texto: dados[key] }))
            .sort((a, b) => a.valor - b.valor);

        // Determina a classificação com base no valor informado
        let classificacao = valoresOrdenados[valoresOrdenados.length - 1].texto;
        for (let i = 0; i < valoresOrdenados.length; i++) {
            if (valor <= valoresOrdenados[i].valor) {
                classificacao = valoresOrdenados[i].texto;
                break;
            }
        }

        // Aplica a classe CSS correspondente
        const classeAlerta = getAlertClass(classificacao);
        resultadoEl.className = `alert ${classeAlerta}`;
        resultadoEl.textContent = `Nível de Fosforo:  ${valor} ${classificacao}`;
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        resultadoEl.className = "alert alert-danger";
        resultadoEl.textContent = "⚠️ Erro ao carregar dados.";
    }
});

/**
 * Evento calcula o nível de K
 */

document.getElementById("k").addEventListener("focusout", async function () {
    const resultadoEl = document.getElementById("alertaK");
    const tipo = "K2O"; // fixo conforme seu JSON
    const subtipo = document.getElementById("subtipoK").value; // ID do select com os subtipos
    const valor = parseFloat(document.getElementById("k").value);

    if (!subtipo || isNaN(valor)) {
        resultadoEl.className = "alert alert-warning";
        resultadoEl.textContent = "⚠️ Selecione o subtipo e informe um valor válido.";
        return;
    }

    try {
        const response = await fetch('assets/jsons/niveis.json');
        const data = await response.json();

        const dados = data[tipo][subtipo];
        if (!dados) {
            resultadoEl.className = "alert alert-warning";
            resultadoEl.textContent = "⚠️ Subtipo não encontrado no JSON.";
            return;
        }

        const valoresOrdenados = Object.keys(dados)
            .map(key => ({ valor: parseFloat(key), texto: dados[key] }))
            .sort((a, b) => a.valor - b.valor);

        let classificacao = valoresOrdenados[valoresOrdenados.length - 1].texto;
        for (let i = 0; i < valoresOrdenados.length; i++) {
            if (valor <= valoresOrdenados[i].valor) {
                classificacao = valoresOrdenados[i].texto;
                break;
            }
        }

        const classeAlerta = getAlertClass(classificacao);
        resultadoEl.className = `alert ${classeAlerta}`;
        resultadoEl.textContent = `Nível de Potássio: ${valor} ${classificacao}`;
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        resultadoEl.className = "alert alert-danger";
        resultadoEl.textContent = "⚠️ Erro ao carregar dados.";
    }
});

/**
 * evento calcula o nível do pH
 */
document.getElementById("ph").addEventListener("focusout", async function () {
    const resultadoEl = document.getElementById("alertaPh");
    const valorPH = parseFloat(document.getElementById("ph").value);

    if (isNaN(valorPH)) {
        resultadoEl.className = "alert alert-warning";
        resultadoEl.textContent = "⚠️ Digite um valor válido para pH.";
        resultadoEl.classList.remove("d-none");
        return;
    }

    try {
        const response = await fetch('assets/jsons/niveis.json');
        const data = await response.json();

        const faixas = data.pH;
        if (!faixas) {
            resultadoEl.className = "alert alert-warning";
            resultadoEl.textContent = "⚠️ Dados de pH não encontrados no JSON.";
            resultadoEl.classList.remove("d-none");
            return;
        }

        // Converte para array [{valor: num, texto: string}] e ordena
        const valoresOrdenados = Object.keys(faixas)
            .map(key => ({ valor: parseFloat(key), texto: faixas[key] }))
            .sort((a, b) => a.valor - b.valor);

        // Determina classificação
        let classificacao = valoresOrdenados[valoresOrdenados.length - 1].texto;
        for (let i = 0; i < valoresOrdenados.length; i++) {
            if (valorPH <= valoresOrdenados[i].valor) {
                classificacao = valoresOrdenados[i].texto;
                break;
            }
        }

        // Aplica classe CSS
        const classeAlerta = getAlertClass(classificacao);
        resultadoEl.className = `alert ${classeAlerta}`;
        resultadoEl.textContent = `Classificação do pH: ${valorPH} ${classificacao}`;
        resultadoEl.classList.remove("d-none");
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        resultadoEl.className = "alert alert-danger";
        resultadoEl.textContent = "⚠️ Erro ao carregar dados.";
        resultadoEl.classList.remove("d-none");
    }
});

document.getElementById("ctc").addEventListener("focusout", async function () {
    const resultadoEl = document.getElementById("alertaCTC");
    const valorCTC = parseFloat(document.getElementById("ctc").value);

    if (isNaN(valorCTC)) {
        resultadoEl.className = "alert alert-warning";
        resultadoEl.textContent = "⚠️ Digite um valor válido para CTC.";
        resultadoEl.classList.remove("d-none");
        return;
    }

    try {
        const response = await fetch('assets/jsons/niveis.json');
        const data = await response.json();

        const faixas = data.CTC_pH7;
        if (!faixas) {
            resultadoEl.className = "alert alert-warning";
            resultadoEl.textContent = "⚠️ Dados de CTC não encontrados no JSON.";
            resultadoEl.classList.remove("d-none");
            return;
        }
        // Converte para array [{valor: num, texto: string}] e ordena
        const valoresOrdenados = Object.keys(faixas)
            .map(key => ({ valor: parseFloat(key), texto: faixas[key] }))
            .sort((a, b) => a.valor - b.valor);

        // Determina classificação
        let classificacao = valoresOrdenados[valoresOrdenados.length - 1].texto;
        for (let i = 0; i < valoresOrdenados.length; i++) {
            if (valorCTC <= valoresOrdenados[i].valor) {
                classificacao = valoresOrdenados[i].texto;
                break;
            }
        }

        // Aplica classe CSS
        const classeAlerta = getAlertClass(classificacao);
        resultadoEl.className = `alert ${classeAlerta}`;
        resultadoEl.textContent = `Classificação do CTC:  ${valorCTC} ${classificacao}`;
        resultadoEl.classList.remove("d-none");
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        resultadoEl.className = "alert alert-danger";
        resultadoEl.textContent = "⚠️ Erro ao carregar dados.";
        resultadoEl.classList.remove("d-none");
    }
});
document.getElementById("vAtual").addEventListener("focusout", async function () {
    const resultadoEl = document.getElementById("alertaV");
    const valorV1 = parseFloat(document.getElementById("vAtual").value);

    if (isNaN(valorV1)) {
        resultadoEl.className = "alert alert-warning";
        resultadoEl.textContent = "⚠️ Digite um valor válido para %V2.";
        resultadoEl.classList.remove("d-none");
        return;
    }

    try {
        const response = await fetch('assets/jsons/niveis.json');
        const data = await response.json();

        const faixas = data.V1;
        if (!faixas) {
            resultadoEl.className = "alert alert-warning";
            resultadoEl.textContent = "⚠️ Dados de CTC não encontrados no JSON.";
            resultadoEl.classList.remove("d-none");
            return;
        }
        // Converte para array [{valor: num, texto: string}] e ordena
        const valoresOrdenados = Object.keys(faixas)
            .map(key => ({ valor: parseFloat(key), texto: faixas[key] }))
            .sort((a, b) => a.valor - b.valor);

        // Determina classificação
        let classificacao = valoresOrdenados[valoresOrdenados.length - 1].texto;
        for (let i = 0; i < valoresOrdenados.length; i++) {
            if (valorV1 <= valoresOrdenados[i].valor) {
                classificacao = valoresOrdenados[i].texto;
                break;
            }
        }

        // Aplica classe CSS
        const classeAlerta = getAlertClass(classificacao);
        resultadoEl.className = `alert ${classeAlerta}`;
        resultadoEl.textContent = `Classificação do %V1:  ${valorV1} ${classificacao}`;
        resultadoEl.classList.remove("d-none");
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        resultadoEl.className = "alert alert-danger";
        resultadoEl.textContent = "⚠️ Erro ao carregar dados.";
        resultadoEl.classList.remove("d-none");
    }
});