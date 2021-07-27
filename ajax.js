

const list_element = document.getElementById('contry');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
const rows = 10;
var myJsobject;
readdata();
var cont = document.getElementById("contry");
function readdata() {
  try {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        this.myJsobject = data;
        console.log(typeof (this.myJsobject))
        DisplayList(this.myJsobject, list_element, rows, 1);
        SetupPagination(this.myJsobject, pagination_element, rows);

      }
      );
  } catch (error) {
    throw error;
  }

}

document.getElementById("add").onclick = function () {
  console.log(this.myJsobject);
  addnewitem(this.myJsobject);
}


// console.log(this.myJsobject)
// search();

function DisplayList(items, wrapper, rows_per_page, page) {
  console.log(rows_per_page);
  console.log(typeof (items))
  wrapper.innerHTML = "";
  page--;
  let start = rows_per_page * page;
  let end = start + rows_per_page;
  items = items.slice(start, end);
  let txt = "<table border='1' background-color: #f2f2f2;>";
  txt += "<tr><th>" + 'first name' + "</th><th>" + 'alpha 2 code' + "</th><th>" + 'population' + "</th><th>" + 'Capital' + "</th></tr>"
  for (let i = 0; i < items.length; i++) {
    txt += "<tr><td>" + items[i].name + "</td><td>" + items[i].alpha2Code + "</td><td>" + items[i].population + "</td><td>" + items[i].capital + "</td></tr>";
  }
  txt += "</table>";
  let item_element = document.createElement('div');
  item_element.classList.add('txt');
  item_element.innerHTML = txt;
  list_element.appendChild(item_element);
}


function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement('button');
  button.innerText = page;

  if (current_page == page) button.classList.add('active');

  button.addEventListener('click', function () {
    current_page = page;
    DisplayList(items, list_element, rows, current_page);

    let current_btn = document.querySelector('.pagenumbers button.active');
    current_btn.classList.remove('active');

    button.classList.add('active');
  });

  return button;
}
function addnewitem() {
  let cont = {
    "name": document.getElementById("cname").value,
    "code": document.getElementById("code").value,
    "population": document.getElementById("population").value,
    "capital": document.getElementById("capital").value
  }
  this.myJsobject.push({ "name": cont.name, "alpha2Code": cont.code, "population": cont.population, "capital": cont.capital });
  console.log(this.myJsobject.length);
  DisplayList(this.myJsobject, list_element, rows, this.myJsobject / rows);
  SetupPagination(this.myJsobject, pagination_element, rows);
}
function search() {

  let txt = document.getElementById("forserch").value.toLowerCase();

  ul = document.getElementById("list");
  list_element.innerHTML = "";
  let item;
  let data = this.myJsobject.filter(contry => {
    return (
      contry.name.toLowerCase().includes(txt) ||
      contry.alpha2Code.toLowerCase().includes(txt) ||
      contry.capital.toLowerCase().includes(txt) ||
      contry.population.toString().includes(txt)
    );

  })
  pagination_element.innerHTML = "";
  DisplayList(data, list_element, rows, 1);
  SetupPagination(data, pagination_element, rows);
  console.log(data);

}





