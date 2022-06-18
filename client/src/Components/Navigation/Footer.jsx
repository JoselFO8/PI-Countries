import { Link } from 'react-router-dom';

import About from './About.jsx'


export default function Footer() {
    return (
      <div >
          <Link to='/about'> 
            <div >
              <h5 >About</h5>
            </div>
          </Link>
      </div>
    );
  };