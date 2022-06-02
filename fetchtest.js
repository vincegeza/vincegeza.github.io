
  
   // a felhasználók kulcsai

let keys = ["id", "name"];



  //általános elemalkotás

  function createAnyElement(name, attributes) {

    let element = document.createElement(name);
    for (k in attributes) {
      element.setAttribute(k, attributes[k]);
      }
      return element;
  };

  //adatszerzés a szerverről



function getServerData(url) {

  let fetchOptions  = {

    method : "GET",
    mode : "cors",
    cache: "no-cache"
  } ;
  return fetch(url, fetchOptions).then(

    Response => Response.json(),
    Reject => console.log(Reject)

  );
};

  // FRISSÍTÉS

function startGetUsers() {
  //let tBody =document.querySelector("tbody");
    //tBody.innerHTML = "";
  //getServerData("http://localhost:3000/users").then (
  //  data  => fillDataTable(data, 'userTable')
  getServerData("https://my-json-server.typicode.com/vincegeza/testrepo/users").then (
  data  => fillDataTable(data, 'userTable')

    );
    

};


 
  //gombnyomással lekérés

document.querySelector("#getDataBtn").addEventListener("click", startGetUsers) ; 
  
  
  

  




//táblázatkitöltés


function fillDataTable(data,tableID) {
console.log(tableID)

  let table = document.querySelector('#' + tableID);
  if(!table) {
    console.error(`nincs meg a ${tableID} tábla hé`);
    console.log(data);
    return;
  };

  let tBody = table.querySelector("tbody");
  tBody.innerHTML = '';
  let newRow = newUserRow();
 tBody.appendChild(newRow);
  
  for (let sor of data) {

    console.log(sor);
    let tr = createAnyElement("tr");
    for (let k of keys) {
      let td = createAnyElement("td",);
      td.innerHTML = sor[k];
      tr.appendChild(td);



    };
    let btnGroup = createBtnGroup();

    tr.appendChild(btnGroup)
    tBody.appendChild(tr);


  };

return };

//gombkészítés


function createBtnGroup() {
  let group = createAnyElement("div", {class: "btn btn-group"});
  group.style.width = "100%";
  let infoBtn = createAnyElement("button", {class: "btn btn-info", //onclick: "getInfo(this)"
}) 
  ;
  infoBtn.innerHTML = '<i class="fa fa-refresh"></i>';
  let delBtn = createAnyElement("button", {class: "btn btn-danger", onclick: "delRow(this)"});
  
  
  delBtn.innerHTML = '<i class="fa fa-trash"></i>';
  group.appendChild(infoBtn);
  group.appendChild(delBtn);

  let td = createAnyElement("td");
  td.appendChild(group)
  return td;

};

// gombok működése

function delRow(btn) {
  console.log(btn);
  let tr = btn.parentElement.parentElement.parentElement;
  console.log(tr);
  let id = tr.querySelector("td:first-child").innerHTML;
  console.log(id);
  let fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache"  
  };
    //fetch(`http://localhost:3000/users/${id}`,fetchOptions).then(

   fetch(`https://my-json-server.typicode.com/vincegeza/testrepo/users/${id}`,fetchOptions).then(
      resp => resp.json(),
      err => console.error(err)
    ).then(
      
     // startGetUsers()
    )
};

// új sor létrehozása

function newUserRow() {
   let tr = createAnyElement("tr");
   for (let k of keys) {
     let td = createAnyElement("td");
     let input = createAnyElement("input", {
       class: "form-control",
       name: k 
      })
      td.appendChild(input);
      tr.appendChild(td)
   }

   let td = createAnyElement("td");
   let newBtn = createAnyElement("button", {
    class: "btn btn-success", 
    onclick: "createUser(this)"

   })

   newBtn.style.display = "block";
   newBtn.style.width = "100%";
   newBtn.setAttribute("type", "button");
   td.appendChild(newBtn);
   tr.appendChild(td);
   newBtn.style.height = "38px";
   newBtn.innerHTML = '<i class="fa fa-plus"></i>'
return tr;

};



  function createUser(gomb) {
    let sor = gomb.parentElement.parentElement;
    let adat = getRowData(sor);
    delete adat.id;
    let fetchOptions = {
      method : "POST",
      mode : "cors",
      cache : "no-cache",
      headers : { 
        'content-type' : 'application/json'
      },  
      body: JSON.stringify(adat)

  };
 //fetch(`http://localhost:3000/users/`, fetchOptions).then(
 fetch(`https://my-json-server.typicode.com/vincegeza/testrepo/users/`, fetchOptions).then(
   
  resp => resp.json(),
  err => console.error(err)
).then( data => startGetUsers(),

  );


  }

  function getRowData(sor) { 
    let bevitelek = sor.querySelectorAll("input.form-control");
    let adat = {}; 
    console.log(bevitelek)
    for (i=0; i < bevitelek.length; i++) {
      adat[bevitelek[i].name] = bevitelek[i].value;

    }  
    console.log(adat);
    return adat;
    
    };

window.addEventListener("resize",  function() {

let teszt = createAnyElement("p");

let Body = document.querySelector("body");
Body.appendChild(teszt);
teszt.innerHTML = "VAJON EZ IS ELTŰNIK?";
});

window.onbeforeunload.apply
