class EquationsController {
  constructor(EquationsServices) {
    this.EquationsServices = EquationsServices;
    this.resultArrayHarrisB = [];
    this.resultArrayMifflinJ = [];
    this.resultArrayFaoO = [];
    this.resultArrayValencia = [];
    this.resultArraySchofield = [];
    this.resultAllEquations = [];
  }

  /**
 *  curl -X POST http://localhost:3000/api/v1/ -H "Content-Type: application/json" -d '{"kg":100,"cm":180,"edad":34,"sexo":1}'
curl -X POST https://octopus-app-xm67u.ondigitalocean.app/api/v1/ -H "Content-Type: application/json" -d '{"kg":100,"cm":180,"edad":34,"sexo":1}'
 */

  async allequationsTwo(req, res, next) {
    const { kg, cm, edad, sexo, formulaList } = req.body;
    try {
      const resultObject = {
        message: 'Equation found',
        type: 'BMR Equations',
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
      };
      let resultObject2 = {};
      // let resultObjectNested = {};
      await formulaList.forEach(async (item) => {
        let valueFormula;
        switch (item.api) {
          case 'harrisbenedict':
            valueFormula = await this.EquationsServices.harrisbenedict(
              kg,
              cm,
              edad,
              sexo,
              `${item.api}`,
              'No aplica la formula',
            );

            resultObject2[`${item.api}`] = {
              ...valueFormula,
            };

            break;
          case 'mifflinjoer':
            valueFormula = await this.EquationsServices.mifflinjoer(
              kg,
              cm,
              edad,
              sexo,
              `${item.api}`,
              'No aplica la formula',
            );

            resultObject2[`${item.api}`] = {
              ...valueFormula,
            };

            break;
          case 'faooms':
            valueFormula = await this.EquationsServices.faooms(
              kg,
              cm,
              edad,
              sexo,
              `${item.api}`,
              'No aplica la formula',
            );

            resultObject2[`${item.api}`] = {
              ...valueFormula,
            };

            break;
          case 'valencia':
            valueFormula = await this.EquationsServices.valencia(
              kg,
              cm,
              edad,
              sexo,
              `${item.api}`,
              'No aplica la formula',
            );

            resultObject2[`${item.api}`] = {
              ...valueFormula,
            };

            break;
          case 'schofield':
            valueFormula = await this.EquationsServices.schofield(
              kg,
              cm,
              edad,
              sexo,
              `${item.api}`,
              'No aplica la formula',
            );

            resultObject2[`${item.api}`] = {
              ...valueFormula,
            };
            /*   resultObjectNested[`${item.api}`] = {
              name: `${item.api}`,
              data: valueFormula[0],
              exception: valueFormula[1]
                ? `No aplica la formula a personas de esta edad  -> ${edad}`
                : 'No exceptions',
              bmr: `${valueFormula[0]} kcal/day`,
            };*/

            break;
          default:
            break;
        }
      });
      // resultObject['results2'] = await resultObjectNested;
      resultObject['results'] = await resultObject2;
      this.resultAllEquations.push(resultObject);

      res.status(200).json({
        message: 'Records created',
        result: this.resultAllEquations,
      });
    } catch (error) {
      next(error);
    }
  }

  async allequations(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;

    try {
      const resultObject = {
        message: 'Equation found',
        type: 'BMR Equations',
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
      };

      let harrisbenedict = this.EquationsServices.harrisbenedict(
        kg,
        cm,
        edad,
        sexo,
      );
      let mifflinjoer = this.EquationsServices.mifflinjoer(kg, cm, edad, sexo);
      let faooms = this.EquationsServices.faooms(kg, cm, edad, sexo);
      let valencia = this.EquationsServices.valencia(kg, cm, edad, sexo);
      let schofield = this.EquationsServices.schofield(kg, cm, edad, sexo);

      resultObject['harrisbenedict'] = {
        data: harrisbenedict[0],
        exception: harrisbenedict[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No exceptions',
        bmr: `${harrisbenedict[0]} kcal/day`,
      };

      resultObject['mifflinjoer'] = {
        data: mifflinjoer[0],
        exception: mifflinjoer[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No exceptions',
        bmr: `${mifflinjoer[0]} kcal/day`,
      };

      resultObject['faooms'] = {
        data: faooms[0],
        exception: faooms[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No exceptions',
        bmr: `${faooms[0]} kcal/day`,
      };

      resultObject['valencia'] = {
        data: valencia[0],
        exception: valencia[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No exceptions',
        bmr: `${valencia[0]} kcal/day`,
      };

      resultObject['schofield'] = {
        data: schofield[0],
        exception: schofield[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No exceptions',
        bmr: `${schofield[0]} kcal/day`,
      };

      this.resultAllEquations.push(resultObject);
      res.status(200).json({
        message: 'Records created',
      });
    } catch (error) {
      next(error);
    }
  }

  async allequationsgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultAllEquations[this.resultAllEquations.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  async harrisbenedict(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    const resultObject = {
      message: 'Equation found',
      type: 'BMR Equations',
      datos_iniciales: {
        peso: `${kg}`,
        estaturacm: `${cm}`,
        edad: `${edad}`,
        sexo: `${sexo}`,
      },
    };

    let resultObject2 = {};
    try {
      const resultObjectValue = await this.EquationsServices.harrisbenedict(
        kg,
        cm,
        edad,
        sexo,
        `harrisbenedict`,
        'No aplica la formula',
      );
      resultObject2[`harrisbenedict`] = {
        ...resultObjectValue,
      };
      resultObject['results'] = await resultObject2;
      this.resultArrayHarrisB.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  async harrisbenedictGet(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayHarrisB[this.resultArrayHarrisB.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  async harrisbenedictgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayHarrisB,
      });
    } catch (error) {
      next(error);
    }
  }

  async mifflinjoer(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;

    const resultObject = {
      message: 'Equation found',
      type: 'BMR Equations',
      datos_iniciales: {
        peso: `${kg}`,
        estaturacm: `${cm}`,
        edad: `${edad}`,
        sexo: `${sexo}`,
      },
    };

    let resultObject2 = {};
    try {
      const resultObjectValue = await this.EquationsServices.mifflinjoer(
        kg,
        cm,
        edad,
        sexo,
        `mifflinjoer`,
        'No aplica la formula',
      );
      resultObject2[`mifflinjoer`] = {
        ...resultObjectValue,
      };
      resultObject['results'] = await resultObject2;
      this.resultArrayMifflinJ.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  mifflinjoerGet(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayMifflinJ[this.resultArrayMifflinJ.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  mifflinjoergetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayMifflinJ,
      });
    } catch (error) {
      next(error);
    }
  }

  async faooms(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;

    const resultObject = {
      message: 'Equation found',
      type: 'BMR Equations',
      datos_iniciales: {
        peso: `${kg}`,
        estaturacm: `${cm}`,
        edad: `${edad}`,
        sexo: `${sexo}`,
      },
    };

    let resultObject2 = {};

    try {
      const resultObjectValue = await this.EquationsServices.faooms(
        kg,
        cm,
        edad,
        sexo,
        `faooms`,
        'No aplica la formula',
      );

      resultObject2[`faooms`] = {
        ...resultObjectValue,
      };
      resultObject['results'] = await resultObject2;

      this.resultArrayFaoO.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  faoomsGet(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayFaoO[this.resultArrayFaoO.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  faoomsgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayFaoO,
      });
    } catch (error) {
      next(error);
    }
  }

  async valencia(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    const resultObject = {
      message: 'Equation found',
      type: 'BMR Equations',
      datos_iniciales: {
        peso: `${kg}`,
        estaturacm: `${cm}`,
        edad: `${edad}`,
        sexo: `${sexo}`,
      },
    };

    let resultObject2 = {};

    try {
      const resultObjectValue = await this.EquationsServices.valencia(
        kg,
        cm,
        edad,
        sexo,
        `valencia`,
        'No aplica la formula',
      );

      resultObject2[`valencia`] = {
        ...resultObjectValue,
      };
      resultObject['results'] = await resultObject2;
      this.resultArrayValencia.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  valenciaGet(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayValencia[this.resultArrayValencia.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  valenciagetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayValencia,
      });
    } catch (error) {
      next(error);
    }
  }

  async schofield(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    const resultObject = {
      message: 'Equation found',
      type: 'BMR Equations',
      datos_iniciales: {
        peso: `${kg}`,
        estaturacm: `${cm}`,
        edad: `${edad}`,
        sexo: `${sexo}`,
      },
    };

    let resultObject2 = {};

    try {
      const resultObjectValue = await this.EquationsServices.schofield(
        kg,
        cm,
        edad,
        sexo,
        `schofield`,
        'No aplica la formula',
      );

      resultObject2[`schofield`] = {
        ...resultObjectValue,
      };
      resultObject['results'] = await resultObject2;
      // made this controller thinner and sent this object to the service object
      /*    const resultObject = {
        message: 'Equation found',
        type: 'schofield',
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        results: {
          schofield: {
            data: result[0],
            exception: result[1]
              ? 'No aplica la formula a esta edad'
              : 'No exceptions',
            bmr: `${result[0]} kcal/day`,
          },
        },
      };*/
      this.resultArraySchofield.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  schofieldGet(req, res, next) {
    try {
      res.status(200).json({
        results:
          this.resultArraySchofield[this.resultArraySchofield.length - 1],
      });
    } catch (error) {
      next(error);
    }
  }

  schofieldgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArraySchofield,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EquationsController;
