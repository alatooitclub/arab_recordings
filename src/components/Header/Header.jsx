import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import flagUSA from "../../assets/flagUSA.svg";
import flagRU from "../../assets/flagRU.svg";
import flagKG from "../../assets/flagKG.svg";
import dropdownIcon from "../../assets/dropdown.svg";
import classes from "./Header.module.css";

const Header = () => {
  const { isAuth, logout } = useAuth();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { lang, translations } = useLang();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSwitchLang = (lang) => {
    setLang(lang);
    localStorage.setItem("lang", JSON.stringify(lang));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className={classes["header-details"]}>
        <div className={classes["header-logo"]}>
          <img src={logo} className={classes["logo"]} alt="Arabic Easy Logo" />
          <div className={classes["logoText"]}>Arabic Easy</div>
        </div>

        {isMobile && (
          <>
            <div className={classes.lang}>
              <button className={classes.langToggle} onClick={() => setShowLangMenu(!showLangMenu)}>
                {lang === "en" && <img src={flagUSA} alt="English" />}
                {lang === "ru" && <img src={flagRU} alt="Russian" />}
                {lang === "kg" && <img src={flagKG} alt="Kyrgyz" />}
              </button>
              {showLangMenu && (
                <ul className={classes.langMenu}>
                  {["ru", "en", "kg"].filter(item => item !== lang).map(langItem => (
                    <li key={langItem}>
                      <button 
                        className={`${classes.langOption} ${lang === langItem ? classes.activeLang : ''}`}
                        onClick={() => { handleSwitchLang(langItem); setShowLangMenu(false); }}
                      >
                        {langItem === "en" && <img src={flagUSA} alt="English" />}
                        {langItem === "ru" && <img src={flagRU} alt="Russian" />}
                        {langItem === "kg" && <img src={flagKG} alt="Kyrgyz" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {isAuth && (
              <div className={classes.icons}>
                <NavLink to="/profilePage" style={{ textDecoration: "none", margin: "10px" }}>
                  <img src={profile} alt="Profile-icon" />
                </NavLink>
              </div>
              )
            }
            <button className={classes.dropdownButton} onClick={handleToggleMenu}>
              <img src={dropdownIcon} alt="Dropdown" />
            </button>
          </>
        )}

        {!isMobile && (
          <div className={classes.navbar} id="navbar">
            <div className={classes.lang}>
              <button className={classes.langToggle} onClick={() => setShowLangMenu(!showLangMenu)}>
                {lang === "en" && <img src={flagUSA} alt="English" />}
                {lang === "ru" && <img src={flagRU} alt="Russian" />}
                {lang === "kg" && <img src={flagKG} alt="Kyrgyz" />}
              </button>
              {showLangMenu && (
                <ul className={classes.langMenu}>
                  {["ru", "en", "kg"].filter(item => item !== lang).map(langItem => (
                    <li key={langItem}>
                      <button 
                        className={`${classes.langOption} ${lang === langItem ? classes.activeLang : ''}`}
                        onClick={() => { handleSwitchLang(langItem); setShowLangMenu(false); }}
                      >
                        {langItem === "en" && <img src={flagUSA} alt="English" />}
                        {langItem === "ru" && <img src={flagRU} alt="Russian" />}
                        {langItem === "kg" && <img src={flagKG} alt="Kyrgyz" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {(!isMobile) && (
          <div className={classes.navbar}>
            <div className={classes["navbar-log"]} id="navbar-log">
              {isAuth ? (
                <>
                  <div className={classes.icons}>
                    <NavLink to="/profilePage" style={{ textDecoration: "none", margin: "10px" }}>
                      <img src={profile} alt="Profile-icon" />
                    </NavLink>
                  </div>
                  <button className={classes.buttonsNav} id="signOutBut" onClick={handleLogout}>
                    {translations[lang].header.signOut}
                  </button>
                </>
              ) : (
                <>
                  <button className={`${classes.buttonsNav} ${classes.loginButton}`}>
                    <NavLink to="/login" style={{ textDecoration: "none", margin: "0px" }}>
                      {translations[lang].header.signIn}
                    </NavLink>
                  </button>
                  <button className={classes.buttonsNav}>
                    <NavLink to="/register" style={{ textDecoration: "none", margin: "0px" }}>
                      {translations[lang].header.signUp}
                    </NavLink>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showMenu && isMobile && (
        <> 
          <div className={`${classes.dropdownMenu} ${showMenu ? classes.show : ""}`}>
            <div className={classes["navbar-log"]} id="navbar-log">
              {isAuth ? (
                <>
                  <div className={classes.buttonNav} id="signOutBut" onClick={handleLogout}>
                    {translations[lang].header.signOut}
                  </div>
                </>
              ) : (
                <>
                  <div className={`${classes.buttonNav} ${classes.loginButton}`}>
                    <NavLink to="/login" style={{ textDecoration: "none" }}>
                      {translations[lang].header.signIn}
                    </NavLink>
                  </div>
                  <div className={classes.buttonNav}>
                    <NavLink to="/register" style={{ textDecoration: "none"}}>
                      {translations[lang].header.signUp}
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;