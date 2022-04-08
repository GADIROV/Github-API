class Github{
    constructor(){
        this.url  = "https://api.github.com/users/"
    }
     
  async  addtoData(username){
        const userData = await  fetch(this.url +username);
        const reposData = await fetch(this.url +username +"/repos");

        const data = await userData.json();
        const repo = await reposData.json();

        return{
            datas:data,
            repos:repo

        }
    }
}