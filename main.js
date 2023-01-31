function $(id){
  return document.querySelector(id);
}
const agregarValor = $("#valor");
const datos = $(".datos");
const tipoDeCalculo = $("#tipoDeCalculo");
const calcularButton = $("#calcular");
const mostrarResultado = $("#resultado");
const agregarDatosButton = $(".agregarDatosButton");

let arrayDatos = [];

agregarDatosButton.addEventListener('click',(e)=>{
  e.preventDefault();
  if(agregarValor.value.length > 0){
    let div = document.createElement("div")
    div.classList.add("datos__item");
    let span = document.createElement("span");
    span.textContent = agregarValor.value;
    let button = document.createElement("button");
    button.setAttribute('onclick',"borrarDato(event)");
    button.innerText = "X";
    div.appendChild(span);
    div.appendChild(button);
    datos.appendChild(div);
    arrayDatos.push(agregarValor.value);
    agregarValor.value = "";
    datos.scroll({top:100 * arrayDatos.length});
    agregarValor.setAttribute('placeholder',"Ingrese el valor a agregar");
  }else{
    agregarValor.setAttribute('placeholder',"No haz ingresado informacion");
  }
})
calcularButton.addEventListener('click', ()=>{
  let tipo = tipoDeCalculo.value
  if(tipo === 'promedio'){
    let promedio = arrayDatos.reduce((current,value) =>{
      return Number(current) + Number(value)
    }) / arrayDatos.length;
    mostrarResultado.textContent = `El promedio es ${promedio.toFixed(2)}`
    return promedio;
  }
  if(tipo === 'mediana'){}
  if(tipo === 'moda'){}
});

const borrarDato=(e)=>{
  // elimina el elemento del documento html
  e.target.parentElement.remove()
  let value = e.target.previousElementSibling.textContent
  let indexToDelete = arrayDatos.findIndex(element => element === value);
  // elimina el elemento de el array
  arrayDatos.splice(indexToDelete,1);
  console.log('calculo',value, indexToDelete,arrayDatos)
}
console.log()