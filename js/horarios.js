const dataInput = document.getElementById("data");
const lista = document.getElementById("listaHorarios");
const textoServico = document.getElementById("servico-escolhido");

let horarioSelecionado = null;

/* SERVIÇO ESCOLHIDO */
let servico = localStorage.getItem("servico") || "Serviço selecionado";

textoServico.innerHTML =
"Procedimento: <strong>" + servico + "</strong>";

/* DATA MINIMA = HOJE */
let hoje = new Date().toISOString().split("T")[0];
dataInput.min = hoje;

/* SERVIÇOS DE 1 HORA */
const servicos1h = [
    "Design de Sobrancelha",
    "Henna",
    "Brown Lamination"
];

/* DESCOBRE TEMPO */
function duracaoServico(){

    if(servicos1h.includes(servico)){
        return 1;
    }

    return 2;
}

/* AO TROCAR DATA */
dataInput.addEventListener("change", gerarHorarios);

/* GERA HORÁRIOS */
function gerarHorarios(){

    lista.innerHTML = "";
    horarioSelecionado = null;

    if(!dataInput.value) return;

    let dataEscolhida = new Date(dataInput.value + "T00:00:00");
    let dia = dataEscolhida.getDay();

    let duracao = duracaoServico();
    let horarios = [];

    /* SEGUNDA(1) TERÇA(2) QUINTA(4) */
    if(dia === 1 || dia === 2 || dia === 4){

        if(duracao === 1){

            horarios = [
                "19:00",
                "20:00",
                "21:00"
            ];

        }else{

            horarios = [
                "19:00"
            ];

        }

    }

    /* SABADO(6) DOMINGO(0) */
    else if(dia === 6 || dia === 0){

        if(duracao === 1){

            horarios = [
                "08:00","09:00","10:00","11:00",
                "12:00","13:00","14:00","15:00","16:00"
            ];

        }else{

            horarios = [
                "08:00",
                "10:00",
                "12:00",
                "14:00"
            ];

        }

    }

    /* SEM ATENDIMENTO */
    else{

        lista.innerHTML =
        "<p class='sem-atendimento'>Nenhum atendimento nesta data.</p>";

        return;
    }

    let agora = new Date();
    let hojeTexto = agora.toISOString().split("T")[0];

    horarios.forEach(hora => {

        let botao = document.createElement("button");

        botao.type = "button";
        botao.innerText = hora;
        botao.classList.add("hora");

        /* BLOQUEIA HORÁRIOS PASSADOS DO DIA ATUAL */
        if(dataInput.value === hojeTexto){

            let horaNumero = parseInt(hora.split(":")[0]);

            if(horaNumero <= agora.getHours()){

                botao.classList.add("ocupado");

            }

        }

        /* CLICK */
        botao.addEventListener("click", () => {

            if(botao.classList.contains("ocupado")) return;

            document.querySelectorAll(".hora").forEach(item => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            horarioSelecionado = hora;

        });

        lista.appendChild(botao);

    });

}

/* CONTINUAR */
function continuar(){

    if(!dataInput.value){

        alert("Selecione uma data.");
        return;
    }

    if(!horarioSelecionado){

        alert("Selecione um horário.");
        return;
    }

    localStorage.setItem("data", dataInput.value);
    localStorage.setItem("horario", horarioSelecionado);

    window.location.href = "pagamento.html";
}