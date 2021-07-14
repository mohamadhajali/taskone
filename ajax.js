

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 10;
var myJsobject;
readdata();
var cont = document.getElementById("contry");
async function readdata() {
  try {
    await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        this.myJsobject = data;
        DisplayList(this.myJsobject, list_element, rows, this.myJsobject/rows);
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
function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;
	let start = rows_per_page * page;
	let end = start + rows_per_page;
	 items = items.slice(start, end);
	for (let i = 0; i < items.length; i++) {
		let item = items[i].name+ " || "+items[i].alpha2Code +" || "+items[i].population+" || "+items[i].capital;

		let item_element = document.createElement('div');
		item_element.classList.add('item');
		item_element.innerText = item;
		
		wrapper.appendChild(item_element);
	}
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
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

    /* var table = document.getElementById("contry");
     var row = table.insertRow(0);
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var cell4 = row.insertCell(3);
     /*cell1.innerHTML = document.getElementById("cname").value;
     cell2.innerHTML = document.getElementById("code").value;
     cell3.innerHTML = document.getElementById("population").value;
     cell4.innerHTML = document.getElementById("capital").value;*/
    let cont = {
      "name": document.getElementById("cname").value,
      "code": document.getElementById("code").value,
      "population": document.getElementById("population").value,
      "capital": document.getElementById("capital").value
    }
    this.myJsobject.push({ "name": cont.name, "alpha2Code": cont.code, "population": cont.population, "capital": cont.capital });
    console.log(this.myJsobject.length);
    DisplayList(this.myJsobject, list_element, rows, this.myJsobject/rows);
    SetupPagination(this.myJsobject, pagination_element, rows);
  }

