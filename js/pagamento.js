const opcoes = document.querySelectorAll(".opcao");

opcoes.forEach(opcao => {

    opcao.addEventListener("click", ()=>{

        opcoes.forEach(o => o.classList.remove("ativo"));

        opcao.classList.add("ativo");

        opcao.querySelector("input").checked = true;

    });

});

function irPagamento(){

    let escolha = document.querySelector("input[name='pagamento']:checked");

    localStorage.setItem("pagamento", escolha.parentElement.innerText);

    alert("Pagamento será integrado na próxima etapa.");

    window.location.href = "confirmacao.html";
}