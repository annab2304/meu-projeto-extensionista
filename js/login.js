import {
auth,
signInWithEmailAndPassword
} from "./firebase.js";

const form = document.getElementById("formLogin");
const erro = document.getElementById("mensagemErro");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    erro.innerText = "";

    try {

        await signInWithEmailAndPassword(auth, email, senha);

        window.location.href = "painel.html";

    } catch (error) {

        erro.innerText = "Email ou senha inválidos.";
        console.log(error);

    }

});

