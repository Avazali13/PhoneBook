let url = "http://localhost:3000/users/";

let inputName = document.getElementById("name");
let inputSurname = document.getElementById("surname");
let inputPhone = document.getElementById("phone");
let inputEmail = document.getElementById("email");
let inputSubmit = document.getElementById("submit");
let tableBody = document.getElementById("tableBody");
let table = document.querySelector("tbody");
let changeName = document.getElementById("cname");
let changeSurname = document.getElementById("csurname");
let changePhone = document.getElementById("cphone");
let changeEmail = document.getElementById("cemail");
let changeSubmit = document.getElementById("csubmit");
let updatePopup=document.querySelector('.popup')


async function fetchData(value = "") {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fillData(product) {
  const datas = await fetchData(product);
  datas.forEach((data) => {
    const elem = createElement(data);
    tableBody.append(elem);

    const deleteButton = elem.querySelector(".delete");
    deleteButton.addEventListener("click", (e) => {
      console.log(data.id);
      removeData(url, data.id);
    });

    const updateBtn = elem.querySelector(".change");
    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(data);
      changeName.value = data.firstname;
      changeSurname.value = data.lastname;
      changePhone.value = data.phone;
      changeEmail.value = data.email;

updatePopup.classList.remove('hidden')

      changeSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        data.firstname = changeName.value;
        data.lastname = changeSurname.value;
        data.phone = changePhone.value;
        data.email = changeEmail.value;
        console.log(data);
        updateData(data)
        updatePopup.classList.add('hidden')
      });
    });
  });
}

// changeSubmit.addEventListener('click',)

function createElement(product) {
  const productRowElement = document.createElement("tr");

  productRowElement.innerHTML = `
<td>${product.firstname}</td>
<td>${product.lastname}</td>
<td>${product.phone}</td>
<td>${product.email}</td>
<td><button class='delete'  >delete</button></td>
<td><button class='change'  >change</button></td>
`;

  return productRowElement;
}

fillData();

async function postData(urls = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
}

//^ For delete the data
function removeData(url, id) {
  fetch(url + id, {
    method: "DELETE",
  });
}

inputSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let obj = {
    firstname: inputName.value,
    lastname: inputSurname.value,
    phone: inputPhone.value,
    email: inputEmail.value,
  };
  postData(url, obj);
});

function updateData(category) {
  fetch(`${url}${category.id}`, {
    method: "PUT",
    body: JSON.stringify(category),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}


