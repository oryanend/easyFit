function salvar(event, form) {
    event.preventDefault(); //para evitar o cancelamento do evento
    //As variáveis para armazenar os dados digitados por usuário
    const nomeUser = document.Cadastro.inputUsername.value;
    const emailUser = document.Cadastro.inputEmail.value;
    const senhaUser = document.Cadastro.inputSenha.value;
    //Uma lista para armazenar o conjunto de dados obtidos em formato JSON
    const dados = {
    nome: nomeUser,
    email: emailUser,
    senha: senhaUser,
};
    //Uma lista para os dados de configuração
    const options = {
    method: 'POST', //o método 'post' é para enviar os dados
    header: {'Content-Type':'application/json',},
    //O comando JSON.stringify(dados) converter o formato JSON para texto normal
    body: JSON.stringify(dados),
};
    if (nomeUser != ""){
    const URL = 'http://localhost:8080/api_ACAD/api/usuariologin/'; //endereço do api
    fetch(URL, options)
    .then(resp => resp.json())
    .then(data => mostrarResposta(data))
    .catch(erro => console.log(erro));
}
}
    //Criamos a função: mostrarResposta(data)
    function mostrarResposta(data) {
    console.log(data); //pode ter ou não
    if (data.status === "sucess"){
    alert("Dados incluidos com sucesso !!!");
}else{
    alert("Erro ao incluir os dados !!!");
}
}