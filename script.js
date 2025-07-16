// adicionando evento para saber quando o usuario deixar o campo CEP
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

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
            }else{
                alert("CEP não encontrado.")
            }

        })
        // configurando catch para caso de erro na busca do fetch
        .catch(error => console.error("Erro ao buscar o CEP", error));

        
})


    
