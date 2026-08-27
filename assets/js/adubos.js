document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('assets/jsons/adubos.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("nSelect");
        const nTotalInput = document.getElementById("nTotal");

        // Acessa a seção "N" do JSON
        const adubos = data.N;

        // Preenche o combobox com os nomes dos adubos
        Object.keys(adubos).forEach(adubo => {
            const option = document.createElement("option");
            option.value = adubo;
            option.textContent = adubo;
            select.appendChild(option);
        });

        // Evento para calcular N total
        select.addEventListener("change", function () {
            nTotalInput.value = ""; // limpa campo
            const aduboSelecionado = select.value;

            if (!aduboSelecionado) return;

            const propriedades = adubos[aduboSelecionado];

            // Calcula N total (somando N, NO3, NH4, NH2)
            const nTotal = (propriedades.N || 0)

            nTotalInput.value = nTotal.toFixed(2) + " %";
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('assets/jsons/adubos.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("pSelect");
        const pTotalInput = document.getElementById("pTotal");

        // Acessa a seção "N" do JSON
        const adubos = data.P;
        console.log(adubos);
        // Preenche o combobox com os nomes dos adubos
        Object.keys(adubos).forEach(adubo => {
            const option = document.createElement("option");
            option.value = adubo;
            option.textContent = adubo;
            select.appendChild(option);
        });

        // Evento para calcular N total
        select.addEventListener("change", function () {

            const aduboSelecionado = select.value;

            if (!aduboSelecionado) return;

            const propriedades = adubos[aduboSelecionado];

            // Calcula N total (somando N, NO3, NH4, NH2)
            const pTotal = (propriedades.P2O5_total || 0)

            pTotalInput.value = pTotal.toFixed(2) + " %";
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});


document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('assets/jsons/adubos.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("kSelect");
        const kTotalInput = document.getElementById("kTotal");

        // Acessa a seção "N" do JSON
        const adubos = data.K;
        console.log(adubos);
        // Preenche o combobox com os nomes dos adubos
        Object.keys(adubos).forEach(adubo => {
            const option = document.createElement("option");
            option.value = adubo;
            option.textContent = adubo;
            select.appendChild(option);
        });

        // Evento para calcular N total
        select.addEventListener("change", function () {

            const aduboSelecionado = select.value;

            if (!aduboSelecionado) return;

            const propriedades = adubos[aduboSelecionado];

            const kTotal = (propriedades.K2O || 0)

            kTotalInput.value = kTotal.toFixed(2) + " %";
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});