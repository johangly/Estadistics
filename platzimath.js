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
const PlatziMath = {};

PlatziMath.esPar = function esPar(arr){
  if(arr.length % 2 === 0){
    return true;
  }else if(arr.length % 2 === 1){
    return false;
  }
}
PlatziMath.sumarElementos = function sumarElementos(arr){
  return arr.reduce((current = 0,value) =>{
    return Number(current) + Number(value)
  });
}
PlatziMath.calcularPromedio = function calcularPromedio(arr){
  let promedio = this.sumarElementos(arr) / arr.length;
  mostrarResultado.textContent = `El promedio es ${promedio.toFixed(2)}`
  return promedio;
}
PlatziMath.calcularMediana = function calcularMediana(arr){
  let arrayOrdenado = PlatziMath.ordernarArray(arr);
  if(PlatziMath.esPar(arr)){
    let indexPromedio1 = arrayOrdenado[arrayOrdenado.length / 2];
    let indexPromedio2 = arrayOrdenado[arrayOrdenado.length / 2 - 1];
    // let medianaPar = (Number(indexPromedio1) + Number(indexPromedio2)) / 2;
    let medianaPar = this.calcularPromedio([Number(indexPromedio1),Number(indexPromedio2)]);
    mostrarResultado.textContent = `La mediana es ${medianaPar.toFixed(2)}`
    return medianaPar.toFixed(2);
  }else{
    let medianaInPar = Number(arrayOrdenado[(arrayOrdenado.length / 2) - 0.5]);
    mostrarResultado.textContent = `La mediana es ${Number(medianaInPar).toFixed(2)}`;
    return medianaInPar.toFixed(2);
  }
}
PlatziMath.ordernarArray = function ordernarArray(arr){
    return arr.sort((a,b)=>{
      return Number(a) - Number(b);
    })
}
PlatziMath.calcularCantidadElementos = function calcularCantidadElementos(arr){
  let listaCount = {};
  arr.forEach(element => {
    if(listaCount[element]){
      listaCount[element] += 1;
    }else{
      listaCount[element] = 1;
    }
  });
  return arr;
}
PlatziMath.calcularModa = function calcularModa(arr){
  let listaCount = PlatziMath.calcularCantidadElementos(arr);
  let major = {name: undefined,count: undefined};
  for(const [key, value] of Object.entries(listaCount)){
    if(major.count === undefined){
      major = {name: key,count: value}
    }else if(major.count < value){
      major = {name: key,count: value}
    }
  }
  for(const [key, value] of Object.entries(listaCount)){
    if(key !== major.name && value === major.count){
      major = false;
    }  
  }
  if(major === false){
    mostrarResultado.textContent = `No hay moda :(`;
  }else{
    mostrarResultado.textContent = `La moda es ${major.name} porque se encontro ${major.count} veces`;
  }
  return major;
}
calcularButton.addEventListener('click', ()=>{
  let tipo = tipoDeCalculo.value
  if(arrayDatos.length > 1){
    if(tipo === 'promedio'){
      PlatziMath.calcularPromedio(arrayDatos);
    }
    if(tipo === 'mediana'){
      PlatziMath.calcularMediana(arrayDatos)
    }
    if(tipo === 'moda'){
      PlatziMath.calcularModa(arrayDatos)
    }
  }else{
    mostrarResultado.textContent = `Se necesitas mas datos`;
  }
});
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
const borrarDato=(e)=>{
  // elimina el elemento del documento html
  e.target.parentElement.remove()
  let value = e.target.previousElementSibling.textContent
  let indexToDelete = arrayDatos.findIndex(element => element === value);
  // elimina el elemento de el array
  arrayDatos.splice(indexToDelete,1);
}
const notes = [
  {
      course: "Educación Física",
      note: 10,
      credit: 2,
  },
  {
      course: "Programación",
      note: 8,
      credit: 5,
  },
  {
      course: "Finanzas personales",
      note: 7,
      credit: 5,
  },
];
const notesWithCredit = notes.map(noteObject => {
  return noteObject.note * noteObject.credit;
});
const sumOfNotesWithCredit = PlatziMath.sumarElementos(notesWithCredit);

const credits = notes.map(function (noteObject) {
  return noteObject.credit;
});

const sumOfCredits = PlatziMath.sumarElementos(credits);

const promedioPonderadoNotasConCreditos = sumOfNotesWithCredit / sumOfCredits;
// console.log(promedioPonderadoNotasConCreditos,'promedioPonderadoNotasConCreditos');
console.log(PlatziMath);
