//ethyn carnagey 3/07/2025
// duplicate puns are allowed INTENTIONALLY. i thought about preventing duplicates but theres only so many puns from the joke api and i wanted to be able to have a long list to scroll through if you're having fun clicking the generate button a bunch. 
import createNavbar from './navbar';
class Generator {

    constructor() {
        if (localStorage.getItem("savedPuns")) {
            this.savedPuns = JSON.parse(localStorage.getItem("savedPuns"))
            console.log(this.savedPuns)

        }
        else {
            this.savedPuns = [];
            console.log(this.savedPuns)
        }

        this.puns = [];
        this.addPun = this.addPun.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.displayPuns();
        this.apiUrl = 'https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
        const form = document.querySelector('form');
        form.onsubmit = this.addPun;
        const activePage = "Generator";
        document.getElementById("navbar").innerHTML = createNavbar(activePage);
    }

    addPun(event) {
        event.preventDefault();
        fetch(`${this.apiUrl}`)
            .then(response => response.json())
            .then(data => {
                const pun = {
                    title: data.joke,
                };
                this.puns.push(pun);
                this.displayPuns(this.puns);
            })
            .catch(error => {
                console.log("there was a problem getting info")
            })
            ;

    }

    generatePunHtml(pun) {
        return `
                <div class="puns-list-content" id="punsList"> 
        <div><button name="addToArchive" class="pun" id=${this.puns.indexOf(pun)}>
            <div class="img" style="background-image:url('./images/jokeGuy.png')">&nbsp;</div>
            <div class="punTxt">${pun.title}<br></div>
        </button></div>
        </div>
        `;
    }

    displayPuns() {
        let PunHtml = this.puns.reduce(
            (html, pun) => html += this.generatePunHtml(pun), ''
        );
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addEventHandlers();
    }

    addToArchive(index, event) {
        event.preventDefault();
        const savedPun = this.puns[index];
        this.savedPuns.push(savedPun);
        localStorage["savedPuns"] = JSON.stringify(this.savedPuns);
    }

    addEventHandlers() {
        const addButton = document.getElementsByName("addToArchive");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].onclick = this.addToArchive.bind(this, i);
        }
    }

}

let generator;
window.onload = () => { generator = new Generator(); }
