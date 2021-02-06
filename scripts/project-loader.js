/**
   * setRepoStats takes the ID of a project and the repository name and updates its information
   * @param {String} repoName The name of the repository to search for
   * @param {Number} projectID The ID of the project to be altered
*/
function setRepoStats(repoName, projectID) {
  const REPO_URL = `https://api.github.com/repos/inviro/${repoName}`; // Repository location in Github API
  // Using JavaScript fetch API to perform Github API calls for repository information
  fetch(REPO_URL, {
    method: 'GET', // GET request
    headers: {
      Accept: 'application/json', // Accept JSON Files
      'Content-Type': 'application/json', // JSON content
      'User-Agent': 'AbrahamChen.me', // Website user agent
    },
  })
    .then((response) => response.json())
    .then((data) => { // Anonomous functions that convert the response into JSON format
      // Updating the repository information from the information obtained from the GET request
      document.getElementById(`watch-${projectID}`).innerHTML = ` ${data.watchers_count}`;
      document.getElementById(`star-${projectID}`).innerHTML = ` ${data.stargazers_count}`;
      document.getElementById(`fork-${projectID}`).innerHTML = ` ${data.forks_count}`;
      document.getElementById(`caption-${projectID}`).innerHTML = ` ${data.description}`;
    });
}

/**
   * loadProject takes the ID of a project and alters the project based upon pulled information
   * @param {String} entryID The ID of the entry to be altered
*/
function loadProject(entryID) {
  const entry = document.getElementById(entryID);
  const title = entry.firstElementChild.innerHTML;

  const PROJECT_ID = entryID.split('-')[1]; // Gets project ID by getting the second split element

  // Setting title to a github link
  let result = `<a href = 'https://github.com/inviro/${title}'>${title}</a>`;
  entry.firstElementChild.innerHTML = result;

  // Adding icons for the github stats that can be be updated dynamically with numbers later on
  // Uses FontAwesome for the icons
  result = `<a href="https://github.com/inviro/${title}/watchers" aria-label = "${title} Watchers"><i class="fa fa-lg fa-eye" id="watch-${PROJECT_ID}"></i></a>`;
  result += `<a href="https://github.com/inviro/${title}/stargazers" aria-label = "${title} Stargazers"><i class="fa fa-lg fa-star" id="star-${PROJECT_ID}"></i></a>`;
  result += `<a href="https://github.com/inviro/${title}/network/members" aria-label = "${title} Forks"><i class="fa fa-lg fa-code-branch" id="fork-${PROJECT_ID}"></i></a>`;
  document.getElementById(`repo-stats-${PROJECT_ID}`).innerHTML = result;
  setRepoStats(title, PROJECT_ID);
}

/**
   * loadProjects runs on window load and updates the HTML dom with project information
*/
function loadProjects() {
  const projects = document.getElementsByClassName('project');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < projects.length; i++) {
    loadProject(`project-${i}`);
  }
}

/**
   * setThemeLight sets the current theme to light theme
*/
function setThemeLight() {
  const root = document.documentElement;
  // Setting root css variables to change color theme
  root.style.setProperty('--primary-color', '3, 4, 94');
  root.style.setProperty('--overlay-color', 'rgba(245, 250, 255, 0.95)');
  root.style.setProperty('--header-color', '33, 158, 188');
  root.style.setProperty('--highlight-color', 'rgba(255, 255, 255, .90)');
}

/**
   * setThemeDark sets the current theme to dark theme
*/
function setThemeDark() {
  const root = document.documentElement;
  // Setting root css variables to change color theme
  root.style.setProperty('--primary-color', '255, 255, 255');
  root.style.setProperty('--overlay-color', 'rgba(50, 50, 140, .5)');
  root.style.setProperty('--header-color', '3, 4, 94');
  root.style.setProperty('--highlight-color', '#219EBC');
}

/**
   * addThemePicker displays the theme picker raido buttons, and attaches listeners to them
*/
function addThemePicker() {
  document.getElementById('color-theme').style.display = 'inline'; // Changes display state from none to inline
  // Adds listeners to radio buttons to set css variables onclick
  document.getElementById('theme-light').onclick = setThemeLight;
  document.getElementById('theme-dark').onclick = setThemeDark;
}

/**
   * addAnimations adds animations using JavaScript and css to different inputs
*/
function addAnimations() {
  // Adding animation to logo on mouseover and mouseout
  const logo = document.getElementsByClassName('logo')[0]; // Gets logo by class name
  logo.addEventListener('mouseover', () => {
    logo.style.animation = 'rotation 2s infinite linear'; // Adds infinate rotation keyframe on mouseover
  });
  logo.addEventListener('mouseout', () => {
    logo.style.animation = 'none'; // Removes rotation keyframe on mouseout
  });
}

/**
   * addTextAnimation adds animations to text using JavaScript
   * @param {HTMLElement} ele The element which to animate
   * @param {String} text A string seperated by " | " of text to animate over
*/
function addTextAnimation(ele, text) {
  if (text.indexOf(' | ') > -1) { // If | exists in the element's innerHTML
    let isPaused = false; // Pauses animation on hover
    const wordArray = text.split(' | '); // Splits html from a single line into several elements
    let currIdx = 0; // Keeps track of the current index in wordArray
    setInterval(() => { // Performs this on an interval
      if (!isPaused) { // If isPaused is false, do the rest
        // eslint-disable-next-line no-param-reassign
        ele.innerHTML = wordArray[currIdx]; // Sets element HTML to the currentIndex
        // Increments index, and ensures that it is within array bounds
        currIdx = ((currIdx + 1) % wordArray.length);
      }
    }, 4500); // Repeat every x miliseconds

    // Adds pause on mouseover and resumes on mouseout
    ele.addEventListener('mouseover', () => {
      isPaused = true;
    });
    ele.addEventListener('mouseout', () => {
      isPaused = false;
    });
  }
}

/**
   * updateHitCount updates the count of weekly and total visits to my website
*/
function updateHitCount() {
  const a = 'aHR0cHM6Ly91cy1jZW50cmFsMS1hYnJhaGFtY2hlbndlYi5jbG91ZGZ1bmN0aW9ucy5uZXQvd2Vic2l0ZUhpdHMg';
  const visitsDisplay = document.getElementById('visits-display');
  fetch(atob(a))
    .then((resp) => resp.json())
    .then((jsonResp) => {
      let htmlString = `<p><strong>Weekly visits:  </strong>${parseInt(jsonResp.weeklyHits, 10).toLocaleString()}`;
      htmlString += `<br><strong>Total visits:  </strong>${parseInt(jsonResp.totalHits, 10).toLocaleString()}</p>`;
      visitsDisplay.innerHTML = htmlString;
    });
}

// Runs on window load
window.onload = () => {
  updateHitCount();
  addThemePicker();
  addAnimations();
  loadProjects();
};
