import {
db,
collection,
getDocs
} from "./firebase.js";

let grafico;

/* 🔄 CARREGAR PADRÃO */
async function carregarFinanceiro(){

    const dados = await getDocs(collection(db,"agendamentos"));
    processarDados(dados);
}

/* 🔍 FILTRAR POR MÊS */
window.filtrarMes = async function(){

    const mes = document.getElementById("mesFiltro").value;

    if(!mes) return;

    const dados = await getDocs(collection(db,"agendamentos"));
    processarDados(dados, mes);
}

/* 🧠 PROCESSAR DADOS */
function processarDados(dados, mesFiltro = null){

    let faturamento = 0;
    let sinais = 0;
    let restante = 0;
    let pagos = 0;

    let valoresPorDia = {};

    const lista = document.getElementById("listaFinanceiro");
    lista.innerHTML = "";

    dados.forEach(doc => {

        const ag = doc.data();

        /* 📅 FILTRO POR MÊS */
        if(mesFiltro && !ag.data.startsWith(mesFiltro)){
            return;
        }

        faturamento += ag.valor || 0;
        sinais += ag.sinal || 0;
        restante += ag.restante || 0;

        if(ag.statusPagamento === "Pago"){
            pagos++;
        }

        /* 🧾 TABELA */
        lista.innerHTML += `
        <tr>
        <td>${ag.nome}</td>
        <td>${ag.servico}</td>
        <td>R$ ${ag.valor}</td>
        <td>R$ ${ag.sinal}</td>
        <td>
            <span class="${ag.statusPagamento === "Pago" ? "ok" : "pendente"}">
            ${ag.statusPagamento}
            </span>
        </td>
        </tr>
        `;

        /* 📊 AGRUPAR PARA GRÁFICO */
        if(!valoresPorDia[ag.data]){
            valoresPorDia[ag.data] = 0;
        }

        valoresPorDia[ag.data] += ag.valor || 0;

    });

    /* 💰 ATUALIZA CARDS */
    document.getElementById("faturamentoMes").innerText = "R$ " + faturamento;
    document.getElementById("sinaisRecebidos").innerText = "R$ " + sinais;
    document.getElementById("restanteReceber").innerText = "R$ " + restante;
    document.getElementById("atendimentosPagos").innerText = pagos;

    /* 📊 GRÁFICO */
    renderGrafico(valoresPorDia);

    /* 📈 COMPARAÇÃO */
    compararMeses(dados);
}

/* 📊 RENDER GRÁFICO */
function renderGrafico(valoresPorDia){

    const ctx = document.getElementById("graficoFinanceiro");

    if(grafico){
        grafico.destroy(); // evita duplicar gráfico
    }

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(valoresPorDia),
            datasets: [{
                label: "Faturamento",
                data: Object.values(valoresPorDia)
            }]
        }
    });
}

/* 📈 COMPARAÇÃO ENTRE MESES */
function compararMeses(dados){

    let atual = 0;
    let anterior = 0;

    const hoje = new Date();

    const mesAtual = hoje.toISOString().slice(0,7);

    const dataAnterior = new Date();
    dataAnterior.setMonth(dataAnterior.getMonth() - 1);

    const mesAnterior = dataAnterior.toISOString().slice(0,7);

    dados.forEach(doc => {

        const ag = doc.data();

        if(ag.data.startsWith(mesAtual)){
            atual += ag.valor || 0;
        }

        if(ag.data.startsWith(mesAnterior)){
            anterior += ag.valor || 0;
        }
    });

    const diferenca = atual - anterior;

    const el = document.getElementById("comparacaoTexto");

    if(el){
        el.innerText = `Diferença em relação ao mês passado: R$ ${diferenca}`;
    }
}

/* 🚀 INICIAR */
carregarFinanceiro();