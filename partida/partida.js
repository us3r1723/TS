"use strict";
const timeMandante = document.getElementById("timeMandante");
const timeVisitante = document.getElementById("timeVisitante");
const selectCampeonatos = document.getElementById("campeonatos");
const tablePartidas = document.getElementById("tbPartidas");
const formPartida = document.getElementById("formPartida");
var campsArmazenados = JSON.parse(localStorage.getItem("campeonatos") || "[]");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
function salvarPartidas() {
    let partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
}
function buscaPartida(id) {
    return partidas.find((p) => p.id === id);
}
function editPartida(id) {
    const partida = buscaPartida(id);
    if (!partida) {
        alert("partida não encontrado!");
        return;
    }
    timeMandante.value = partida.timeMandante;
    timeVisitante.value = partida.timeVisitante;
    selectCampeonatos.value = partida.campeonato.id.toString();
    deletePartida(id);
}
function deletePartida(id) {
    const partida = buscaPartida(id);
    if (!partida) {
        alert("partida não encontrado!");
        return;
    }
    const partIndex = partidas.findIndex((p) => p.id === id);
    if (partIndex !== -1) {
        partidas.splice(partIndex, 1);
    }
    salvarPartidas();
    atualizarPartidas();
}
function atualizarPartidas() {
    tablePartidas.innerHTML = "";
    partidas.forEach((p) => {
        tablePartidas.innerHTML += `
      <tr>
           <td>${p.timeMandante}</td>
           <td>${p.timeVisitante}</td>
           <td>${p.campeonato.nome}</td>
           <td>
              <button class="btn btn-primary" onclick="editPartida(${p.id})" id="editCamp">
                Editar
              </button> 
              <button class="btn btn-danger" onclick="deletePartida(${p.id})" id="removeCamp">
                Excluir
              </button> 
           </td>
      </tr>
    `;
    });
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento]
    const novaPartida = {
        id: Date.now(),
        timeMandante: timeMandante.value,
        timeVisitante: timeVisitante.value,
        campeonato: campsArmazenados.find((c) => c.id.toString() === selectCampeonatos.value.toString()),
    };
    partidas.push(novaPartida);
    atualizarPartidas();
    salvarPartidas();
    formPartida.reset();
}
function renderCamps() {
    campsArmazenados === null || campsArmazenados === void 0 ? void 0 : campsArmazenados.forEach((c) => {
        const option = document.createElement("option");
        option.innerHTML = `${c.nome}`;
        option.value = c.id.toString();
        selectCampeonatos.appendChild(option);
    });
}
formPartida.addEventListener("submit", salvarPartida);
renderCamps();
atualizarPartidas();
