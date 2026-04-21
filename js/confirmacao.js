document.getElementById("servico").innerText =
localStorage.getItem("servico") || "-";

document.getElementById("data").innerText =
localStorage.getItem("data") || "-";

document.getElementById("horario").innerText =
localStorage.getItem("horario") || "-";

document.getElementById("pagamento").innerText =
localStorage.getItem("pagamento") || "Pendente";