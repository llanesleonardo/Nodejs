import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormIntervention.scss";
const { config } = require("../../config/config");

function FormIntervention() {
  const formulas = [
    {
      name: "Harris-Benedict",
      applyFormula: false,
      api: "harrisbenedict",
    },
    {
      name: "Mifflin-&-Joer",
      applyFormula: false,
      api: "mifflinjoer",
    },
    { name: "FAO-OMS", applyFormula: false, api: "faooms" },
    { name: "Valencia", applyFormula: false, api: "valencia" },
    { name: "Schofield", applyFormula: false, api: "schofield" },
  ];
  //const baseURL = `http://localhost:3000/api/v1/equations/`;
  const baseURL = `${config.APP_API_URL}/equations/`;
  const [bmr, setBmr] = useState([]);
  const [InitialData, setInitialData] = useState([]);
  const [kg, setKg] = useState("");
  const [cm, setCm] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(0);
  const [assignSex, setAssignSex] = useState("");
  const [messageServer, setMessageSever] = useState("");
  const [formulaList, setFormulaList] = useState(formulas);

  useEffect(() => {
    // getLastValueBMR(baseURL, setBmr, setInitialData);
  }, []);

  async function getLastValueBMR(baseURL, setBmr, setInitialData) {
    const getUrlLast = `${baseURL}`;
    try {
      await axios
        .get(getUrlLast)
        .then(res => {
          console.log(res.data.results);
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

  async function calculateValueBMR() {
    const numberFormulas = formulaList.filter(
      ({ applyFormula }, index) => applyFormula === true
    );
    const objectValues = {
      kg: kg,
      cm: cm,
      edad: age,
      sexo: sex,
      formulaList: numberFormulas,
    };
    if (numberFormulas.length === 1) {
      await axios
        .post(`${baseURL}${numberFormulas[0].api}`, objectValues)
        .then(response => {
          getLastValueBMR(
            `${baseURL}${numberFormulas[0].api}/last`,
            setBmr,
            setInitialData
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      await axios
        .post(`${baseURL}all`, objectValues)
        .then(response => {
          getLastValueBMR(`${baseURL}all`, setBmr, setInitialData);
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleChanges(indexPosition) {
    const updateCheckInput = formulaList.map(
      ({ name, applyFormula, api }, index) => {
        let applyFormulaResult =
          index === indexPosition ? !applyFormula : applyFormula;
        let recordChanged = {
          name,
          applyFormula: applyFormulaResult,
          api,
        };
        return recordChanged;
      }
    );

    setFormulaList(updateCheckInput);
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
              }}
            >
              <option value="0">Woman</option>
              <option value="1">Men</option>
            </select>
            <h4>Formulas</h4>
            <ul className="form__checkinputlist">
              {formulas.map(({ name }, index) => {
                return (
                  <li key={index}>
                    <label htmlFor={name} className="label">
                      {name}
                    </label>
                    <input
                      type="checkbox"
                      id={`checkbox-${name}`}
                      name={name}
                      value={name}
                      checked={formulas["applyFormula"]}
                      onChange={() => handleChanges(index)}
                      className="input"
                    />
                  </li>
                );
              })}
            </ul>
            <input
              type="submit"
              value="Calculate value"
              className="submit-button"
            />
          </form>
        </div>
        <div>{messageServer}</div>

        <div className="container__results">
          <div className="results__initialdata">
            <strong>Initial Data</strong>
            <p>Age: {InitialData.edad}</p>
            <p>Height- cm: {InitialData.estaturacm}</p>
            <p>Weight- kg: {InitialData.peso}</p>
            <p>Sexo: {InitialData.sexo}</p>
          </div>
          <ul>
            {bmr.results ? (
              Object.keys(bmr.results).map((key, index) => {
                return (
                  <li key={index}>
                    <div className="results__resultsdata">
                      <strong>Results of {bmr.results[key].name}</strong>
                      <div>
                        <p>BMR: {bmr.results[key].results.bmr}</p>
                      </div>
                      <div>
                        <p>Exception: {bmr.results[key].results.exception}</p>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <>
                <div>No results</div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FormIntervention;
