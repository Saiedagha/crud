let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

//get total
function gettotal(){
if (price.value != ''){

      let result = (+price.value + +taxes.value + +ads.value)-
+discount.value ;

total.innerHTML = result
total.style.background = 'green';
}else{
total.style.background = 'red';
total.innerHTML = '';
}
}


//creat product
   let datapro 
if(localStorage.product != null){
   datapro = JSON.parse(localStorage.product)
}else{
   datapro = [];
}

submit.onclick = function(){

      let pro = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
   }
     if(title.value !='') {
       if(mood === 'create'){
         if(pro.count > 1){
   for(let i = 0; i < pro.count; i++){
   datapro.push(pro);     
   }
   }else{
   datapro.push(pro);     
   
   }
   }else{
      datapro[  tmp   ] = pro;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = "block"
   }
      clearinputs()
   }

   //SAVE DATA IN LOCALSTORAGE
localStorage.setItem('product', JSON.stringify(datapro))   

         readdata()
}


//claer inputs
function clearinputs(){

      title.value = '';
      price.value = '';
      taxes.value = '';
      ads.value = '';
      discount.value = '';
      total.innerHTML = '';
      count.value = '';
      category.value = '';

         total.style.background = 'red'
}


//read
function readdata()
{
   gettotal()
let table = '';
   for( let i = 0; i < datapro.length;i++){
      
      table +=`
               <tr>
                  <td>${i+1}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="updatedata(${i})" id='update'>update</td>
                  <td><button onclick="deletedata( ${i})" id="delete">delete</td>
                  </tr>
               `
   }

   document.getElementById('tbody').innerHTML= table;

   let btndelete = document.getElementById("deleteall");
   if(datapro.length > 0){
      btndelete.innerHTML = `
      <button onclick="deleteall()">delete All(${datapro.length}) </button>`
   }else{
      btndelete.innerHTML= '';
   }
}
readdata()


//deletdata
function deletedata(i){
   datapro.splice(i,1);
   localStorage.product= JSON.stringify(datapro);
readdata()
}

function deleteall(){

   localStorage.clear()
   datapro.splice(0)
   readdata()
}

//update
function updatedata(i){

   title.value = datapro[i].title;
   price.value = datapro[i].price;
   taxes.value = datapro[i].taxes;
   ads.value = datapro[i].ads;
   discount.value = datapro[i].discount;
   gettotal()
   count.style.display = "none"
   submit.innerHTML = "update"
   category.value = datapro[i].category;
   mood = 'update';
   tmp= i;
   scroll({
      top:0,
      behavior:'smooth'
   })


}

//search
let searchmood = 'title';
function getsearchmood(id)
{
   let search = document.getElementById('search')
   if(id=='searchtitle')
      {
      searchmood = 'title';
   }else{
      searchmood = 'category';
      
   }
         search.placeholder = 'search by ' + searchmood;
   search.focus()
   search.value = '';
   readdata()
}

function search(value){
   let table = '';
      if(searchmood == 'title'){
            
            for(let i = 0; i <  datapro.length;i++){
               if(datapro[i].title.includes(value.toLowerCase())){
      table +=`
               <tr>
                  <td>${i}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="updatedata(${i})" id='update'>update</td>
                  <td><button onclick="deletedata( ${i})" id="delete">delete</td>
                  </tr>
               ` 
               }
            }


      }else{
      for(let i = 0; i <  datapro.length;i++){
               if(datapro[i].category.includes(value.toLowerCase())){
      table +=`
               <tr>
                  <td>${i}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="updatedata(${i})" id='update'>update</td>
                  <td><button onclick="deletedata( ${i})" id="delete">delete</td>
                  </tr>
               ` 
               }
            }

      }
         document.getElementById('tbody').innerHTML= table;

      
}







