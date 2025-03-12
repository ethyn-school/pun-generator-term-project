//ethyn carnagey 3/02/2025

class Pun{



    constructor(){

        try {
            this.archive = JSON.parse(localStorage.getItem("savedPuns"));
        } catch (error) {
            this.archive = [
                {
                    title: "something went wrong "
                },
                {
                    title: "thou shallt'nt be seeing this"
                },
            ];
        }
        
        this.addDeleteClick = this.addDeleteClick.bind(this);
        this.addFavClick = this.addFavClick.bind(this);
        this.displayPuns();
    }


    addDeleteClick(){
        const deleteIcons = document.getElementsByName("deletePun")
        for (let i = 0; i < deleteIcons.length; i++) {
            deleteIcons[i].onclick =this.deletePun.bind(this, i);
        }
    }

    addFavClick(){
        const addButton = document.getElementsByClassName("punTxt");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].onclick = this.addFav.bind(this, i);
        }
    }

    generatePunHtml(pun) {
        const punNum = this.archive.indexOf(pun);
     return `
                <div class="puns-list-content" id="punsList">
        <div><button name="addFav" class="pun" >
            <div class="img" style="background-image:url('./images/jokeGuy.png')">&nbsp;</div>
            <div class="punTxt" id="${punNum}">${pun.title}<br></div>
            <div><i name="deletePun" class="bi-trash delete-icon"></i></div>
        </button></div>
        </div>
        `;
    }

    displayPuns(){
        let PunHtml = this.archive.map(pun => this.generatePunHtml(pun)).join('');
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addDeleteClick();
        this.addFavClick();
    }
    
    addFav(index, event){
        event.preventDefault();
        console.log("addFav", index);
        let fav = document.getElementById(index);
        fav.classList.remove("punTxt");
        fav.classList.add("fav"); 
    } 

    deletePun(index, event){
        event.preventDefault();
        console.log(index);
        this.archive.splice(index, 1)
        localStorage.setItem("savedPuns", JSON.stringify(this.archive));
        this.displayPuns();
       // let fav = document.getElementById(index);
     //   fav.classList.remove("fav");
      //  fav.classList.add("punTxt"); 
    }








}
window.onload = () => {new Pun();}
