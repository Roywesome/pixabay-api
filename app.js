/*const api = '1732750-d45b5378879dle877cdld35a6';
const options = {
    method: "GET"
  };

fetch(`https://pixabay.com/api/?key=${api}&q=flores+amarillas&image_type=foto`)
.then((response) => response.json())
.then(data => {
    console.log(data)
})*/

//
const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');
const pagination = document.getElementById('pagination');


window.onload = () => {
  formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e){
  e.preventDefault();

  const terminoBusqueda = document.getElementById('search').value;
    
  if(terminoBusqueda === ''){
    showAlert('warning')
  }else{
    searchIMages(terminoBusqueda)
    clearFormulario();
  }

}

function showAlert(className) {
  const existAlert = document.querySelector('.alert');

  if(!existAlert){
    const div = document.createElement('div');
  div.className = `alert alert-${className} mt-4`;
  div.innerHTML = `
  <h3 class="text-center">Error, agregue un termino de busqueda.</h3>
  <img class="rounded mx-auto d-block" src="https://cdn.pixabay.com/photo/2019/07/15/23/51/magnifying-4340698_960_720.jpg">
  `
  const container = document.querySelector('.container');
  container.insertAdjacentElement('afterbegin', div)

  setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }


  
}

function clearFormulario(){
  document.getElementById('search').value = '';
}

function searchIMages(termino){
  const key = '1732750-d45b5378879d1e877cd1d35a6';
  const pag = 15;
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${pag}`;

  fetch(url)
   .then(response => response.json())
   .then(data => {
    console.log(data);
    const totalPaginas = calcPaginas(data.totalHits);
    console.log(totalPaginas);
     const imagenes = data.hits;

     /*let div =  ' ';
     imagenes.forEach((value, index) => {
       div += `
       <div class="col"
       <div class="card">
        <img src=${value.largeImageURL} class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">${value.tags}</p>
        <a class="btn btn-dark" href="${value.largeImageURL}" target="_blank">Ver imagen</a>
        </div>
       </div>
       </div>
       `;
     })
     
     resultado.innerHTML = div;*/

     showImages(imagenes);
   });


}

//Método mostrar images
function showImages(imgs){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }

  imgs.forEach((value) => {
    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `<div class="card">
    <img src=${value.largeImageURL} class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text text-center">${value.tags}</p>
    <a class="btn btn-outline-dark d-block" href="${value.largeImageURL}" target="_blank">Ver imagen</a>
    </div>
    `
    resultado.appendChild(div);
  });
}

//Pagination -Registro por página
function calcPaginas(total){
  const registroPagina = 40;
  return parseInt(Math.ceil(total / registroPagina));
}
