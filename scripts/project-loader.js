/**
   * loadProject takes a childNode and alters it based upon information pulled using scripts
   * @param {Element} entry The element to be altered
*/
function loadProject(entry) {
    const userName = "Inviro";
    let title = entry.firstElementChild.innerHTML;
    let caption = entry.lastElementChild.innerHTML;
    console.log(title);
    console.log(caption);
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
    var projectList = document.getElementsByClassName("project");
    for(var i = 0; i < projectList.length; i++) {
        loadProject(projectList[i]);
    }
}

window.onload = function() {
    loadProjects();
}