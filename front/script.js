
//Função responsável por buscar os pedidos na API e exibir na tela
function listarPedidos(){
    //Busca no HTML o elemento onde a lista será exibida
const lista = document.getElementById("lista");

//Limpa a lista antes de exibir os pedidos 
lista.innerHTML = "Carregando pedidos...";

//Faz uma requisição GET para a API com a url dela publicada
//(ou local)
fetch("https://nodejs-api-publish-tii12-ugd7.onrender.com/pedidos")
// Converte a resposta da API para JSON
.then(res => res.json())

// Vamos trabalhar com o resultado da API
.then(resultado => {
    // Limpando a lista para preencher com os pedidos
 lista.innerHTML= "";

 //Percorrendo o array de pedidos recebido da API
 resultado.dados.forEach(pedido => {
    //Cria um item de lista para cada pedido
 const item = document.createElement("li");
//Define como o texto será exebido na tela
 item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} 
 | ${pedido.status}`;

 // Adiciona o item criando dentro da lista no HTML
 lista.appendChild(item);
 });

})
// Caso o front não consiga acessar a API para trazer os dados
 .catch(() =>{
    lista.innerHTML = "Erro ao carregar pedidos"
 });
};

// Criar pedido (POST)
//Função responsável por cadastrar um novo pedido
function cadastrarPedido() {
   // Pega os valores digitados nos inputs do HTML e depois limpa
   const cliente = document.getElementById("cliente").value;
   const produto = document.getElementById('produto').value;


   // Envia uma requisição POST para a API
   fetch("https://nodejs-api-publish-tii12-ugd7.onrender.com/pedidos",{
      method: "POST",
      // Informa que os dados enviados estão no formato JSON
      headers:{
         'Content-Type': "application/JSON"
      },
      //Converte a objeto JavaScript em JSON para enviar no body
      body: JSON.stringify({
         id: Date.now(), //incluir
         cliente: cliente,
         produto: produto,
         status: "pendente"
      })
   })
   // Converte a resposta da API para JSON
   .then(res => res.json())

   // Depois que o pedido for cadastrado, atualizado a lista na tela
   .then(() => {
      //Limpa os inputs apos o envio do cadastro
   document.getElementById("cliente").value = "";
   document.getElementById("produto").value = "";

   //Atualizada a lista na tela
   listarPedidos();
   })
   //Alerta o usuário caso não seja possivel realizar o cadastro do pedido
   .catch(() => {
      alert("Erro ao cadastrar pedido");
   });
}

//Atualizar Pedido (PUT)
//Função responsavel por atualizar o status de um pedido
function atualizarPedido(){
   //Pega 0o id informado e o força a ser um numero
   const id = Number(document.getElementById("idAtualizar").value);
   //pega o novo status do pedido digitado no input
   const status = document.getElementById("statusAtualizar").value;

   //Envia uma requisição PUT para a API
   fetch("https://nodejs-api-publish-tii12-ugd7.onrender.com/pedidos", {
      method: "PUT",
      headers:{
         'Content-Type': 'application/JSON'
      },
      // Envia o ID e novo status do pedido
      body: JSON.stringify({
         id: id,
         status: status
      })

   })

   .then(res => res.json())

   //Depois que atualizar, buscara a lista novamente
   .then(() =>{
      document.getElementById("idAtualizar").value="";
      document.getElementById("statusAtualizar").value = "";
      //Reexibe a lista atualizada
      listarPedidos();
   })
   //Alerta caso não seja possivel atualizar o pedido
   .catch(() =>{
      alert("Erro ao editar pedido");
   })
}

// Removendo pedido
//Função responsável por cancelar um pedido
function removerPedido(){
   const id = Number(document.getElementById("idRemover").value);

   fetch("https://nodejs-api-publish-tii12-ugd7.onrender.com/pedidos",{
      method: "DELETE",
      headers:{
         'Content-Type': 'application/JSON'
      },
     // Envia apenas o id do pedido que será removido
      body: JSON.stringify({
         id: id
      })
   })
   .then(res => res.json())
   .then(() => {
      document.getElementById("idRemover").value = "";
      listarPedidos();
   })
   .catch(() => {
      alert("Erro ao cancelar o pedido");
   });
}
//Chama a função assim que a página carregar. Assim os pedidos já
//aparecem automaticamente na tela 
listarPedidos();