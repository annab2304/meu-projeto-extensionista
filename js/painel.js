/* DEMO VISUAL - depois ligamos no Firebase */
if(localStorage.getItem("adminLogado") !== "sim"){
    window.location.href = "login.html";
}

document.getElementById("totalHoje").innerText = "3";
document.getElementById("totalMes").innerText = "18";
document.getElementById("pendentes").innerText = "1";
document.getElementById("proximoHorario").innerText = "10:00";