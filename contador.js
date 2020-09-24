//Fazer um array contendo um contador de N dígitos na base K, onde k é o número de cores nas opções. 
//fazer 'invertido', com o dígito menos valioso sendo o array[0] e o mais valioso os da direita. 
// var digitos =4;  //número de dígitos na senha
var k = disponiveis.length; //número de cores disponíveis
var num =[];
var resultado=[];
// let disponiveis = ["darkblue", "green", "red", "yellow", "orange", "pink", "purple"];

//criar array com n digitos (todos = 0)
function criar_array_zeros(digitos){
    for (let i =0;i<=digitos;i+=1){
        num.push(0);
      }
}
criar_array_zeros(digitos);

let cont =0;

contar()

//criar função 'contar'

function contar (){ //o num tem um último dígito para alertar quando a conta chegou ao total. 
    
    num[0]+=1;

    for (let i=0;i<digitos;i+=1){
     if (num[i]==k){
        num[i] =0;
        num[i+1]+=1;
    }
    }
tirarRepetidas(num);

if (num[digitos]==1){
    return num;
}else{
    contar();
}
return (num);
}

//criar funcao para retirar itens repetidos

function tirarRepetidas(num){
    let igual =0;
    for(let index=0;index<digitos;index+=1){
        for(let i=index-1;i>=0;i-=1){
            if (num[index]==num[i]){
                igual = 1
            }
        }
    }
    if (igual ==0){
        // console.log(num)
        resultado.push(Object.assign({}, num))
        }
    
}

// console.log(resultado)
// console.log(resultado.length)
// console.log(resultado[1][0]) // [item do array] [item do object]


function tradutor(){
    var traducao = resultado.map(function(obj) {
            return Object.keys(obj).sort().map(function(key) { 
              return obj[key];
            });
          });   
    
          for (let i=0;i<traducao.length;i+=1){
              for(let j=0;j<digitos;j+=1){
                  traducao[i][j] = disponiveis[traducao[i][j]];
              }
          }
          console.log ("length vale " +traducao.length)
    return traducao;
}
// console.log("traducao vale " + tradutor())

//traducao contem todas as combinacoes possiveis com as cores disponibilizadas e um item extra =0 em cada array. 
