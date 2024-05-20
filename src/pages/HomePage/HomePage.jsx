import classes from './HomePage.module.css'
import img1 from './../../assets/hp-img1.png'
import img2 from './../../assets/hp-img2.png'
import img3 from './../../assets/hp-img3.png'

const HomePage = () => {
    return ( 
        <div className={classes.homePage}>
            <div className={classes.container}> 
                <div className={classes.text}>
                    <div className={classes.upTitle}>Welcome to Arabic Easy</div>
                    <div className={classes.title}>Learn language with Expert Guidance!</div>
                    <div className={classes.subTitle}>Receive personalized feedback and tailored learning plans that adapt to your progress and learning style.</div>
                    <div className={classes.home_btn}>
                        <button>Discover More</button>
                    </div>
                </div>
                <div className={classes.image}>
                    <div >
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