const nomeTime = document.getElementById("nome-time") as HTMLInputElement;
const nomeSigla = document.getElementById("sigla-time") as HTMLInputElement;
const tbTimes = document.getElementById("tbTimes") as HTMLElement;
const formTime = document.getElementById("formTime") as HTMLFormElement;

interface Time {
  id:number
  nomeTime: string;
  siglaTime: string;
}

var timeArmazenados = JSON.parse(localStorage.getItem("times") || "[]");

function salvarTimes() {
  let timesSalvar = JSON.stringify(timeArmazenados);
  localStorage.setItem("times", timesSalvar);
}

function buscaTime(id: number): Time | undefined {
  return timeArmazenados.find((p: Time) => p.id === id);
}

function editTime(id: number) {
  const time = buscaTime(id);

  if (!time) {
    alert("time não encontrado!");
    return;
  }

  nomeTime.value = time.nomeTime
  nomeSigla.value = time.siglaTime
  deleteTime(id);
}

function deleteTime(id: number) {
  const time = buscaTime(id);

  if (!time) {
    alert("time não encontrado!");
    return;
  }

  const timeIndex = timeArmazenados.findIndex((p: Time) => p.id === id);
  if (timeIndex !== -1) {
    timeArmazenados.splice(timeIndex, 1);
  }

  salvarTimes();
  atualizarTimes();
}

function atualizarTimes() {
  tbTimes.innerHTML = "";
  timeArmazenados.forEach((p: Time) => {
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

function salvarTime(event: Event) {
  event?.preventDefault(); //cancelar o disparo do evento]
  const novoTime: Time = {
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
