import {Link} from 'react-router-dom'
import style from './Homepage.module.css'

export default function Homepage() {

    return (
        <div className={style.homepage}>

            <div className={style.centerbox}>
                <div className={style.title}>
                    <h1>The pleasure of traveling</h1>
                </div>

                <div className={style.button}>
                    <Link to='/home'>
                        <h4 id={style.button}>Start</h4>
                    </Link>
                </div>
            </div>
            

        </div>
    )
}