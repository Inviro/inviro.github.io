/**
   * loadProject takes the ID of a project and alters the project based upon information pulled using scripts
   * @param {String} entryID The ID of the entry to be altered
*/
function loadProject(entryID) {
    let entry = document.getElementById(entryID);
    let title = entry.firstElementChild.innerHTML;
    // let caption = entry.lastElementChild.innerHTML;

    let result;
    const PROJECT_ID = entryID.split("-")[1]; // Gets project ID

    // Setting title to a github link
    result = "<a href=" + "https://github.com/inviro/" + title + ">" + title + "</a>";
    entry.firstElementChild.innerHTML = result;

    // Setting repo stats of the Github repository dynamically based on results from JavaScript
    result = "<a href=\"https://github.com/inviro/" + title + "/watchers\" aria-label = \"" + title + " Watchers\"><i class=\"fa fa-lg fa-eye\"> " + 10 + "</i></a>";
    result += "<a href=\"https://github.com/inviro/" + title + "/stargazers\" aria-label = \"" + title + " Stargazers\"><i class=\"fa fa-lg fa-star\"> " + 10 + "</i></a>";
    result += "<a href=\"https://github.com/inviro/" + title + "/network/members\" aria-label = \"" + title + " Branches\"><i class=\"fa fa-lg fa-code-branch\"> " + 10 + "</i></a>";
    document.getElementById("repo-stats-" + PROJECT_ID).innerHTML = result;
}

/**
   * loadProjects runs on window load and edits the HTML dom with the project information for each project
*/
function loadProjects() {
    let projectListLength = document.getElementsByClassName("project").length;
    for(var i = 0; i < projectListLength; i++) {
        loadProject("project-" + i);
    }
}

window.onload = function() {
    loadProjects();
}