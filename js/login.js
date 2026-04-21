/* LOGIN SIMPLES LOCAL */
/* depois trocamos por Firebase Auth */

const form = document.getElementById("formLogin");
const erro = document.getElementById("mensagemErro");

const emailCorreto = "aline@studio.com";
const senhaCorreta = "123456";

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    erro.innerText = "";

    if(email === emailCorreto && senha === senhaCorreta){

        localStorage.setItem("adminLogado", "sim");

        window.location.href = "painel.html";

    }else{

        erro.innerText = "E-mail ou senha inválidos.";

    }

});