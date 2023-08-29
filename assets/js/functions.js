var limit = 0;
var i = 0;
let bodyTable = document.querySelector("#results");
let boxDes = document.querySelector("#book-description");


document.addEventListener("DOMContentLoaded", function(){
	document.forms[0].addEventListener("submit", function(e){
		e.preventDefault();
		search();
	});
});


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
  i = 0;
}

// Funzione di chiusura descrizione {COMPLETA}
function closeDe(){
  //Cancellazione della descrizione
  boxDes.innerHTML = "";
}

//Funzione di apertura report di ricerca
function search(){

  // Etrapolazione dati dall'input
  let myGenre = document.querySelector("#search-input").value.toLowerCase();
  // Ciclo di creazione riga
  if(myGenre !== ""){

    // Eliminazione descrizione e tabella
    boxDes.innerHTML = "";
    bodyTable.innerHTML = "";
    // Collegamento al Json
    fetch(`https://openlibrary.org/subjects/${myGenre}.json`)
    .then(response => response.json())

      // Visualizzazione tabella
      bodyTable.parentNode.style.display = "table";
      // Inserimento riga
      .then(commits => (
        for (i = 0; i <= commits.work_count; i++){
        bodyTable.insertAdjacentHTML("beforeend",
        `<tr id="${i}" class="result-item" title="${commits.works[i].key.replace("/works/","")}">
        <td>${i+1}</td>
        <td><button class="result-title" onclick="openDes()">${commits.works[i].title}</button></td>
        <td>${commits.works[i].authors[0].name}</td>
        </tr>`)}
      )
    )

  }
  i = 0;
}
