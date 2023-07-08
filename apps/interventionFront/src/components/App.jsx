import React, { useEffect, useState } from "react";
import axios from "axios";
//import "../styles/global.scss";

function App() {
  /* const frontObject = {
    kg: 100,
    cm: 180,
    edad: 35,
    sexo: 1,
  };*/
  const baseURL = `https://octopus-app-xm67u.ondigitalocean.app/api/v1/equations/harrisbenedict/last`;
  const [bmr, setBmr] = useState([]);
  const [InitialData, setInitialData] = useState([]);

  useEffect(() => {
    axios({ baseURL })
      .then(res => {
        setBmr(res.data.results);
        console.log(res.data.results);
        setInitialData(res.data.results.datos_iniciales);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>FrontEnd BMR Equations </div>
      <div>
        <p>BMR: {bmr.bmr}</p>
      </div>
      <div>
        <p>Equation: {bmr.type}</p>
        <p>Exception: {bmr.exception}</p>
      </div>
      <div>
        <strong>Datos iniciales</strong>
        <p>Edad: {InitialData.edad}</p>
        <p>Estatura en cm: {InitialData.estaturacm}</p>
        <p>Peso Kg: {InitialData.peso}</p>
        <p>Sexo: {InitialData.sexo}</p>
      </div>
    </>
  );
}

export default App;
