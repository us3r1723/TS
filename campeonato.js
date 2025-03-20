"use strict";
//Variáveis globais
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const tipo = document.getElementById("tipo");
const dataInicio = document.getElementById("dataInicio");
const dataFim = document.getElementById("dataInicio");
function buscaCamp(id) {
    return campeonatos.find(c => c.id === id);
}
function editCamp(id) {
    const camp = buscaCamp(id);
    if (!camp) {
        alert("Campeonato não encontrado!");
        return;
    }
    nome.value = camp.nome;
    categoria.value = camp.categoria;
    tipo.value = camp.tipo;
    dataInicio.value = camp.dataInicio;
    dataFim.value = camp.dataInicio;
    deleteCamp(id);
}
function deleteCamp(id) {
    const camp = buscaCamp(id);
    if (!camp) {
        alert("Campeonato não encontrado!");
        return;
    }
    const campIndex = campeonatos.findIndex(c => c.id === id);
    if (campIndex !== -1) {
        campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function atualizarTabela() {
    tabelaCampeonato.innerHTML = "";
    campeonatos.forEach((c) => {
        tabelaCampeonato.innerHTML += `
    <tr>
         <td>${c.nome}</td>
         <td>${c.categoria}</td>
         <td>${c.tipo}</td>
         <td>${c.dataInicio}</td>
         <td>${c.dataFim}</td>
         <td>
            <button class="btn btn-primary" onclick="editCamp(${c.id})" id="editCamp">
              Editar
            </button> 
            <button class="btn btn-danger" onclick="deleteCamp(${c.id})" id="removeCamp">
              Excluir
            </button> 
         </td>
    </tr>
  `;
    });
}
function salvarLocalStorage() {
    let campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoCampeonato = {
        id: Date.now(),
        categoria: categoria.value,
        dataFim: dataFim.value,
        dataInicio: dataInicio.value,
        nome: nome.value,
        tipo: tipo.value,
    };
    campeonatos.push(novoCampeonato);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
}
formCampeonato.addEventListener("submit", salvar);
atualizarTabela();
