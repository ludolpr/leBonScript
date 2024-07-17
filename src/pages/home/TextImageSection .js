import React from "react";
import ScriptImg from "../../images/script.png";
const TextImageSection = () => {
  return (
    <div className="homeContainer">
      <div className="leftHome">
        <h2>Bienvenue sur notre site qui te conseil des scripts</h2>
        <p>
          Ceci est un bref message, à toi de parcourir le site pour nous
          decouvrir.
        </p>
      </div>
      <div className="rightHome">
        <img src={ScriptImg} alt="script" />
      </div>
    </div>
  );
};

export default TextImageSection;
