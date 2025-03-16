export default function createNavbar (activePage){

    let generatorActive = "";
    let archiveActive = "";
    
    if (activePage == "Generator") {
        generatorActive = "active";
    }
    if (activePage == "Archive") {
        archiveActive = "active";
    }
    else {
        console.log("somethings wrong with the navbar")
    }
    
    return `
    <nav class="navbar fixed-bottom id="${activePage} navbar">
        <div class="container-fluid">
            <div class="navbar" id="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link ${generatorActive}"  href="index.html">Generator</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"> &nbsp; / &nbsp; </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${archiveActive}" href="archive.html">Archive</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
      </nav>
    `
    }