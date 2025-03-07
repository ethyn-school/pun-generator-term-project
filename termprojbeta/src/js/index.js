//ethyn carnagey 3/02/2025
/*  Overview
    This application simulates an electronic bookmark list.  Users can add and delete
    bookmarks from the list. The list of bookmarks is stored on the user's machine in local storage 
    so that the bookmarks persist over time.

    The app is encapsulated in an ES6 style class.  
    
    The class has the following instance variables declared in the constructor:
    - bookmarks - an array of bookmarks.  Each bookmark has a description, image, link and title property.

    The class has the following methods
    - fillBookmarks - displays the bookmarks on the page.  It is called in the constructor
                  and whenever a bookmark is changed in any way.  It calls a helper method
                  generateBookmarkHtml to generate the html for an individual bookmark object.
                  It also calls a helper method addEventHandlers to add the event handlers
                  that allow deleting of a bookmark
    - deleteBookmark - removes a bookmark from the list of bookmark.  It is called by 
                  the click event handler for the trash can icon for each bookmark.
    - addBookmark-   allows the user to add a new bookmark to the list.  It is called
                  by the click event handler for the add button on the page.
*/
class Bookmarker{


    addEventHandlers(){
        const deleteIcons = document.getElementsByName("deleteBookmark")
        for (let i = 0; i < deleteIcons.length; i++) {
            deleteIcons[i].onclick =this.deleteBookmark.bind(this, i);
        }
        
    }

    generateBookmarkHtml(bookmark) {

     return `
                <div class="bookmarks-list content" id="bookmarksList">
            <a href="${bookmark.link}" target="_blank" class="bookmark">
                <div class="img" style="background-image:url(${bookmark.image})">&nbsp;</div>
                <div class="title">${bookmark.title}<br>
                </div>
                <div><i name="deleteBookmark" class="bi-trash delete-icon"></i></div>
            </a>
        </div>
        `;
    }


    fillBookmarksList(){
        localStorage["bookmarks"] = JSON.stringify(this.bookmarks);
        let BookmarkHtml =  this.bookmarks.reduce(
            (html, bookmark, index) => html += this.generateBookmarkHtml(bookmark), ''
            )
        document.getElementById("bookmarksList").innerHTML = BookmarkHtml;
        this.addEventHandlers();
    }

    deleteBookmark(index, event){
        event.preventDefault();
        this.bookmarks.splice(index, 1)
        this.fillBookmarksList();
    }


    addBookmark(event){
        event.preventDefault(); 
        const bookmarkUrl = document.getElementById("url")
        const url = encodeURIComponent(bookmarkUrl.value);
        const urlForHref = bookmarkUrl.value;
        fetch(`${this.apiUrl}/${url}?app_id=${this.appId}`)
            .then(response => response.json())
            .then(data => { 
                const bookmark = {
                    title: data.hybridGraph.title,
                    image: data.hybridGraph.image,
                    link: urlForHref,
                };
                this.bookmarks.push(bookmark);
                this.fillBookmarksList(this.bookmarks);
                document.querySelector(".bookmark-form").reset();
            })
            .catch(error => {
                console.log("there was a problem getting info")
            })
        ;
        
    }


    constructor(){

        try {
            this.bookmarks = JSON.parse(localStorage["bookmarks"])
            }
            catch {
                this.bookmarks =             
                [
                    {

                        image: "",
                        link: "pun", 
                        title: "pun"
                    },
                    {

                        image: "",
                        link: "pun", 
                        title: "pun"
                    },
                ]
        }


        this.addBookmark = this.addBookmark.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.fillBookmarksList();
        this.apiUrl = 'https://opengraph.io/api/1.1/site';
        this.appId = "aece1adb-b3fd-4bf9-bd6e-dc5a1e00630e"; 
        const form = document.querySelector('form');
        form.onsubmit = this.addBookmark;


    }


}

let bookmarker;
window.onload = () => {bookmarker = new Bookmarker();}



       /*
    
        -   Try to load the bookmarks from local storage.  If there's nothing in local storage 
            set it equal to the object literal 

   

    PART 3 - Add a bookmark
    -   Add the function addBookmark.  It has event as its parameter.
        -   Because the textboxes for entering bookmark info are in a form, you will
            need to prevent the form from being submitted (which is the default behavior)
            like you prevented the delete link in ToDoList from going to a new page.  
        -   get the url and the description from the form and create a bookmark object. 
            Use the url for both the link and the title.  Leave the image blank.
        -   add the new bookmark to the list
        -   call fillBookmarksList
        -   clear the form on the UI
    -   Add a onsubmit handler to the form in the constructor.  
        It should call addBookmark.  
    END OF PART 3 - TEST AND DEBUG YOUR CODE

*/

/*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
    declare a variable bookmarker
    Add a window on load event handler that instantiates a Bookmarker object.  
    Use and arrow or anonymous function
*/


/*
Create the look and feel of your page
    Use html 5 input attributes to make sure that the url and description are provided.
        The url should be a valid url too.
    -   At this point the user enters the url and the description.  After we talk about
        making an ajax call in chapter 3, we'll get the image and the title from an api.
    Add one or more sample bookmarks to the html page.  I've given you one as an example.
    -   Each bookmark is a link that contains: an image, 
        and the text that the user sees.  It also has a description and an icon for deleting.
    Style the list of bookmarks and the page as a whole so it is reasonably attractive
    -   I have provided a screen shot of my page as well as 
        a screen shot of what my page looks like when I'm adding a new bookmark.
        */

    /*    
    -   Finish the generateBookmarkHtml method
    -   This method returns a template literal containing the html for ONE bookmark in the array.
        It gets called in fillBookMarksList.  It has 1 parameter, a bookmark.
    -   CUT the html for ONE bookmark from your html page into the body of your method.
    -   Enclose the html in ``.
    -   Replace the hardcoded description, image, link and title (of the sample bookmark) 
        with template strings that use the properties of the bookmark object
    -   Return the template literal

-   Finish the fillBookmarksList method.  It has no parameters
    -   Save the bookmarks to local storage
    -   Create a variable bookmarkHtml and set it equal to the
        the return value for each of the individual bookmarks combined
        You can do this by calling the reduce method on the array
        It manipulates each element of an array to produce ONE result.  From the ToDoList:
            let tasksHtml = this.tasks.reduce(
                (html, task, index) => html += this.generateTaskHtml(task), ''
            );
    -   Set contents of the bookmarks-list element on the page to the bookmarkHtml variable
    -   Call the method addEventHandlers to allow the user to delete each of the bookmarks
    );
END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE HARDCODED BOOKMARKS YOUR ON PAGE
*/

/*  PART 2 - Delete a bookmark
    -   Finish the deleteBookmark method.  It has 2 parameters, index and event
        -   prevent the default action of the anchor tag using the event parameter
        -   delete the bookmark from the list based on the index
        -   call fillBookmarksList

    -   Finish the addEventHandlers method
        -   Create a variable called deleteIcons that refers to all of the 
            delete icons on the page.  Each has the name deleteBookmark.
        -   Create a for loop that iterates through the deleteIcons array
            -   set the click event for the current icon to the method
                deleteBookmark and bind this and the index of the bookmark in that statement
                From the todo list:
                checkBoxes[i].onchange = this.toggleTaskStatus.bind(this, i);  
    END OF PART 2 - TEST AND DEBUG YOUR CODE */