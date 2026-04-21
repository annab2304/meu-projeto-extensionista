import {
db,
collection,
getDocs
} from "./firebase.js";

const dataInput = document.getElementById("data");
const lista = document.getElementById("listaHorarios");

let horarioSelecionado = null;

/* SERVIÇO */
let servico = localStorage.getItem("servico");

/* SERVIÇOS 1H */
const servicos1h = [
"Design de Sobrancelha",
"Henna",
"Brown Lamination"
];

function duracaoServico(){
    return servicos1h.includes(servico) ? 1 : 2;
}

/* GERAR HORÁRIOS */
dataInput.addEventListener("change", gerarHorarios);

async function gerarHorarios(){

    lista.innerHTML = "";

    let dataEscolhida = dataInput.value;

    if(!dataEscolhida) return;

    let dataObj = new Date(dataEscolhida + "T00:00:00");
    let dia = dataObj.getDay();
    let duracao = duracaoServico();

    let horarios = [];

    /* SEMANA */
    if(dia === 1 || dia === 2 || dia === 4){
        horarios = duracao === 1
        ? ["19:00","20:00","21:00"]
        : ["19:00"];
    }

    /* FDS */
    else if(dia === 6 || dia === 0){
        horarios = duracao === 1
        ? ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"]
        : ["08:00","10:00","12:00","14:00"];
    }

    else{
        lista.innerHTML = "<p>Nenhum atendimento nesta data.</p>";
        return;
    }

    /* 🔥 BUSCAR HORÁRIOS OCUPADOS */
    const dados = await getDocs(collection(db,"agendamentos"));

    let ocupados = [];

    dados.forEach((doc)=>{
        const ag = doc.data();

        if(ag.data === dataEscolhida){
            ocupados.push(ag.horario);
        }
    });

    /* RENDER */
    horarios.forEach(hora => {

        let botao = document.createElement("button");
        botao.innerText = hora;
        botao.classList.add("hora");

        if(ocupados.includes(hora)){
            botao.classList.add("ocupado");
            botao.disabled = true;
        }

        botao.onclick = () => {

            document.querySelectorAll(".hora").forEach(b=>{
                b.classList.remove("ativo");
            });

            botao.classList.add("ativo");
            horarioSelecionado = hora;
        };

        lista.appendChild(botao);
    });
}