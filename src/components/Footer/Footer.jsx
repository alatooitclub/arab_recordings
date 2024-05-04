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
        <h3>Ala-Too IT Club</h3>
        <h5>Done by University students</h5>
      </div>

      <hr className={classes.line} />
      <div className={classes.textBottom}>
        <p>All rights reserved by Ala-Too IT Club</p>
      </div>
    </footer>
  );
};

export default Footer;
