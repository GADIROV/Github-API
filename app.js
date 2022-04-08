//Select Elements 
const formGithub = document.getElementById("github-form");
const githubName =document.getElementById("githubname");
const clearLastUsers =document.getElementById("clear-last-users");
const lastUsers =document.getElementById("last-users");
const github = new Github();
const ui = new UI();

//create eventListeners
eventListeners();
function eventListeners(){
    formGithub.addEventListener("submit",addToUsersRepos);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getALLSearched);
   
}
 
function addToUsersRepos(e){
    const username = githubName.value.trim();
    if(username ===""){
        //Alert\ 
        ui.showAlert("danger","Please Bir deyer daxil edin!")
    }
    else{
     github.addtoData(username)
     .then(response =>{
         if(response.datas.message ==="Not Found"){
             ui.showAlert("danger","Bele bir istifadeci yoxdur!")
         }
         else{
            // 
            ui.addSearchedUserToUI(username);
            Storage.addSearchedUserToStorage(username);
            ui.addToUsersToUI(response.datas);
            ui.addToReposToUI(response.repos);
            
         }
     })
     .catch(err => ui.showAlert(err))
    }


    ui.clearInput();
    e.preventDefault();
}
//TUmleri silmek


//Ekranda saxlamaq
function getALLSearched(){
    let users = Storage.getLocalStorage();
    let result = " ";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li> `
    });
     lastUsers.innerHTML =result;
}

function clearAllSearched(){
    if(confirm("Eminsinizmi")){
      Storage.clearAllSearchedUsersFromStorage();
      ui.clearAllUsersFromUI();
    }
  }