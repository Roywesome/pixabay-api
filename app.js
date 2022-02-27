const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

//Pagination
const pagination = document.getElementById('pagination');
const registroPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;


window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
  //pagination.addEventListener('click', direccionPaginacion);

}

function validarFormulario(e){
  e.preventDefault();

  const terminoBusqueda = document.getElementById('search').value;
    
  if(terminoBusqueda === ''){
    showAlert('warning');
    return;
  }

  searchImages();
  clearFormulario();

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

function searchImages(){

  const terminoBusqueda = document.getElementById('search').value;
  const key = '1732750-d45b5378879d1e877cd1d35a6';
  const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=${registroPagina}&page=${paginaActual}`;

  fetch(url)
   .then(response => response.json())
   .then(data => {
     const imagenes = data.hits;
     totalPaginas = calcPaginas(data.totalHits);

     /*
     ////Método mostrar images - FORMA 1
     let div =  ' ';
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

//Método mostrar images - FORMA 2
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

  
  //Limpiar paginador
     while(pagination.firstChild){
       pagination.removeChild(pagination.firstChild)
      }
     //General el nuevo html
     imprimirPaginador();
     
  
}

//Generador que va registrar la cantidad de elementos de acuerdo a las páginas
function *crearPaginador(total){
  for(let i = 1; i <= total; i++){
    //para registrat los valores internamente
    yield i;
  }
}

//Método de registro por página
function calcPaginas(total){
  return parseInt(Math.ceil(total / registroPagina));
}


function imprimirPaginador(){
  iterador = crearPaginador(totalPaginas);
  console.log(iterador);

  while(true){
    const { value, done } = iterador.next();
    if(done) return;

    //Caso contrario, genera un bóton por cada elemento
    const btn = document.createElement('a');
    //btn.href = "#";
    btn.dataset.pagina = value;
    btn.textContent = value;
    btn.className = 'siguiente btn btn-outline-primary'

    btn.onclick = () => {
      paginaActual = value;
      console.log(paginaActual)
      searchImages();
    }

    pagination.appendChild(btn);
  }
}




/*function direccionPaginacion(e) {
  if(e.target.classList.contains('siguiente')) {

      paginaActual= Number( e.target.dataset.pagina);
      searchImages();
      formulario.scrollIntoView();
  }
}*/