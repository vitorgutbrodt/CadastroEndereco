// adicionando evento para saber quando o usuario deixar o campo CEP
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    // verificando se já há um CEP salvo no localStorage
    const dadosSalvos = localStorage.getItem(cepInformado);

    if (dadosSalvos) {
        console.log("CEP já salvo no localStorage");
        const dados = JSON.parse(dadosSalvos);
        console.log(dados);
    } else {
        console.log("Ainda não há CEP salvo!")
    }

    // verificando se o CEP informado é válido
    if(!(cepInformado.length === 8))
    return;
    
    // usar o fetch para fazer a busca no ViaCep
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        // convertendo a resposta para json
        .then(response => response.json()) 
        .then(data => {
            // configurando para processar os dados e executar a lógica somente se não houver erro na busca
            if(!data.erro){
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("estado").value = data.uf;
                localStorage.setItem(cepInformado, JSON.stringify(data)); // salvando os dados no localStorage
                localStorage.setItem("ultimoCEP", cepInformado) // salvando último CEP para manter os dados na tela ao recarregar
            }else{
                alert("CEP não encontrado.")
            }

        })
        // configurando catch para caso de erro na busca do fetch
    .catch(error => console.error("Erro ao buscar o CEP", error));
})

document.addEventListener("DOMContentLoaded", () => { // configurando DOM para manter informações do formulário na tela
    const ultimoCEP = localStorage.getItem("ultimoCEP");

    if (ultimoCEP) {
        const dadosSalvos = localStorage.getItem(ultimoCEP);
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            document.getElementById("cep").value = ultimoCEP;
            document.getElementById("logradouro").value = dados.logradouro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("estado").value = dados.uf;
        }
    }
});


    
