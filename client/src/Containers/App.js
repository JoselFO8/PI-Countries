import './App.css';
// import { Route, Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

import NavBar from '../Components/Search/NavBar.jsx';

import Countries from '../Components/Countries/Countries.jsx'
import CountryDetail from '../Components/Countries/CountryDetail.jsx'
// import Country from '../Components/Navigation/Country.jsx';
import ActivitiesForm from '../Components/ActivitiesForm/ActivitiesForm';
import Footer from '../Components/Navigation/Footer';
import About from '../Components/Navigation/About';

// import { Wrapper } from '../Pagination/Wrapper';
// import Appi from '../Pagination/Appi.jsx';


function App() {

  return (
    <div className="App">
      <h1>Home (App) Countries</h1>
      <a href="/countries">Iniciar!</a>


      {/* <Route path='/Api'>
        <Appi />
      </Route>

      <Route path='/Wrapper'>
        <Wrapper />
      </Route> */}

      <Route path='/countries'>
        <NavBar />
      </Route>

      <Route exact path='/countries'>
        <Countries />
      </Route>

      <Route path='/countries/:id'>
        <CountryDetail />
      </Route>

      <Route path='/activities'>
        <ActivitiesForm />
      </Route>
      
      <Route path='/about'>
        <About />
      </Route>

      <Route path='/'>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
