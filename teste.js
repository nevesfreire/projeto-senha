//Criar um array com as permutações de N elementos do array arr;

var arr = [1,2,3];
var n =2;
var esperados =1;
var uns = [];
var tentativa=[];
var resultado=[];
//Quantas saídas são esperadas

for(let i=arr.length;i>arr.length-n;i-=1){
 esperados = esperados *i;
}
console.log ('esperados vale '+ esperados)

//Criar array com 1s

for (let i =0;i<arr.length;i+=1){
  uns.push(1);
}
console.log ('uns vale '+ uns)

//funcao aleatória
function randomIndex(){
  let num = Math.floor(Math.random()*arr.length);
  console.log ('dentro da funcao num vale '+num)
  console.log ('dentro da random resultado vale '+ resultado)
  if(uns[num]==0){
    randomIndex();
  }else{
    return num
  }
  ;
}

//criar uma tentativa
while (resultado.length<=esperados){
  let item = criarTentativa();
for (let i=0;i<n;i+=1){
// let item = criarTentativa();
console.log("saiu do criartentativa")
let igual=0

for (let k=0;k<=resultado.length;k+=1){
  if (resultado[k] == item){
    igual =1;
    console.log("passou aqui")
  }
}
if (igual==0){
  resultado.push(item);
  console.log ('fez o push no resultado')
  console.log ("resultado.length vvale "+resultado.length)
  console.log ("valor de resultado "+ resultado)
} else{
  criarTentativa();
}
}
}
console.log ("resultado vale "+resultado)

// Funcao criarTentativa

function criarTentativa (){
  console.log ('entrou no criarTentativa')

  let num = randomIndex(); // cria index 0-6

  console.log('num vale '+ num)

  tentativa.push(arr[num]);
  console.log ("tentativa vale "+tentativa)
  uns[num] =0;

  return (tentativa)
}
console.log("tentativa vale "+tentativa)