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
  if(arrayDatos.length > 0){
    if(tipo === 'promedio'){
      let promedio = arrayDatos.reduce((current,value) =>{
        return Number(current) + Number(value)
      }) / arrayDatos.length;
      mostrarResultado.textContent = `El promedio es ${promedio.toFixed(2)}`
      return promedio;
    }

    if(tipo === 'mediana'){
      let arrayOrdenado = arrayDatos.sort((a,b)=>{
        return Number(a) - Number(b);
      })
      if(arrayDatos.length > 1){
        if(esPar(arrayDatos)){
          let indexPromedio1 = arrayOrdenado[arrayOrdenado.length / 2];
          let indexPromedio2 = arrayOrdenado[arrayOrdenado.length / 2 - 1];
          let medianaPar = (Number(indexPromedio1) + Number(indexPromedio2)) / 2;
          mostrarResultado.textContent = `La mediana es ${medianaPar.toFixed(2)}`
          return medianaPar.toFixed(2);
        }else{
          let medianaInPar = Number(arrayOrdenado[(arrayOrdenado.length / 2) - 0.5]);
          mostrarResultado.textContent = `La mediana es ${Number(medianaInPar).toFixed(2)}`;
          return medianaInPar.toFixed(2);
        }
      }else{
        mostrarResultado.textContent = `Se necesitas mas datos`;
      }
    }
    if(tipo === 'moda'){}
  }
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
function esPar(arr){
  if(arr.length % 2 === 0){
    return true;
  }else if(arr.length % 2 === 1){
    return false;
  }
}