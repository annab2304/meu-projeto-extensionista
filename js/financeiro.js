if(localStorage.getItem("adminLogado") !== "sim"){
    window.location.href = "login.html";
}

/* PROTEÇÃO LOGIN */
if(localStorage.getItem("adminLogado") !== "sim"){
    window.location.href = "login.html";
}

/* DADOS DEMO */
document.getElementById("faturamentoMes").innerText = "R$ 450,00";
document.getElementById("sinaisRecebidos").innerText = "R$ 135,00";
document.getElementById("restanteReceber").innerText = "R$ 315,00";
document.getElementById("atendimentosPagos").innerText = "2";