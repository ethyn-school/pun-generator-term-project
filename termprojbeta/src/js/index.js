//ethyn carnagey 3/02/2025

class Generator{

    addPun(event){
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

    displayPuns(){
        let PunHtml =  this.puns.reduce(
            (html, pun) => html += this.generatePunHtml(pun), ''
        );
        document.getElementById("punsList").innerHTML = PunHtml;
        this.addEventHandlers();
    }

    addToArchive(index, event){
        event.preventDefault();
        const savedPun = this.puns[index];
        this.savedPuns.push(savedPun);
        localStorage["savedPuns"] = JSON.stringify(this.savedPuns);
    }   

    addEventHandlers(){
        const addButton = document.getElementsByName("addToArchive");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].onclick = this.addToArchive.bind(this, i);
        }
        
    }





    constructor(){
        if(localStorage.getItem("savedPuns")) {
            this.savedPuns = JSON.parse(localStorage.getItem("savedPuns"))
            console.log(this.savedPuns)
            
        }
        else{
            this.savedPuns = [];
            console.log(this.savedPuns)
            console.log("no saved")
        }
        
        this.puns = [];
        this.addPun = this.addPun.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.displayPuns();
        this.apiUrl = 'https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
        const form = document.querySelector('form');
        form.onsubmit = this.addPun;


    }


}

let generator;
window.onload = () => {generator = new Generator();}



       /*
    
        -   Try to load the puns from local storage.  If there's nothing in local storage 
            set it equal to the object literal 

   

    PART 3 - Add a pun
    -   Add the function addPun.  It has event as its parameter.
        -   Because the textboxes for entering pun info are in a form, you will
            need to prevent the form from being submitted (which is the default behavior)
            like you prevented the delete link in ToDoList from going to a new page.  
        -   get the url and the description from the form and create a pun object. 
            Use the url for both the link and the title.  Leave the image blank.
        -   add the new pun to the list
        -   call displayPuns
        -   clear the form on the UI
    -   Add a onsubmit handler to the form in the constructor.  
        It should call addPun.  
    END OF PART 3 - TEST AND DEBUG YOUR CODE

*/

/*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
    declare a variable puner
    Add a window on load event handler that instantiates a Puner object.  
    Use and arrow or anonymous function
*/


/*
Create the look and feel of your page
    Use html 5 input attributes to make sure that the url and description are provided.
        The url should be a valid url too.
    -   At this point the user enters the url and the description.  After we talk about
        making an ajax call in chapter 3, we'll get the image and the title from an api.
    Add one or more sample puns to the html page.  I've given you one as an example.
    -   Each pun is a link that contains: an image, 
        and the text that the user sees.  It also has a description and an icon for deleting.
    Style the list of puns and the page as a whole so it is reasonably attractive
    -   I have provided a screen shot of my page as well as 
        a screen shot of what my page looks like when I'm adding a new pun.
        */

    /*    
    -   Finish the generatePunHtml method
    -   This method returns a template literal containing the html for ONE pun in the array.
        It gets called in fillBookMarksList.  It has 1 parameter, a pun.
    -   CUT the html for ONE pun from your html page into the body of your method.
    -   Enclose the html in ``.
    -   Replace the hardcoded description, image, link and title (of the sample pun) 
        with template strings that use the properties of the pun object
    -   Return the template literal

-   Finish the displayPuns method.  It has no parameters
    -   Save the puns to local storage
    -   Create a variable punHtml and set it equal to the
        the return value for each of the individual puns combined
        You can do this by calling the reduce method on the array
        It manipulates each element of an array to produce ONE result.  From the ToDoList:
            let tasksHtml = this.tasks.reduce(
                (html, task, index) => html += this.generateTaskHtml(task), ''
            );
    -   Set contents of the puns-list element on the page to the punHtml variable
    -   Call the method addEventHandlers to allow the user to delete each of the puns
    );
END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE HARDCODED BOOKMARKS YOUR ON PAGE
*/

/*  PART 2 - Delete a pun
    -   Finish the addToArchive method.  It has 2 parameters, index and event
        -   prevent the default action of the anchor tag using the event parameter
        -   delete the pun from the list based on the index
        -   call displayPuns

    -   Finish the addEventHandlers method
        -   Create a variable called addButton that refers to all of the 
            delete icons on the page.  Each has the name addToArchive.
        -   Create a for loop that iterates through the addButton array
            -   set the click event for the current icon to the method
                addToArchive and bind this and the index of the pun in that statement
                From the todo list:
                checkBoxes[i].onchange = this.toggleTaskStatus.bind(this, i);  
    END OF PART 2 - TEST AND DEBUG YOUR CODE */