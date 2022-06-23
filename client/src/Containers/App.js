import './App.css';
import { Route, useLocation } from 'react-router-dom'

import NavBar from '../Components/Search/NavBar.jsx';

import Homepage from '../Components/Homepage/Homepage.jsx'
import Countries from '../Components/Countries/Countries.jsx'
import CountryDetail from '../Components/Countries/CountryDetail.jsx'
import ActivitiesForm from '../Components/ActivitiesForm/ActivitiesForm';
import Footer from '../Components/Footer/Footer.jsx';
import About from '../Components/About/About.jsx';


function App() {
  const {pathname} = useLocation();

  const renderNavBar = (
        pathname === '/'
        ? <></>
        : <Route path='/'>
              <NavBar />
            </Route>
  )

  return (
    <div className="App">
        
      <Route exact path='/'>
        <Homepage />
      </Route>

      { renderNavBar }

      <Route exact path='/home'>
        <Countries />
      </Route>

      <Route path='/home/:id'>
        <CountryDetail />
      </Route>

      <Route path='/activities'>
        <ActivitiesForm />
      </Route>
      
      <Route path='/about'>
        <About />
      </Route>

      {
        pathname === '/'
        ? <></>
        : <Route path='/'>
            <Footer />
          </Route>
      }

    </div>
  );
}

export default App;
