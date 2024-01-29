let url='http://localhost:3000/users/';

let inputName=document.getElementById('name');
let inputSurname=document.getElementById('surname');
let inputPhone=document.getElementById('phone');
let inputEmail=document.getElementById('email');
let inputSubmit=document.getElementById('submit');
let tableBody=document.getElementById('tableBody')
let table=document.querySelector('tbody')



async function fetchData(value=''){
    const response=await fetch(url)
    const data =await response.json();
    return data
}


async function fillData(product){
    const datas=await fetchData(product)
    datas.forEach(data => {

        const elem=createElement(data)
        tableBody.append(elem)

        const deleteButton = elem.querySelector('.delete');
        deleteButton.addEventListener('click', (e) => {
            console.log(data.id);
            removeData(url,data.id)
        });

    });
}


function createElement(product){
 const productRowElement=document.createElement('tr');

productRowElement.innerHTML=`
<td>${product.firstname}</td>
<td>${product.lastname}</td>
<td>${product.phone}</td>
<td>${product.email}</td>
<td><button class='delete'  >delete</button></td>
<td><button class='change'  >change</button></td>
`




return productRowElement
}

fillData();


async function postData(urls='',data={}){
 const response=await fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
return response
}



//^ For delete the data
function removeData(url,id){ 
fetch(url + id, {
    method: 'DELETE',
  })
   }






inputSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
    let obj={
        firstname:inputName.value,
        lastname:inputSurname.value,
        phone:inputPhone.value,
       email:inputEmail.value,
    }
    postData(url,obj)
})


