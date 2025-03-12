//ethyn carnagey 3/02/2025
// duplicate saved puns in local storage / the archive due to multiple clicks of the same pun in the generator is also INTENTIONAL. you can always delete accidental extras if you double clicked from the archive, and if this were to be an app saving something more important than jokes then you never know if someone wants to add the same thing twice.
class Pun{



    constructor(){

        try {
            if(localStorage.getItem("savedPuns") === null ){
                this.archive = [
                    {
                        title: "add puns to archive using the generator "
                    },
                    {
                        title: "your puns will be saved here"
                    },
                ];
            }
            else{
                this.archive = JSON.parse(localStorage.getItem("savedPuns"))
            }
                

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

        
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.displayPuns();
    }


    addEventHandlers(){
        const deleteIcons = document.getElementsByName("deletePun")
        for (let i = 0; i < deleteIcons.length; i++) {
            deleteIcons[i].onclick =this.deletePun.bind(this, i);
        }

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
            <div class="punTxt" id="pun-${punNum}">${pun.title}<br></div>
            <div><i name="deletePun" class="bi-trash delete-icon"></i></div>
        </button></div>
        </div>
        `;
    }

    displayPuns(){
        let PunHtml = this.archive.map(pun => this.generatePunHtml(pun)).join('');
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addEventHandlers();
        this.setFavColor();

    }
    
    addFav(index, event){
        event.preventDefault();
        console.log("addFav", index);
        this.archive[index].fav = true;
        localStorage.setItem("savedPuns", JSON.stringify(this.archive));
        this.displayPuns();
    } 

    setFavColor(){
        for (let i = 0; i < this.archive.length; i++) {
            if(this.archive[i].fav === true){
                let fav = document.getElementById(`pun-${i}`);
                fav.classList.remove("punTxt");
                fav.classList.add("fav"); 
            }
        }
    }

    deletePun(index, event){
        event.preventDefault();
        console.log(index);
        this.archive.splice(index, 1)
        localStorage.setItem("savedPuns", JSON.stringify(this.archive));
        this.displayPuns();
    }

}
window.onload = () => {new Pun();}
