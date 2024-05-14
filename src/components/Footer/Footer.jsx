import React from "react";
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";
import classes from "./Footer.module.css";

const Footer = () => {
  const { lang, translations } = useLang();

  const handleSwitchLang = (lang) => {
    setLang(lang);
    localStorage.setItem("lang", JSON.stringify(lang));
  };

  return (
    <footer>
      <div className={classes.column}>
        <h3>{translations[lang].footer.itClub}</h3>
        <h5>{translations[lang].footer.doneBy}</h5>
      </div>

      <hr className={classes.line} />
      <div className={classes.textBottom}>
        <p>{translations[lang].footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
