function login() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;

    if (user !== "" && pass !== "") {
        // Envia a requisição para o backend usando fetch
        fetch(`http://127.0.0.1:8080/user/${encodeURIComponent(user)}`, {
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
                if (myJson.results && myJson.results.password === pass) {
                    document.getElementById('resposta').innerText = "Login bem-sucedido!";
                } else {
                    document.getElementById('resposta').innerText = "Senha incorreta";
                }

                if(myJson.results && myJson.results.func){
                    document.getElementById('resposta').innerText = "OPERADOR";
                    window.location.href = 'GUILogistica.html';
                }else{
                    document.getElementById('resposta').innerText = "TECNICO";
                    window.location.href = 'GUI_tecnico.html';

                }
            } else {
                document.getElementById('resposta').innerText = myJson.errors || "Erro desconhecido";
            }
        })
        .catch(error => {
            // Se houver erro na requisição
            console.error('Erro ao fazer a requisição:', error);
            document.getElementById('resposta').innerText = `Erro: ${error.message}`;
        });
    } else {
        document.getElementById('resposta').innerText = "Falta credencial";
    }
}


function procurarLocal() {
    var valor = document.getElementById('local').value;
    if (valor !== ""){
        if(valor < 100 || valor > 200) {
            document.getElementById('valor').innerText = "Número de banca inválido";
        }else {
            fetch(`http://127.0.0.1:8080/local`, {
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
                    if (myJson.results && myJson.results.some(item=>item.id == 1000 + Number(valor))) {
                        document.getElementById('valor').innerText = "Banca Existe";
                        window.location.href = 'GUIlista.html';
                    } else {
                        document.getElementById('valor').innerText = "Banca não encontrada";
                    }
                } else {
                    document.getElementById('valor').innerText = myJson.errors || "Erro desconhecido";
                }
            })
            .catch(error => {
                // Se houver erro na requisição
                console.error('Erro ao fazer a requisição:', error);
                document.getElementById('valor').innerText = `Erro: ${error.message}`;
            });
            
        }
    }
}



function procurarItens(option){
    var valorrr = document.getElementById('localll').value;

    if (valorrr !== ""){
        // URL do endpoint que retorna os dados da base (substitua pela URL real)


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
                    let data = myJson.results; // Obtém o array de resultados
                    let tbody = document.getElementById('tabela-dados');
                            // Limpa a tabela antes de atualizar
                    tbody.innerHTML = '';
                            // Itera sobre os dados e cria as linhas da tabela
                    data.forEach(item => {
                                if(option === 0){
                                    if(item["spare part"] == valorrr && item.status !== -1){
                                        let row = document.createElement('tr');
    
                                        // Cria células (td) para cada propriedade
                                        let cellId = document.createElement('td');
                                        cellId.textContent = item.id;
                                        row.appendChild(cellId);
    
                                        let cellOrder = document.createElement('td');
                                        cellOrder.textContent = item.n_order !== null ? item.n_order : 'N/A';
                                        row.appendChild(cellOrder);
    
                                        let cellSpare = document.createElement('td');
                                        cellSpare.textContent = item["spare part"];
                                        row.appendChild(cellSpare);
    
                                        let cellStage = document.createElement('td');
                                        cellStage.textContent = item.stage;
                                        row.appendChild(cellStage);
    
                                        // Adiciona a linha ao corpo da tabela
                                        tbody.appendChild(row);
                                    }
                                }else{
                                    if(item.n_order == valorrr && item.status !== -1){
                                        let row = document.createElement('tr');

                                        // Cria células (td) para cada propriedade
                                        let cellId = document.createElement('td');
                                        cellId.textContent = item.id;
                                        row.appendChild(cellId);

                                        let cellOrder = document.createElement('td');
                                        cellOrder.textContent = item.n_order !== null ? item.n_order : 'N/A';
                                        row.appendChild(cellOrder);

                                        let cellSpare = document.createElement('td');
                                        cellSpare.textContent = item["spare part"];
                                        row.appendChild(cellSpare);

                                        let cellStage = document.createElement('td');
                                        cellStage.textContent = item.stage;
                                        row.appendChild(cellStage);

                                        // Adiciona a linha ao corpo da tabela
                                        tbody.appendChild(row);
                                 }
                                }
                            })
                } else {
                    document.getElementById('valorrr').innerText = myJson.errors || "Erro desconhecido";
                }
            })
            .catch(error => {
                // Se houver erro na requisição
                console.error('Erro ao fazer a requisição:', error);
                document.getElementById('valorrr').innerText = `Erro: ${error.message}`;
            });
    }else{
         document.getElementById('valorrr').innerText = "Falta credencial";
    }
}

