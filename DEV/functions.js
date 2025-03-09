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
