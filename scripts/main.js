// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function () {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
function dadosLuiz() {
  let ano;
  let hoje = new Date();
  let AnoAtual = hoje.getFullYear();
  let idade;
  // console.log(AnoAtual);
  // console.log(hoje);
  fetch('dados/dados.txt')
    .then(response => response.text())
    .then(text => {
      const array = text.split("\n");
      //  console.log(array);
      document.getElementById("nome").innerText = array[0];
      document.getElementById("profissao").innerText = array[1];
      ano = array[2];
      document.getElementById("idade").innerText = array[3];
      document.getElementById("telefone").innerText = array[4];
      document.getElementById("endereco").innerText = array[5];
      idade = AnoAtual - ano;
      document.getElementById("idade").innerText = idade;
      //console.log("Idade: " + idade);
      habilidades();
      experiencia();
      formacaoAcademica();
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
  // Calcular idade


}
function habilidades() {
  fetch('dados/habilidades.txt')
    .then(response => response.text())
    .then(text => {
      const array = text.split("\n");
      //   console.log(array);
      let habilidades = "";
      for (let i = 0; i < array.length; i++) {
        habilidades += `<p>${array[i]}</p>`;
      }
      document.getElementById("habilidades").innerHTML = habilidades;
    })
    .catch(error => console.error('Erro ao carregar as habilidades:', error));
}

async function experiencia() {
  try {
    const response = await fetch('dados/experiencia.json');
    const data = await response.json();
    //  console.log(data);
    let experiencia = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        experiencia += `<div class="card">`;
        experiencia += `<div class="row">`;
        experiencia += `<div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">`;
        experiencia += ` <div class="card-body cc-experience-header">
                                                <p> ${data[key].Data}</p>
                                                <div class="h5">${data[key].Local}</div>
                                            </div>`;
        experiencia += `</div>`;
        experiencia += ` <div class="col-md-9" data-aos="fade-left" data-aos-offset="50"
                                            data-aos-duration="500">
                                            <div class="card-body">`;
        experiencia += `<div class="h5">${data[key].Profissao}</div>`;
        experiencia += `<p> ${data[key].Atividades}</p> </div></div></div></div>`;
      }
    }
    document.getElementById("experiencia").innerHTML = experiencia;
  } catch (error) {
    console.error('Erro ao carregar a experiência:', error);
  }
}
async function formacaoAcademica() {
  try {
    const response = await fetch('dados/formacao.json');
    const data = await response.json();
    console.log(data);
    let formacao = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formacao += `
        <div class="card">
          <div class="row">
              <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                  <div class="card-body cc-education-header">
                      <p>${data[key].Data}</p>
                      <div class="h5">${data[key].Apelido}</div>
                  </div>
              </div>
              <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                  <div class="card-body">
                      <div class="h5">${data[key].Curso}</div>
                      <p class="category">${data[key].Local}</p>
                      <p>${data[key].Status}</p>
                  </div>
              </div>
          </div>
      </div>
        `;
      }
    }
    document.getElementById("formacao").innerHTML = formacao;
  } catch (error) {
    console.error('Erro ao carregar a formação acadêmica:', error);
  }
}