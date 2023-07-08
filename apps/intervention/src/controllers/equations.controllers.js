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
 *  curl -X POST http://localhost:3000/api/v1/equations/harrisbenedict -H "Content-Type: application/json" -d '{"kg":100,"cm":180,"edad":34,"sexo":1}'

 */

  allequations(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const resultObject = {
        message: 'Equation found',
        type: 'All BMR Equations',
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
          : 'No existe una exception',
        bmr: `${harrisbenedict[0]} kcal/day`,
      };

      resultObject['mifflinjoer'] = {
        data: mifflinjoer[0],
        exception: mifflinjoer[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${mifflinjoer[0]} kcal/day`,
      };

      resultObject['faooms'] = {
        data: faooms[0],
        exception: faooms[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${faooms[0]} kcal/day`,
      };

      resultObject['valencia'] = {
        data: valencia[0],
        exception: valencia[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${valencia[0]} kcal/day`,
      };

      resultObject['schofield'] = {
        data: schofield[0],
        exception: schofield[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
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

  allequationsgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultAllEquations,
      });
    } catch (error) {
      next(error);
    }
  }

  harrisbenedict(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.harrisbenedict(kg, cm, edad, sexo);
      // const result = 'hola';docker

      const resultObject = {
        message: 'Equation found',
        type: 'harrisbenedict',
        data: result[0],
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        exception: result[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${result[0]} kcal/day`,
      };
      this.resultArrayHarrisB.push(resultObject);
      res.status(200).json({
        message: 'Record created',
      });
    } catch (error) {
      next(error);
    }
  }

  harrisbenedictgetAll(req, res, next) {
    try {
      res.status(200).json({
        results: this.resultArrayHarrisB,
      });
    } catch (error) {
      next(error);
    }
  }

  mifflinjoer(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.mifflinjoer(kg, cm, edad, sexo);
      // const result = 'hola';docker
      const resultObject = {
        message: 'Equation found',
        type: 'mifflinjoer',
        data: result[0],
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        exception: result[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${result[0]} kcal/day`,
      };
      this.resultArrayMifflinJ.push(resultObject);
      res.status(200).json({
        message: 'Record created',
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

  faooms(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.faooms(kg, cm, edad, sexo);
      // const result = 'hola';docker
      const resultObject = {
        message: 'Equation found',
        type: 'faooms',
        data: result,
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        bmr: `${result} kcal/day`,
      };
      this.resultArrayFaoO.push(resultObject);
      res.status(200).json({
        message: 'Record created',
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

  valencia(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.valencia(kg, cm, edad, sexo);
      // const result = 'hola';docker
      const resultObject = {
        message: 'Equation found',
        type: 'valencia',
        data: result[0],
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        exception: result[1]
          ? 'No aplica la formula a personas menores de edad'
          : 'No existe una exception',
        bmr: `${result[0]} kcal/day`,
      };
      this.resultArrayValencia.push(resultObject);
      res.status(200).json({
        message: 'Record created',
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

  schofield(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.schofield(kg, cm, edad, sexo);
      // const result = 'hola';docker
      const resultObject = {
        message: 'Equation found',
        type: 'schofield',
        data: result[0],
        datos_iniciales: {
          peso: `${kg}`,
          estaturacm: `${cm}`,
          edad: `${edad}`,
          sexo: `${sexo}`,
        },
        exception: result[1]
          ? 'No aplica la formula a esta edad'
          : 'No existe una exception',
        bmr: `${result[0]} kcal/day`,
      };
      this.resultArraySchofield.push(resultObject);
      res.status(200).json({
        message: 'Record created',
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
