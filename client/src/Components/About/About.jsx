import style from './About.module.css'

export default function About() {

    return (
        <div className={style.About}>

            <div className={style.container}>

                <div className={style.title}>
                    <h1 className={style.principalTitle}>About</h1>
                    <br />
                </div>

                <div className={style.line}></div>

                <div className={style.personalInf}>
                    <div className={style.name}>
                        <h1 className={style.personalName}>Jose Luis Fernández Orjuela</h1>
                        <h3 className={style.profession}>Estudiante de desarrollo web Full-Stack</h3>
                    </div>
                    
                    <div className={style.personalInf_2}>
                        <h5>
                            A lo largo de mi vida he trabajado en diferentes oficios y he estudiado diversas cosas, sin embargo, siempre me he sentido pasión por la tecnología, me gustaría ser la solución a sus necesidades de desarrollo web en un mundo globalizado y conectado como lo es ahora.
                        </h5>
                    </div>
                </div>

                <div className={style.pageInf}>
                    <h1 className={style.titleCountries}>Countries-App</h1>

                    <h5 className={style.text}>
                        Este es un espacio en la web donde usted puede plasmar sus actividades turísticas a nivel global.
                    </h5>

                    <h5 className={style.text}>
                        Este proyecto nació como desafío del bootcamp SoyHenry con el fin de interiorizar todo lo aprendido a lo largo del curso, se hizo uso de distintos tipos de tecnología, como son:
                    </h5>
                    
                    <ul className={style.list}>
                        <li>React.js</li>
                        <li>Redux</li>
                        <li>Node</li>
                        <li>CSS</li>
                        <li>Express</li>
                        <li>Sequelize</li>
                        <li>PostGress</li>
                    </ul>
                </div>

            </div>
            
        </div>
    )
}