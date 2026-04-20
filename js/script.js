/* MENU */

function abrirMenu(){
    document.getElementById("menu-mobile").classList.add("ativo");
    document.getElementById("overlay").classList.add("ativo");
}

function fecharMenu(){
    document.getElementById("menu-mobile").classList.remove("ativo");
    document.getElementById("overlay").classList.remove("ativo");
}

/* SLIDER */

let slides = document.querySelectorAll(".slide");
let atual = 0;

setInterval(() => {

    slides[atual].classList.remove("ativo");

    atual = (atual + 1) % slides.length;

    slides[atual].classList.add("ativo");

}, 4000);