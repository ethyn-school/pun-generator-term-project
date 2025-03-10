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
            this.puns = JSON.parse(localStorage.getItem("savedPuns"));
        } catch (error) {
            this.puns = [
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
        
    }
    generatePunHtml(pun) {
     return `
                <div class="puns-list content">
                <img class="img" src="./images/jokeGuy.png" alt="Joke Guy">
                <div class="title">${pun.title}<br>
                </div>
                <div><i name="deletePun" class="bi-trash delete-icon"></i></div>
        </div>
        `;
    }

    displayPuns(){
        let PunHtml = this.puns.map(pun => this.generatePunHtml(pun)).join('');
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addEventHandlers();
    }
    
    deletePun(index, event){
        event.preventDefault();
        this.puns.splice(index, 1)
        this.displayPuns();
    }

}
window.onload = () => {new Pun();}
