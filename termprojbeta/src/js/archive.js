//ethyn carnagey 3/02/2025
/*
    The class has the following methods
    - fillPuns - displays the puns on the page.  It is called in the constructor
                  and whenever a pun is changed in any way.  It calls a helper method
                  generatePunHtml to generate the html for an individual pun object.
                  It also calls a helper method addEventHandlers to add the event handlers
                  that allow deleting of a pun
    - deletePun - removes a pun from the list of pun.  It is called by 
                  the click event handler for the trash can icon for each pun.
*/
class Pun{



    constructor(){

        try {
            this.archive = JSON.parse(localStorage.getItem("savedPuns"));
        } catch (error) {
            this.archive = [
                {
                    title: "add puns to archive using the pun generator "
                },
                {
                    title: "this is where your puns will be"
                },
            ];
        }
        
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.displayPuns();
    }


    addEventHandlers(){
        const deleteIcons = document.getElementsByName("deletePun")
        for (let i = 0; i < deleteIcons.length; i++) {
            deleteIcons[i].onclick =this.deletePun.bind(this, i);
        }
        
        const addButton = document.getElementsByName("addFav");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].onclick = this.addFav.bind(this, i);
        }
    }

    generatePunHtml(pun) {
     return `
                <div class="puns-list-content" id="punsList">
        <div><button name="addFav" class="pun">
            <div class="img" style="background-image:url('./images/jokeGuy.png')">&nbsp;</div>
            <div class="punTxt">${pun.title}<br></div>
            <div><i name="deletePun" class="bi-trash delete-icon"></i></div>
        </button></div>
        </div>
        `;
    }

    displayPuns(){
        let PunHtml = this.archive.map(pun => this.generatePunHtml(pun)).join('');
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addEventHandlers();
    }
    
    deletePun(index, event){
        event.preventDefault();
        this.archive.splice(index, 1)
        localStorage.setItem("savedPuns", JSON.stringify(this.archive));
        this.displayPuns();
    }


    addFav(index, event){
        event.preventDefault();
        console.log("addFav")
    } 

  //  yippee(event){
   //     event.preventDefault();
   //     let YipeeHtml = `    <div class= "yippee" id="yippee">
   //     <div class="img" style="background-image:url('./images/jokeGuy.png')"></div>
   // </div>`;
   //     document.getElementById("yippee").innerHTML = YipeeHtml;
  //  }   




}
window.onload = () => {new Pun();}
