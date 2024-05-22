import classes from './HomePage.module.css'
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";
import img1 from './../../assets/hp-img1.png'
import img2 from './../../assets/hp-img2.png'
import img3 from './../../assets/hp-img3.png'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
    const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

    return ( 
        <div className={classes.homePage}>
            <div className={classes.container}> 
                <div className={classes.text}>
                    <div className={classes.upTitle}>{translations[lang].home_page.welcome}</div>
                    <div className={classes.title}>{translations[lang].home_page.title}</div>
                    <div className={classes.subTitle}>{translations[lang].home_page.subtitle}</div>
                    <div className={classes.home_btn}>
                        <button>
                            <NavLink to="/login" style={{ textDecoration: "none"}}>{translations[lang].home_page.login}</NavLink>
                        </button>
                        <button>
                            <NavLink to="/register" style={{ textDecoration: "none"}}>{translations[lang].home_page.regist}</NavLink>
                        </button>
                    </div>
                </div>
                <div className={classes.image}>
                    <div className={classes.image-img1}>
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <div>
                            <img src={img2} alt="" />
                        </div>
                        <div>
                            <img src={img3} alt="" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default HomePage;