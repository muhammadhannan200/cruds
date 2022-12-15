let title=document.querySelector('#title');
let price=document.querySelector('#price');
let taxes=document.querySelector('#taxes');
let ads=document.querySelector('#ads');
let discount=document.querySelector('#discount');
let total=document.querySelector('#total');
let count=document.querySelector('#count');
let category=document.querySelector('#category');
let creat=document.querySelector('#creat')
let bodyTable=document.querySelector('tbody')

function getTotal() { 
    //check the date price not empty 
    // the make the total
    if(price.value!=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='green'
        
     }
    else {
        total.innerHTML='';
        total.style.background='red';
    }
     

}
let data;
if(localStorage.product!=null){//if there are Data
    data=JSON.parse(localStorage.product)
    console.log(data)
}
else {
    let data=[]
}

creat.onclick=function(){
    let newProduct={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value

    }
    // console.log(newProduct)
    data.push(newProduct);
    localStorage.setItem('product', JSON.stringify(data))
    clearData();
    Show();
    
}
function clearData() { 
    price.value=''
   taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
    title.value=''

 }

 
 function Show(){
let table=''
for (let index = 0; index < data.length; index++) {
    //table=data[index]; // all property from array 
//    table=data[index].test;
 table+=` <tr>
 <td>${index+1}</td>
 <td>${data[index].title}</td>
 <td>${data[index].price}</td>
 <td>${data[index].taxes}</td>
 <td>${data[index].ads}</td>
 <td>${data[index].discount}</td>
 <td>${data[index].total}</td>
 <td>${data[index].category}</td>
 <td><button id="update">update</button></td>
 <td><button onclick="delteData(${index})" id="delete">delte </button></td>
</tr>`
    
}

//    document.getElementById('tbody').innerHTML=table;
  bodyTable.innerHTML=table;
  if(data.length>0){
    document.querySelector("#delteAll").innerHTML=`<button onclick="delteAll() ">Delte All </button>`
  }
  else {
    document.querySelector("#delteAll").innerHTML=''

  }
 }
 Show(); 
 function delteData(item) {  
    console.log(item);
    data.splice(item,1)
    localStorage.product=JSON.stringify(data);
    Show();  
 }
function delteAll(){
    localStorage.clear();
    data.splice(0);
    Show();

}