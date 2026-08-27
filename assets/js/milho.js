let TipoPlanta_Milho = "";
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('assets/jsons/milho.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("nTipo");
        const nTotalInput = document.getElementById("nTotal");

        // Acessa a seção "N" do JSON
        const TipoPlanta = data.planta;
        console.log(TipoPlanta);
        // Preenche o combobox com os nomes dos adubos
        Object.keys(TipoPlanta).forEach(planta => {
            const option = document.createElement("option");
            option.value = planta;
            option.textContent = planta;
            select.appendChild(option);
        });

        // Evento para calcular N total
        select.addEventListener("change", function () {
            nTotalInput.value = ""; // limpa campo
            const necessidadeSelecionado = select.value;

            if (!necessidadeSelecionado) return;

            const propriedades = TipoPlanta[necessidadeSelecionado];

            // Calcula N total (somando N, NO3, NH4, NH2)
            const nTotal = (propriedades.producao || 0)
            TipoPlanta_Milho = propriedades;
            console.log(TipoPlanta_Milho);
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('jsons/milho.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("nProducao");
        const nOutPutSemeadura_ = document.getElementById("nOutPutSemeadura");
        const nOutPutCobertura_ = document.getElementById("nOutPutCobertura");

        // Acessa a seção "N" do JSON
        console.log(TipoPlanta_Milho);

        
        const Producao = data.gramineas;
        console.log(Producao);
        // Preenche o combobox com os nomes dos adubos
        Object.keys(Producao).forEach(planta => {
            const option = document.createElement("option");
            option.value = planta;
            option.textContent = planta;
            select.appendChild(option);
        });

        // Evento para calcular N total
        select.addEventListener("change", function () {
            nOutPutCobertura_.value = ""; // limpa campo
            nOutPutCobertura_.value = ""; // limpa campo
            const ProducaoSelecionado = select.value;

            if (!ProducaoSelecionado) return;

            const propriedades = Producao[ProducaoSelecionado];

            // Calcula N total (somando N, NO3, NH4, NH2)
            const TotalCobertura = (propriedades.cobertura || 0)
            const TotalSemeadura = (propriedades.semeadura || 0)
            nOutPutCobertura_.value = TotalCobertura.toFixed(2);
            nOutPutSemeadura_.value = TotalSemeadura.toFixed(2);
            console.log(TotalSemeadura);
            nOutPutCobertura_.textContent = `Necessidade de Cobertura:  ${TotalCobertura} kg/ha`;
            nOutPutSemeadura_.textContent = `Necessidade de Semeadura:  ${TotalSemeadura} kg/ha`;
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});