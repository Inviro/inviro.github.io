async function getRepoStats(repoUrl) {

}

async function setRepoStats(title, projectID) {
    // const repo_url = "https://github.com/inviro/" + title; // Repository location
    // console.log(fetch(repo_url));
    // fetch(repo_url).then(response => {
    //     console.log(response.text);
    // })
    // console.log(my_url);

    // Setting repo stats of the Github repository dynamically based on results from JavaScript
    // result = "<a href=\"https://github.com/inviro/" + title + "/watchers\" aria-label = \"" + title + " Watchers\"><i class=\"fa fa-lg fa-eye\"> " + 10 + "</i></a>";
    
    
    // const watchers;
    // const stargazers;
    // const branches;

    // const html = fetch(url, {mode: 'cors'}).then(response => {
    //     if(response.ok) {
    //         return response.text();
    //     }
    // }).then(text => {
    //     console.log(text)
    // })

    
    // const html = (await (await fetch(url)).text()); // Gets the html of the url
    // const repoDom = new DOMParser().parseFromString(html, 'text/html');
    // console.log(repoDom.getElementsByClassName("social-count"));

    // Getting repo stats of the Github repository
    
    // const repoDom = getDOMofURL(url);
    // console.log(repoDom.getElementsByClassName("social-count"));
}

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

    // Adding icons for the github stats that can be be updated with number later on
    result = "<a href=\"https://github.com/inviro/" + title + "/watchers\" aria-label = \"" + title + " Watchers\"><i class=\"fa fa-lg fa-eye\" id=\"watch-" + PROJECT_ID +"\"></i></a>";
    result += "<a href=\"https://github.com/inviro/" + title + "/stargazers\" aria-label = \"" + title + " Stargazers\"><i class=\"fa fa-lg fa-star\" id=\"star-" + PROJECT_ID +"\"></i></a>";
    result += "<a href=\"https://github.com/inviro/" + title + "/network/members\" aria-label = \"" + title + " Branches\"><i class=\"fa fa-lg fa-code-branch\" id=\"branch-" + PROJECT_ID + "\"></i></a>";
    document.getElementById("repo-stats-" + PROJECT_ID).innerHTML = result;
    // setRepoStats(title, PROJECT_ID);
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
    // Testing code start
    // const url = "https://github.com/inviro/" + title; // Repository location

    // const watchers = 4;
    // const stargazers = 5;
    // const branches = 6;

    // console.log(watchers);
    // fetch(url, {mode: 'cors'}).then(response => {
    //     if(response.ok) {
    //         console.log(response);
    //     } else {
    //         console.log(response);
    //     }
    // })


    // Testing code end
    // console.log("Hello world");
    loadProjects();
}