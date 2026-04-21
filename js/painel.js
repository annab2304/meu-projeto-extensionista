import {
auth,
onAuthStateChanged,
db,
collection,
getDocs,
updateDoc,
doc
} from "./firebase.js";

/* 🔐 PROTEÇÃO LOGIN */
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        carregar();
    }
});

/* 📊 CARREGAR AGENDAMENTOS */
async function carregar(){

    const lista = document.getElementById("listaAgenda");
    const dados = await getDocs(collection(db,"agendamentos"));

    lista.innerHTML = "";

    dados.forEach((item)=>{

        const ag = item.data();

        lista.innerHTML += `
        <tr>
            <td>${ag.nome}</td>
            <td>${ag.servico}</td>
            <td>${ag.data}</td>
            <td>${ag.horario}</td>

            <td>
                <span class="status ${
                    ag.status === "Pendente" ? "pendente" : "confirmado"
                }">
                ${ag.status}
                </span>
            </td>

            <td>
                <span class="status ${
                    ag.statusPagamento === "Pago" ? "confirmado" : "pendente"
                }">
                ${ag.statusPagamento || "Pendente"}
                </span>
            </td>

            <td>
                ${
                    ag.statusPagamento === "Pago"
                    ? "✔️"
                    : `<button class="btn-confirmar" onclick="confirmar('${item.id}')">
                        Confirmar
                       </button>`
                }
            </td>

            <td>
                <button class="btn-editar"
                    onclick="editar('${item.id}', '${ag.nome}', '${ag.servico}', '${ag.data}', '${ag.horario}')">
                    Editar
                </button>
            </td>
        </tr>
        `;
    });
}

/* 💰 CONFIRMAR PAGAMENTO */
window.confirmar = async function(id){

    await updateDoc(doc(db,"agendamentos",id),{
        statusPagamento: "Pago"
    });

    carregar();
}

/* 🔍 FILTRAR POR DATA */
window.filtrar = async function(){

    const dataFiltro = document.getElementById("filtroData").value;

    const lista = document.getElementById("listaAgenda");
    const dados = await getDocs(collection(db,"agendamentos"));

    lista.innerHTML = "";

    dados.forEach((item)=>{

        const ag = item.data();

        if(ag.data === dataFiltro){

            lista.innerHTML += `
            <tr>
                <td>${ag.nome}</td>
                <td>${ag.servico}</td>
                <td>${ag.data}</td>
                <td>${ag.horario}</td>

                <td>${ag.status}</td>

                <td>${ag.statusPagamento || "Pendente"}</td>

                <td>-</td>

                <td>
                    <button onclick="editar('${item.id}', '${ag.nome}', '${ag.servico}', '${ag.data}', '${ag.horario}')">
                        Editar
                    </button>
                </td>
            </tr>
            `;
        }
    });
}

/* ✏️ ABRIR MODAL */
window.editar = function(id, nome, servico, data, horario){

    document.getElementById("editId").value = id;
    document.getElementById("editNome").value = nome;
    document.getElementById("editServico").value = servico;
    document.getElementById("editData").value = data;
    document.getElementById("editHorario").value = horario;

    document.getElementById("modalEditar").style.display = "flex";
}

/* 💾 SALVAR EDIÇÃO */
window.salvarEdicao = async function(){

    const id = document.getElementById("editId").value;

    await updateDoc(doc(db,"agendamentos",id),{
        nome: document.getElementById("editNome").value,
        servico: document.getElementById("editServico").value,
        data: document.getElementById("editData").value,
        horario: document.getElementById("editHorario").value
    });

    fecharModal();
    carregar();
}

/* ❌ FECHAR MODAL */
window.fecharModal = function(){
    document.getElementById("modalEditar").style.display = "none";
}