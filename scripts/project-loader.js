
const REPO_STATS_TTL_MS = 24 * 60 * 60 * 1000; // cache for 24 hours

function getCachedRepoStats(repoName) {
  try {
    const raw = localStorage.getItem(`repo-stats-${repoName}`);
    if (!raw) return null;

    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > REPO_STATS_TTL_MS) {
      localStorage.removeItem(`repo-stats-${repoName}`);
      return null;
    }

    return cached.data;
  } catch (error) {
    return null;
  }
}

function cacheRepoStats(repoName, data) {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(`repo-stats-${repoName}`, JSON.stringify(payload));
  } catch (error) {
    // localStorage may be unavailable or full; ignore silently
  }
}

function updateRepoStatsDOM(data, projectID) {
  document.getElementById(`watch-${projectID}`).innerHTML = ` ${data.watchers_count}`;
  document.getElementById(`star-${projectID}`).innerHTML = ` ${data.stargazers_count}`;
  document.getElementById(`fork-${projectID}`).innerHTML = ` ${data.forks_count}`;
  document.getElementById(`caption-${projectID}`).innerHTML = ` ${data.description}`;
}

function setRepoStats(repoName, projectID) {
  const cached = getCachedRepoStats(repoName);
  if (cached) {
    updateRepoStatsDOM(cached, projectID);
    return;
  }

  const REPO_URL = `https://api.github.com/repos/inviro/${repoName}`; // Repository location in Github API
  // Using JavaScript fetch API to perform Github API calls for repository information
  fetch(REPO_URL, {
    method: 'GET', // GET request
    headers: {
      Accept: 'application/json', // Accept JSON Files
      'Content-Type': 'application/json', // JSON content
      'User-Agent': 'AbrahamChen.com', // Website user agent
    },
  })
    .then((response) => response.json())
    .then((data) => { // Anonomous functions that convert the response into JSON format
      cacheRepoStats(repoName, data);
      updateRepoStatsDOM(data, projectID);
    })
    .catch(() => {
      // If the fetch fails, let the page keep any existing default text.
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
  document.getElementById('theme-light').checked = true; // Sets light theme to be the default theme on page load
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
      let htmlString = `<p class="noselect"><strong>Weekly visits:  </strong>${parseInt(jsonResp.weeklyHits, 10).toLocaleString()}`;
      htmlString += `<br><strong>Total visits:  </strong>${parseInt(jsonResp.totalHits, 10).toLocaleString()}</p>`;
      visitsDisplay.innerHTML = htmlString;
    });
}

// Particle effect variables
let canvas, ctx, particles = [];
let cursorX = -9999;
let cursorY = -9999;

// Initialize particle system
function initParticles() {
  canvas = document.getElementById('particle-canvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 10 + 1,
      color: `rgba(255, 255, 255, ${Math.random()})`,
    });
  }

  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (event) => {
    const pos = getMousePos(event, canvas);
    cursorX = pos.x;
    cursorY = pos.y;
  });

  window.addEventListener('mousedown', (event) => {
    const particlesPerClick = 10;
    const pos = getMousePos(event, canvas);

      // Add burst of particles on click
    for (let i = 0; i < particlesPerClick; i++) {
      particles.push({
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 10 + 1,
        color: `rgba(255, 255, 255, ${Math.random()})`,
      });
    }
  });

  animateParticles();
}

function getMousePos(event, canvas) {
  const target = canvas || event.target;
  const rect = target.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off edges and the cursor
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    // Bounce off cursor
    const dx = particle.x - cursorX;
    const dy = particle.y - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < particle.size) {
      // Reverse velocity
      particle.vx *= -1;
      particle.vy *= -1;
      
    // Push particle away from cursor to prevent sticking
    if (distance > 0) {
      const pushForce = particle.size - distance + 5; // Add buffer
      particle.x += (dx / distance) * pushForce;
      particle.y += (dy / distance) * pushForce;
    }
}

    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

// Runs on window load
window.onload = () => {
  updateHitCount();
  addThemePicker();
  addAnimations();
  loadProjects();
  initParticles();
};
