import './App.css';
import 'normalize.css'; // Does CSS normalization to make cross browser experience unifor
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        {/* Site Metadata Start */}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="author" content="Abraham Chen"/>
        <meta name="description" content="Personal website for Abraham Chen"/>
        {/* Site Metadata End */}
        <title>Abraham Chen </title>
      </Helmet>
      <header>
        <a href="#home" title="Visit home">
          <img src="NameLogo.svg" alt="Website home" id="name-logo" />
        </a>
      </header>
      <nav class="menu-wrap">
        <input type="checkbox" class="toggler" aria-label = "menu" />
        <div class="burger"><div></div></div>
        <div class="menu">
          <div>
            <div>
              <ul class="nav-links">
                <li><a class = "nav-link" href="#home">Home</a></li>
                <li><a class = "nav-link" href="#about">About</a></li>
                <li><a class = "nav-link" href="#projects">Projects</a></li>
                <li><a class = "nav-link" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div id="content-wrap">
        <div id='home'>
          <img 
          src='portrait.png' 
          alt='Abraham, wearing glasses and a dark colored t-shirt smiles against a plain white background.'
          title="Yep, that's me!"
          className='portrait'/>
          <h1>
            <div>Glad</div>
            <div>you're</div>
            <div>here!</div>
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
