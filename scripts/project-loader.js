/**
   * loadProject takes a childNode and alters it based upon information pulled using scripts
   * @param {Element} entry The element to be altered
*/
function loadProject(entry) {
    const userName = "Inviro";
    let title = entry.firstElementChild.innerHTML;
    let caption = entry.lastElementChild.innerHTML;
    // title = "<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>";
    // console.log("<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>");
    // entry.firstChild.innerHTML = "HELLO WORLD";
    console.log(title);
    console.log(caption);
    console.log(entry);
    // switch(title){
    //     case "Illud":
    //         break;
    //     default:
    // }
}

/**
   * loadProjects runs on window load and edits the HTML dom with the project information for each project
*/
function loadProjects() {
    let projectList = document.getElementsByClassName("project");
    for(var i = 0; i < projectList.length; i++) {
        loadProject(projectList.item(i));
    }
    console.log(projectList);
}

window.onload = function() {
    loadProjects();
    // console.log("Hello World");
}