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
let search=document.querySelector('#search')
let mood='creat';
let temp;

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
// let data=[]
creat.onclick=function(){
    let newProduct={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,

    }
    if(title.value!=''&&price.value>0&&category.value!=''&& newProduct.count<100){
        if(mood==='creat'){
            if(newProduct.count>1){
                for(let i=0;i<newProduct.count;i++){
                    data.push(newProduct);
                }
            }
            else {
                data.push(newProduct);
            }
        }
        else{
            data[temp]=newProduct;
            mood='creat';
            creat.innerHTML="creat"
            creat.style.background='purple';
            count.style.display='block';
        }
        clearData();
    }
    else {
        //
    }
  
    
    
   
    localStorage.setItem('product', JSON.stringify(data))
   
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
    getTotal();
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
 <td><button id="update" onclick="updateData(${index})">update</button></td>
 <td><button onclick="delteData(${index})" id="delete">delte </button></td>
</tr>`
    
}

//    document.getElementById('tbody').innerHTML=table;
  bodyTable.innerHTML=table;
  if(data.length>0){
    document.querySelector("#delteAll").innerHTML=`<button onclick="delteAll() ">Delte All : ${data.length} elements</button>`
  }
  else {
    document.querySelector("#delteAll").innerHTML=''

  }
 }
 Show(); 
 function delteData(item) {  
    alert(`are you sure you want delte   ${item +1}`)
    data.splice(item,1)
    localStorage.product=JSON.stringify(data);
    Show();
      
 }
function delteAll(){
    localStorage.clear();
    data.splice(0);
    Show();

}
function updateData(item){
    console.log(item);
    
 
   

   
    
    
    price.value=data[item].price
   taxes.value=data[item].taxes
    ads.value=data[item].ads
    discount.value= data[item].discount
    total.innerHTML=data[item].total
    count.style.display='none'
    category.value=data[item].category
    title.value=data[item].title;
    creat.innerHTML="update"
    creat.style.background='#00800099';
    mood='Update';
    temp=item;
    scroll({
        top:0,
        behavior:'smooth'
    })

  }
let SearchMode='title';//default title search

function getSearchMode(id){
    if(id=="searchTitle"){
       
        SearchMode='title';
        search.value='';
        Show()

    }
    else {
        SearchMode='category';
        search.value='' 
        Show();
        }
        search.Placeholder="search by "+ SearchMode;

    console.log(SearchMode)
    search.focus();
    
    
}
function SearchData(value){
    console.log(typeof value)
    let table=``
    if(SearchMode=='title'){
        for (let index = 0; index < data.length; index++) {
            if(data[index].title.includes(value)){
                
                table+=` <tr>
                            <td>${index+1}</td>
                            <td>${data[index].title}</td>
                            <td>${data[index].price}</td>
                            <td>${data[index].taxes}</td>
                            <td>${data[index].ads}</td>
                            <td>${data[index].discount}</td>
                            <td>${data[index].total}</td>
                            <td>${data[index].category}</td>
                            <td><button id="update" onclick="updateData(${index})">update</button></td>
                            <td><button onclick="delteData(${index})" id="delete">delte </button></td>
                        </tr>`
            }
            
             
            
        }
    }
    else{
        for (let index = 0; index < data.length; index++) {
            if(data[index].category.includes(value)){
                table+=` <tr>
                            <td>${index+1}</td>
                            <td>${data[index].title}</td>
                            <td>${data[index].price}</td>
                            <td>${data[index].taxes}</td>
                            <td>${data[index].ads}</td>
                            <td>${data[index].discount}</td>
                            <td>${data[index].total}</td>
                            <td>${data[index].category}</td>
                            <td><button id="update" onclick="updateData(${index})">update</button></td>
                            <td><button onclick="delteData(${index})" id="delete">delte </button></td>
                        </tr>` 
                
            }
            
             
            
        }
    }
    bodyTable.innerHTML=table;
}