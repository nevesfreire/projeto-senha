let contador =0;
let brancos =0;
let pretos =0;
let digitos = 7;
let local = document.querySelector(".tentativa");
// Criar as divs para cores
for (let index=0;index<digitos;index+=1){
    let item = document.createElement('div');
    item.classList.add("cor");
    local.appendChild(item)
}
let botao = document.createElement('button');
botao.id = "criarTentativa";
botao.innerText = "Pode Conferir!"
local.appendChild(botao);

// Fazendo o cabeçalho com as 7 cores disponíveis
let disponiveis = ["darkblue", "green", "red", "yellow", "orange", "pink", "purple"];
let cabecalho = document.querySelectorAll(".disponiveis");
for (let index =0;index<disponiveis.length;index+=1){
    cabecalho[index].style.backgroundColor = disponiveis[index];
}
//Criando a senha com cores distintas
let senha =[];
definirSenha();
function definirSenha (){
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

console.log("senha vale: " +senha);

// CRIAR UMA TENTATIVA

let escolha =0;
var selecionadas=[0,0,0,0,0,0,0]
let cores = document.querySelectorAll(".cor");
for(let index=0;index<cores.length;index+=1){
    cores[index].addEventListener("click", function(){
        // let escolha=0;
        // console.log(selecionadas    )
        // for(let index=0;index<selecionadas.length;index+=1){

        //     if(selecionadas[escolha]==1){
        //         escolha+=1;
        //     }
        // }
      
        
        cores[index].style.backgroundColor = disponiveis[escolha];
        // selecionadas[escolha] =1;
        escolha +=1;
        if (escolha == disponiveis.length){
            escolha =0;
        } else{
           
        }
    })
}
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
