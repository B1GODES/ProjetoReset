function login(){
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value

    if(user != "" && pass != ""){
        var log = [["Tecnico", "tecnico", "tec"],["Logistica", "logistica", "log"]];
        if(user == log[0][0] && pass == log[0][1]){
            document.getElementById('resposta').innerText = log[0][2];
        }else if(user == log[1][0] && pass == log[1][1]){
            document.getElementById('resposta').innerText = log[1][2];
        }else{
            document.getElementById('resposta').innerText = "Credenciais erradas";
        }
    }else{
        document.getElementById('resposta').innerText = "Falta credencial";
    }
}