/**
   * loadProject takes the ID of a project and alters the project based upon information pulled using scripts
   * @param {String} entryID The ID of the entry to be altered
*/
function loadProject(entryID) {
    let entry = document.getElementById(entryID);
    let title = entry.firstElementChild.innerHTML;
    let caption = entry.lastElementChild.innerHTML;
    console.log(title);
    console.log(caption);

    title = "<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>";
    entry.firstElementChild.innerHTML = title;
    // console.log(temp);
    // const userName = "Inviro";
    // let title = entry.firstElementChild.innerHTML;
    // let caption = entry.lastElementChild.innerHTML;
    // title = "<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>";
    // console.log("<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>");
    // entry.firstChild.innerHTML = "HELLO WORLD";

    // console.log(title);
    // console.log(caption);
    // console.log(entry);

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

    let projectListLength = document.getElementsByClassName("project").length;
    // console.log(projectListLength);
    for(var i = 0; i < projectListLength; i++) {
        loadProject("project-" + (i + 1));
    }
}

window.onload = function() {
    loadProjects();
}