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
