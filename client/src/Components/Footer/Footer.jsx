import { Link } from 'react-router-dom';

import About from '../About/About.jsx'
import style from './Footer.module.css'


export default function Footer() {
    return (
      <div className={style.Footer}>
          <Link to='/about'> 
            <div >
              <h4 className={style.button}>About</h4>
            </div>
          </Link>
      </div>
    );
  };