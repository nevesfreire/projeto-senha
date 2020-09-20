var m =2
var acc =0
var retorno =0


console.log(combinacoes(10,4, m,acc,retorno))

function combinacoes(a, b, m, acc, retorno) {
    // acc são os elementos que já fazem parte da combinação
    if ( acc == undefined ) acc = []; // no início, ela começa vazia
    // retorno é a lista de combinações encontradas
    if ( retorno === undefined ) retorno = []; // idem
    if ( m == 0 ) {        // se o número de elementos a serem inseridos chegou a zero
        retorno.push(acc); // coloque a combinação atual na lista
        return retorno;    // e retorne
    }
    if ( a > b )           // se a passou b, não existem mais combinações
        return retorno;    // retorne o que foi achado anteriormente
    // Primeiro fazemos todas as combinações que incluem a
    // i.e. combinamos a com as combinações de tamanho m-1
    combinacoes(a+1, b, m-1, acc.concat([a]), retorno);
    // Depois todas as que não incluem a
    // i.e. ignoramos a, e fazemos as combinações de a+1 pra frente
    return combinacoes(a+1, b, m, acc, retorno);
}