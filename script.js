let contador =0;
let brancos =0;
let pretos =0;
let digitos = 4;
let local = document.querySelector(".tentativa");

// Criar as divs para cores
function criarDiv (){
    local.innerHTML ='';
    for (let index=0;index<digitos;index+=1){
        let item = document.createElement('div');
        item.classList.add("cor");
        local.appendChild(item)
    }
    let botao = document.createElement('button');
botao.id = "criarTentativa";
botao.innerText = "Pode Conferir!"
local.appendChild(botao);
}
criarDiv();

// Fazendo o cabeçalho com as 7 cores disponíveis
let disponiveis = ["darkblue", "green", "red", "yellow", "orange", "hotPink", "purple"];
let cabecalho = document.querySelectorAll(".disponiveis");
for (let index =0;index<disponiveis.length;index+=1){
    cabecalho[index].style.backgroundColor = disponiveis[index];
}
// Definir as regras
const regras = document.querySelector('.regras')
regras.style.border = "solid black 2px";
regras.innerText = `Uma senha de ${digitos} cores distintas será criada. Você tem 10 tentativas para acertar a descobrir usando seus chutes e o feedback recebido. 
Branco = Cor certa, posição errada
Preto = Cor certa, posição certa.`

// Definir quantos dígitos:
let inputDigitos = document.querySelector('#digitos');
inputDigitos.addEventListener("change",function () {
    digitos = inputDigitos.value;
    console.log ("digitos vale "+ digitos);
    selecionadas = [0,0,0,0,0,0.0];
    escolha =0;
    criarDiv();
    definirSenha();
    criarEventos();
    criarEventoBotaoTentativa();
    console.log (senha);
})
//Criando a senha com cores distintas
let senha =[];
definirSenha();

function definirSenha (){
    senha =[];
for(let index=0;index<digitos;index+=1){
    let cor = Math.floor(Math.random()*7)
    senha[index] = disponiveis[cor];
}
tirarRepetidas();

}
function tirarRepetidas(){
    let igual =0;
    for(let index=0;index<digitos;index+=1){
        for(let i=index-1;i>=0;i-=1){
            if (senha[index]==senha[i]){
                igual = 1
            }
        }
    }
    if (igual ==1){
        definirSenha();
    }
    document.getElementById("senhaDefinida").innerText = "Senha Definida. Pode começar :-)";
}


// CRIAR UMA TENTATIVA

let escolha =0;
var selecionadas=[0,0,0,0,0,0,0]
let cores = document.querySelectorAll(".cor");

// funcao achar cor não utilizada NÃO PODE COLOCAR O SELECIONADAS DENTRO DA FUNÇÃO MELHOR ESCOLHA;
function melhorEscolha(){
    if (selecionadas[escolha] ==1){
        escolha+=1;
        if (escolha ==selecionadas.length-1){
            escolha=0;
        }
        console.log(selecionadas)
        melhorEscolha();
    }
}
function zerarCorAtual(index){

let cores = document.querySelectorAll(".cor");
    console.log("zerar cor. Selecionada vale "+ selecionadas)
    let qual = cores[index].style.backgroundColor;
    console.log ("qual vale "+ qual)
    if (disponiveis.indexOf(qual) < 0){
        selecionadas[disponiveis.indexOf(qual)+1] =0;
    }else {
        selecionadas[disponiveis.indexOf(qual)] =0;
    }
    console.log ("index of qual vale " + disponiveis.indexOf(qual))
}

function criarEventos(){
let cores = document.querySelectorAll(".cor");
for(let index=0;index<cores.length;index+=1){
    cores[index].addEventListener("click", function(){
        
        zerarCorAtual(index);
        melhorEscolha();

        cores[index].style.backgroundColor = disponiveis[escolha];
        console.log ("escolha vale "+ escolha)
        selecionadas[escolha] =1;
        escolha +=1;    

        if (escolha >= disponiveis.length){
            escolha =0;
        } 
    })
}
}
criarEventos();
function criarEventoBotaoTentativa (){
let criarTentaviva = document.querySelector("#criarTentativa");

criarTentaviva.addEventListener("click",function(){
    
    if (contador<10){
    let tentativa =[];    
    contador +=1;
    let cores = document.querySelectorAll(".cor");

    for (let index=0;index<digitos;index+=1){
        tentativa[index] = cores[index].style.backgroundColor;
    }
    console.log("tentativa vale: " + tentativa);

    let pai = document.createElement('div')
    let arquivo = document.getElementById("arquivo");
    arquivo.prepend(pai);

    for(let index=0;index<tentativa.length;index+=1){
        let um =document.createElement('div');
        um.classList.add("arquivo");
        um.style.backgroundColor = tentativa[index];
        pai.appendChild(um);
    }
    let feedback =document.createElement('div');
    pai.appendChild(feedback);
    feedback.classList.add ("feedback");
    let cont = document.createElement('p');
    cont.innerText = 'Tentativa: ' + contador+"/10";
    cont.classList.add('contador')
    
    let resposta = (conferir(tentativa,brancos, pretos));
    
    gerarFeedback(feedback, resposta);
    feedback.appendChild(cont);
    if  (resposta[1]==digitos){
        document.getElementById("senhaDefinida").innerText = "PARABÉNS! VOCÊ ACERTOU A SENHA";
        // criarTentaviva.removeEventListener("click")
    } else if(contador==10){
        document.getElementById("senhaDefinida").innerText = "Você chegou ao máximo de tentativas =/";
        document.getElementById("senhaDefinida").style.color = "red"
        // criarTentaviva.removeEventListener("click")
    } 

    branco =0;
    preto =0;
}
})
}
criarEventoBotaoTentativa();
function gerarFeedback(feedback,resposta){
    let branco =resposta[0];
    let preto = resposta[1];
    for (let index=0;index<branco;index+=1){
        console.log("entrou no branco")
        let whiteBall = document.createElement('div');
        whiteBall.classList.add("white");
        feedback.appendChild(whiteBall);
    
    }

    for (let index=0;index<preto;index+=1){
        console.log("entrou no preto")
        let blackBall = document.createElement('div');
        blackBall.classList.add("black");
        feedback.appendChild(blackBall);
        }
}

function conferir (tentativa,brancos, pretos){
    for (let index=0;index<digitos;index+=1){
        if (tentativa[index]== senha[index]){
            pretos+=1;
        }
    }
    for(let index=0;index<digitos;index+=1){
        for(let i=0;i<digitos;i+=1){
            if (tentativa[i]==senha[index]){
                brancos +=1;
            }
        }
    }
    brancos = brancos -pretos;
    let resposta = [brancos, pretos];
    return(resposta);
}

//contador abaixo

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
tirarRepetidas2(num);

if (num[digitos]==1){
    return num;
}else{
    contar();
}
return (num);
}

//criar funcao para retirar itens repetidos

function tirarRepetidas2(num){
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

