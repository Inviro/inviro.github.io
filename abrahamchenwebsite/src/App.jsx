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
      <div id='home'>
        <img 
        src='portrait.png' 
        alt='Abraham, wearing glasses and a dark colored t-shirt smiles against a plain white background.' 
        className='portrait'/>
        <h1>
          <span>Hello! </span>
          <span>I'm </span>
          <span>Abraham</span>
        </h1>
      </div>
    </>
  );
}

export default App;
