import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormIntervention.scss";
const { config } = require("../../config/config");

function FormIntervention() {
  //const baseURL = `https:///api/v1/equations/harrisbenedict/last`;
  const baseURL = `${config.APP_API_URL}/equations/harrisbenedict`;
  const [bmr, setBmr] = useState([]);
  const [InitialData, setInitialData] = useState([]);
  const [kg, setKg] = useState("");
  const [cm, setCm] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(0);
  const [assignSex, setAssignSex] = useState("");
  const [messageServer, setMessageSever] = useState("");

  useEffect(() => {
    // getLastValueBMR(baseURL, setBmr, setInitialData);
  }, []);

  async function getLastValueBMR(baseURL, setBmr, setInitialData) {
    const getUrlLast = `${baseURL}/last`;
    try {
      await axios
        .get(getUrlLast)
        .then(res => {
          setBmr(res.data.results);
          setInitialData(res.data.results.datos_iniciales);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(err);
    }
  }

  function calculateValueBMR() {
    const objectValues = {
      kg: kg,
      cm: cm,
      edad: age,
      sexo: sex,
    };
    // console.log(objectValues);
    axios
      .post(baseURL, objectValues)
      .then(response => {
        setMessageSever("Record created");
        getLastValueBMR(baseURL, setBmr, setInitialData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container">
        <div className="container_form">
          <h3 className="form__title">Nutritional Intervention - BMR Form</h3>
          <p className="form__message">Enter your data</p>

          <form
            action="/"
            className="formIntervention"
            onSubmit={event => {
              event.preventDefault();
              calculateValueBMR();
            }}
          >
            <label htmlFor="kg" className="label">
              Kilograms
            </label>
            <input
              type="number"
              id="kg"
              placeholder="68.5"
              className="input"
              min="0"
              step="any"
              max="200"
              value={kg}
              onChange={event => {
                setKg(event.target.value);
              }}
            />

            <label htmlFor="cm" className="label">
              Centimeters
            </label>
            <input
              type="number"
              id="cm"
              placeholder="168.5"
              className="input"
              min="0"
              step="any"
              max="200"
              value={cm}
              onChange={event => {
                setCm(event.target.value);
              }}
            />

            <label htmlFor="age" className="label">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="35"
              className="input"
              min="0"
              step="1"
              max="100"
              value={age}
              onChange={event => {
                setAge(event.target.value);
              }}
            />
            <label htmlFor="sex" className="label">
              Sex
            </label>
            <select
              defaultValue={sex}
              onChange={event => {
                setSex(event.target.value);
                console.log(sex);
              }}
            >
              <option value="0">Woman</option>
              <option value="1">Men</option>
            </select>

            <input
              type="submit"
              value="Calculate value"
              className="submit-button"
            />
          </form>
        </div>
        <div>{messageServer}</div>
        {bmr.bmr ? (
          <div className="container__results">
            <div className="results__initialdata">
              <strong>Initial Data</strong>
              <p>Age: {InitialData.edad}</p>
              <p>Height- cm: {InitialData.estaturacm}</p>
              <p>Weight- kg: {InitialData.peso}</p>
              <p>Sexo: {InitialData.sexo}</p>
            </div>
            <div className="results__resultsdata">
              <strong>Results</strong>
              <div>
                <p>BMR: {bmr.bmr}</p>
              </div>
              <div>
                <p>Equation: {bmr.type}</p>
                <p>Exception: {bmr.exception}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>No results</div>
          </>
        )}
      </div>
    </>
  );
}

export default FormIntervention;
