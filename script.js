let contador =0;
let brancos =0;
let pretos =0;
let digitos = 4;
let local = document.querySelector(".tentativa");
let traducao =[];

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
    console.log ("valor da senha "+senha);
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
console.log ("Senha vale "+ senha);
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
let selecionadas=[0,0,0,0,0,0,0]
let cores = document.querySelectorAll(".cor");

// funcao achar cor não utilizada NÃO PODE COLOCAR O SELECIONADAS DENTRO DA FUNÇÃO MELHOR ESCOLHA;
function melhorEscolha(){
    if (selecionadas[escolha] ==1){
        escolha+=1;
        if (escolha ==selecionadas.length){
            escolha=0;
        }
        console.log(selecionadas)
        melhorEscolha();
    }
}
function zerarCorAtual(index){

let cores = document.querySelectorAll(".cor");
    let qual = cores[index].style.backgroundColor;
    if (disponiveis.indexOf(qual)!=-1){
        selecionadas[disponiveis.indexOf(qual)] =0;
        console.log ("index da cor zerada vale " + disponiveis.indexOf(qual));
    }

    console.log("zerar cor. Selecionada vale "+ selecionadas)
    
}

function criarEventos(){
let cores = document.querySelectorAll(".cor");
for(let index=0;index<cores.length;index+=1){
    cores[index].addEventListener("click", function(){
        
        zerarCorAtual(index);
        melhorEscolha();

        cores[index].style.backgroundColor = disponiveis[escolha];
        // console.log ("escolha vale "+ escolha)
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
   testarCombinacoes(traducao,tentativa);
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
let k = disponiveis.length; //número de cores disponíveis
let num =[];
let resultado=[];
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
    traducao = resultado.map(function(obj) { //se der errado, coloca um 'let ' aqui
            return Object.keys(obj).sort().map(function(key) { 
              return obj[key];
            });
          });   
    
          for (let i=0;i<traducao.length;i+=1){
              for(let j=0;j<digitos;j+=1){
                  traducao[i][j] = disponiveis[traducao[i][j]];
              }
          }
          console.log ("traducao length vale " +traducao.length);
          localStorage.clear();
          localStorage.setItem('aprovados',traducao);
        //   testarCombinacoes(traducao)

// console.log ("teste" + conferir(traducao[0],0,0))
    return traducao;
}
 traducao = tradutor();
// console.log("traducao vale " + tradutor())

function testarCombinacoes(entrada, tentativa){
    console.log ("valor da tentativa na entrada da funcao "+ tentativa);
    
        let traducao = localStorage.getItem('aprovados'); 
        console.log("traducao depois de copiar "+traducao.length)

    let aprovados =[] 

    for (let i=0;i<traducao.length;i+=1){
        if (conferir(traducao[i],0,0)[0]==conferir(tentativa,0,0)[0] && conferir(traducao[i],0,0)[1]==conferir(tentativa,0,0)[1] ){
            console.log("passou arui")
            aprovados.push(traducao[i]);
        }
    }
    console.log ("aprovados.length vale "+aprovados.length)
    
    console.log ("agora a traducao vale " + traducao.length)
    localStorage.setItem('aprovados',aprovados);    
}

// ESSA FUNCAO TESTAR COMBINACOES NÃO ESTÁ FILTRANDO TODAS AS VEZES. APENAS FAZENDO A PRIMEIRA ITERACAO. 


//traducao contem todas as combinacoes possiveis com as cores disponibilizadas e um item extra =0 em cada array. 

