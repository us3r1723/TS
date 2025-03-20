const timeMandante = document.getElementById(
  "timeMandante"
) as HTMLInputElement;
const timeVisitante = document.getElementById(
  "timeVisitante"
) as HTMLInputElement;
const selectCampeonatos = document.getElementById(
  "campeonatos"
) as HTMLSelectElement;
const tablePartidas = document.getElementById("tbPartidas") as HTMLElement;
const formPartida = document.getElementById("formPartida") as HTMLFormElement;

interface Campeonato {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

interface Partida {
  id: number;
  timeMandante: string;
  timeVisitante: string;
  campeonato: Campeonato;
}

var campsArmazenados = JSON.parse(localStorage.getItem("campeonatos") || "[]");

var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

function salvarPartidas() {
  let partidasSalvar = JSON.stringify(partidas);
  localStorage.setItem("partidas", partidasSalvar);
}

function buscaPartida (id:number):Partida | undefined {
    return partidas.find((p:Partida) => p.id === id);
}

function editPartida(id: number) {
  const partida = buscaPartida(id);

  if (!partida) {
    alert("partida não encontrado!");
    return;
  }

  timeMandante.value = partida.timeMandante
  timeVisitante.value = partida.timeVisitante
  selectCampeonatos.value = partida.campeonato.id.toString()

  deletePartida(id);

}

function deletePartida(id: number) {
  const partida = buscaPartida(id);

  if (!partida) {
    alert("partida não encontrado!");
    return;
  }

  const partIndex = partidas.findIndex((p:Partida) => p.id === id);
  if (partIndex !== -1) {
    partidas.splice(partIndex, 1);
  }

  salvarPartidas();
  atualizarPartidas();

}

function atualizarPartidas() {
  tablePartidas.innerHTML = "";
  partidas.forEach((p:Partida) => {
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

function salvarPartida(event: Event) {
  event?.preventDefault(); //cancelar o disparo do evento]
  const novaPartida: Partida = {
    id: Date.now(),
    timeMandante: timeMandante.value,
    timeVisitante: timeVisitante.value,
    campeonato: campsArmazenados.find(
      (c: Campeonato) => c.id.toString() === selectCampeonatos.value.toString()
    )!,
  };
  partidas.push(novaPartida);
  atualizarPartidas();
  salvarPartidas();
  formPartida.reset();
}

function renderCamps() {
  campsArmazenados?.forEach((c: Campeonato) => {
    const option = document.createElement("option");
    option.innerHTML = `${c.nome}`;
    option.value = c.id.toString();
    selectCampeonatos.appendChild(option);
  });
}

formPartida.addEventListener("submit", salvarPartida);
renderCamps();
atualizarPartidas();
