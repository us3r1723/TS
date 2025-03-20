"use strict";
const nomeTime = document.getElementById("nome-time");
const nomeSigla = document.getElementById("sigla-time");
const tbTimes = document.getElementById("tbTimes");
const formTime = document.getElementById("formTime");
var timeArmazenados = JSON.parse(localStorage.getItem("times") || "[]");
function salvarTimes() {
    let timesSalvar = JSON.stringify(timeArmazenados);
    localStorage.setItem("times", timesSalvar);
}
function buscaTime(id) {
    return timeArmazenados.find((p) => p.id === id);
}
function editTime(id) {
    const time = buscaTime(id);
    if (!time) {
        alert("time não encontrado!");
        return;
    }
    nomeTime.value = time.nomeTime;
    nomeSigla.value = time.siglaTime;
    deleteTime(id);
}
function deleteTime(id) {
    const time = buscaTime(id);
    if (!time) {
        alert("time não encontrado!");
        return;
    }
    const timeIndex = timeArmazenados.findIndex((p) => p.id === id);
    if (timeIndex !== -1) {
        timeArmazenados.splice(timeIndex, 1);
    }
    salvarTimes();
    atualizarTimes();
}
function atualizarTimes() {
    tbTimes.innerHTML = "";
    timeArmazenados.forEach((p) => {
        tbTimes.innerHTML += `
        <tr>
             <td>${p.nomeTime}</td>
             <td>${p.siglaTime}</td>
             <td>
                <button class="btn btn-primary" onclick="editTime(${p.id})">
                  Editar
                </button> 
                <button class="btn btn-danger" onclick="deleteTime(${p.id})">
                  Excluir
                </button> 
             </td>
        </tr>
      `;
    });
}
function salvarTime(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento]
    const novoTime = {
        id: Date.now(),
        nomeTime: nomeTime.value,
        siglaTime: nomeSigla.value
    };
    timeArmazenados.push(novoTime);
    atualizarTimes();
    salvarTimes();
    formTime.reset();
}
formTime.addEventListener("submit", salvarTime);
atualizarTimes();
