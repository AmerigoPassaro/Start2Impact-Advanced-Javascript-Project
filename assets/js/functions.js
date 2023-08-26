var limit = 0;
let bodyTable = document.querySelector("#results");
let boxDes = document.querySelector("#book-description");

//Funzione di apertura descrizione {COMPLETA}

function openDes(){
  //Estrapolazione della chiave del libro
  let keyBook = event.target.parentNode.parentNode.title;
  // Collegamento al Json
  fetch(`https://openlibrary.org/works/${keyBook}.json`)
  .then(response => response.json())
  .then(commits => (
    boxDes.insertAdjacentHTML("beforeend",
    // Inserimento descrizione
    `<h2>${commits.title}</h2>
    <p>${commits.description}</p>
    <button id="search-button" onclick="closeDe()">Close</button>`)))
  //Cancellazione della tabella
  bodyTable.innerHTML = "";
  bodyTable.parentNode.style.display = "none";
  i= -12;
}

// Funzione di chiusura descrizione {COMPLETA}

function closeDe(){
  //Cancellazione della descrizione
  boxDes.innerHTML = "";
  //Azzeramento contatori
  i= -12;
}

//Funzione di apertura report di ricerca

function search(){
  //Azzeramento contatori se la tabella è vuota
  if(bodyTable.innerHTML === ""){i= -12};
  // Eliminazione descrizione
  boxDes.innerHTML = "";
  // Etrapolazione dati dall'input
  let myGenre = document.querySelector("#search-input").value.toLowerCase();
  // Ciclo di creazione riga
  for (var i = -12; myGenre !== "" && limit > i; i++){
    // Visualizzazione tabella
    bodyTable.parentNode.style.display = "table";
    // Collegamento al Json
    fetch(`https://openlibrary.org/subjects/${myGenre}.json`)
    .then(response => response.json())
    .then(commits => (
      // Estrapolazione limite ed chiave
      mainKey = commits.works[i].key,
      limit = commits.works.length,
      // Inserimento riga
      bodyTable.insertAdjacentHTML("beforeend",
      `<tr id="${i}" class="result-item" title="${mainKey.slice(7, mainKey.length)}">
      <td>${i+1}</td>
      <td><button class="result-title" onclick="openDes()">${commits.works[i].title}</button></td>
      <td>${commits.works[i].authors[0].name}</td>
      </tr>`), i++))
  }
}
