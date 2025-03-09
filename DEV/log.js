var btnRequest = document.querySelector("#pedidos");
var caixa = document.querySelector(".box");
var btnEnv = document.querySelector("#envios");
var caixaE = document.querySelector(".boxE");
<<<<<<< Updated upstream
var btnLoc = document.querySelector("#locais");
var caixaL = document.querySelector(".boxL");
var submit = document.querySelector("#submit");
=======
>>>>>>> Stashed changes
let dados = {}

document.getElementById("submit").addEventListener("click", async function () {
    var id = document.getElementById("id").value;
    var input = document.getElementById("local").value;

    const dados = {
        id: id,
        nome: input
    };

    if (id !== "" && input !== "") {
        try {
            const response = await fetch("http://127.0.0.1:8080/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const respostaJson = await response.json();
            console.log("Resposta do servidor:", respostaJson);

        } catch (erro) {
            console.error("Erro ao enviar:", erro);
        }
    } else {
        console.log("Preencha todos os campos!");
    }
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
        fetch(`http://127.0.0.1:8080/list`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',  // Tipo de conteúdo da requisição (JSON)
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(myJson => {
            // Certifique-se de que a resposta contém 'status' e 'results'

            if (myJson.status === 200) { // Ou verifique o código de status correto
                let dados = myJson.results; // Obtém o array de resultados
        for(let id in dados){
            if(dados[id].status== -1){
                let linha = tabela.insertRow();
                let ID = linha.insertCell(0)
                let order = linha.insertCell(1);
                let nParts = linha.insertCell(2);
                let button = linha.insertCell(3);
                ID.textContent = dados[id].id;
                order.textContent = dados[id].n_order;
                nParts.textContent = dados[id]["spare part"];
                let botao = document.createElement("button");
                botao.textContent = "ENVIAR";
                botao.onclick = function(){
                    fetch(`http://127.0.0.1:8080/list/${encodeURIComponent(dados[id].id)}`, {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json',  // Tipo de conteúdo da requisição (JSON)
                        }
                    })
                    this.parentElement.parentElement.remove();
                };
                button.appendChild(botao); 
        }
        }
            
        }
    })
}});

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

        fetch(`http://127.0.0.1:8080/list`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',  // Tipo de conteúdo da requisição (JSON)
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(myJson => {
            // Certifique-se de que a resposta contém 'status' e 'results'

            if (myJson.status === 200) { // Ou verifique o código de status correto
                let dados = myJson.results; // Obtém o array de resultados
        for(let id in dados){
            if(dados[id].status== 0){
                let linha = tabela.insertRow();
                let ID = linha.insertCell(0)
                let order = linha.insertCell(1);
                let nParts = linha.insertCell(2);
                let stage = linha.insertCell(3);
                ID.textContent = dados[id].id;
                order.textContent = dados[id].n_order;
                nParts.textContent = dados[id]["spare part"];
                stage.textContent = dados[id].stage;
        }
        }
            
        }
    })
<<<<<<< Updated upstream
}});
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
=======
}});
>>>>>>> Stashed changes
