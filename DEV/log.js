var btnRequest = document.querySelector("#pedidos");
var caixa = document.querySelector(".box");
var btnEnv = document.querySelector("#envios");
var caixaE = document.querySelector(".boxE");
var btnLoc = document.querySelector("#locais");
var caixaL = document.querySelector(".boxL");
var submit = document.querySelector("#submit");
let dados = {
    "10000" :{"Order": "101", "NParts": "3", "estado": "-1"},
    "10020" :{"Order": "103", "NParts": "1", "estado": "0"},
    "10012" :{"Order": "100", "NParts": "5", "estado": "1"},
    "10001" :{"Order": "109", "NParts": "20", "estado": "-1"},
}

submit.addEventListener("click", function(){
    var input = document.getElementById("local").value;
    //podes brincar com este input
});

btnRequest.addEventListener("click", function(){
    if(caixa.style.display === "block"){
        caixa.style.display = "none";
        document.querySelector("#tabela tbody").innerHTML = "";
    }else{
        caixaE.style.display = "none";
        caixaL.style.display = "none";
        caixa.style.display = "block";
        document.querySelector("#tabelaE tbody").innerHTML = "";
        let tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];

        for(let id in dados){
            if(dados[id].estado == -1){
                let linha = tabela.insertRow();
                let ID = linha.insertCell(0)
                let order = linha.insertCell(1);
                let nParts = linha.insertCell(2);
                let button = linha.insertCell(3);
                ID.textContent = id;
                order.textContent = dados[id].Order;
                nParts.textContent = dados[id].NParts;
                let botao = document.createElement("button");
                botao.textContent = "ENVIAR";
                botao.onclick = function(){
                    dados[id].estado = 0;
                    this.parentElement.parentElement.remove();
                };
                button.appendChild(botao); 
            }
            
        }
    }
});

btnEnv.addEventListener("click", function(){
    if(caixaE.style.display === "block"){
        caixaE.style.display = "none";
        document.querySelector("#tabelaE tbody").innerHTML = "";
    }else{
        caixa.style.display = "none";
        caixaL.style.display = "none";
        caixaE.style.display = "block";
        document.querySelector("#tabela tbody").innerHTML = "";
        let tabela = document.getElementById("tabelaE").getElementsByTagName("tbody")[0];

        for(let id in dados){
            if(dados[id].estado == 0){
                let linha = tabela.insertRow();
                let ID = linha.insertCell(0)
                let order = linha.insertCell(1);
                let nParts = linha.insertCell(2);
                let stage = linha.insertCell(3);

                ID.textContent = id;
                order.textContent = dados[id].Order;
                nParts.textContent = dados[id].NParts;
                stage.textContent = "Stock Out"; 
            }
            
        }
    }
});

btnLoc.addEventListener("click", function(){
    if(caixaL.style.display === "block"){
        caixaL.style.display = "none";
    }else{
        caixa.style.display = "none";
        caixaE.style.display = "none";
        caixaL.style.display = "block";
        document.querySelector("#tabela tbody").innerHTML = "";
        document.querySelector("#tabelaE tbody").innerHTML = "";
    }
});