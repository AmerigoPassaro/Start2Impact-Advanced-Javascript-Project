let table = document.querySelector('#seach-result');
let description = document.querySelector('#book-description');

function openTab(){
  if(table.style.display === "none"){
    table.style.display = "table";
    description.style.display = "none";
  } else {
    table.style.display = "none";
  }
}

function openDes(){
  if(description.style.display === "none"){
    description.style.display = "block";
        table.style.display = "none";
  } else {
    description.style.display = "none";
  }
}
