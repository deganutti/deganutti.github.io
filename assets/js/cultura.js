document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Carrega o JSON
        const response = await fetch('assets/jsons/culturas.json'); // caminho do arquivo
        const data = await response.json();

        const select = document.getElementById("cultura");
        const nTotalInput = document.getElementById("nTotal");

        // Acessa a seção "N" do JSON
        const TipoPlanta = data.cultura;
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
            const TipoCultura = select.value;

            if (!TipoCultura) return;

            const propriedades = TipoPlanta[TipoCultura];
            
            

            console.log(propriedades);
        });
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
});