function salvar(event, form) {
    event.preventDefault();

    const nomeUser = document.Cadastro.inputUsername.value;
    const emailUser = document.Cadastro.inputEmail.value;
    const senhaUser = document.Cadastro.inputSenha.value;

    const dados = {
        nome: nomeUser,
        email: emailUser,
        senha: senhaUser,
    };

    const options = {
        method: 'POST',
        header: {'Content-Type':'application/json',},
        body: JSON.stringify(dados),
    };

    if (nomeUser !== ""){
        const URL = 'http://localhost:8080/api_ACAD/api/usuariologin/';
        fetch(URL, options)
        .then(resp => resp.json())
        .then(data => mostrarResposta(data))
        .catch(erro => console.log(erro));
    }
}
function mostrarResposta(data) {
    console.log(data);
    if (data.status === "sucess"){
        alert("Dados incluidos com sucesso !!!");
    } else {
    alert("Erro ao incluir os dados !!!");
    }
}