document.getElementById("formAgendamento")
.addEventListener("submit", function(e){

    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let servico = document.getElementById("servico").value;
    let obs = document.getElementById("obs").value;

    localStorage.setItem("nome", nome);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("servico", servico);
    localStorage.setItem("obs", obs);

    window.location.href = "horarios.html";

});