import React from "react";
import FormIntervention from "./form/FormIntervention";
import "../styles/globalStyles.scss";

function App() {
  /* const frontObject = {
    kg: 100,
    cm: 180,
    edad: 35,
    sexo: 1,
  };*/

  return (
    <>
      <div className="header header_md--background1">
        <div className="header_overlay--black">
          <h1 className="title_main title-main--white">BMR Equations</h1>
          <p className="separator--small">__</p>
        </div>
      </div>

      <FormIntervention />
    </>
  );
}

export default App;
