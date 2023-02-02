// console.log(salarios,'salarios');
function encontrarPersona(array,nombrePersona){
  return array.find((persona) => persona.name === nombrePersona);
}
function medianaPorPersona(array,nombrePersona) {
  let trabajos = encontrarPersona(array, nombrePersona).trabajos;
  let salariosTrabajo = trabajos.map(element => element.salario);
  return PlatziMath.calcularMediana(salariosTrabajo);
}
medianaPorPersona(salarios,"Juanita")
function proyeccionPorPersona(array,nombrePersona){
  let trabajos = encontrarPersona(array, nombrePersona).trabajos;
  let porcentajesCrecimiento = [];

  for (let i = 1; i < trabajos.length; i++) {
    const salarioActual = trabajos[i].salario;
    const salarioPasado = trabajos[i - 1].salario;
    const crecimiento = salarioActual - salarioPasado;
    const porcentajeCrecimiento = crecimiento / salarioPasado;
    porcentajesCrecimiento.push(porcentajeCrecimiento);
  }
  const medianaPocentajesCrecimiento= PlatziMath.calcularMediana(porcentajesCrecimiento)
  const ultimoSalario = trabajos[trabajos.length - 1].salario;
  const aumento = Number(ultimoSalario) * Number(medianaPocentajesCrecimiento)
  const nuevoSalario = ultimoSalario + aumento;
}

proyeccionPorPersona(salarios,"Juanita")