class EquationsController {
  constructor(EquationsServices) {
    this.EquationsServices = EquationsServices;
    this.resultArray = [];
  }

  /**
 *  curl -X POST http://localhost:3000/api/v1/equations/harrisbenedict -H "Content-Type: application/json" -d '{"kg":100,"cm":180,"edad":34,"sexo":1}'

 */

  harrisbenedict(req, res, next) {
    const { kg, cm, edad, sexo } = req.body;
    try {
      const result = this.EquationsServices.harrisbenedict(kg, cm, edad, sexo);
      // const result = 'hola';docker
      const resultObject = {
        message: 'Equation found',
        type: 'harrisbenedict',
        data: result,
        bmr: `${result} kcal/day`,
      };
      this.resultArray.push(resultObject);
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
        results: this.resultArray,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EquationsController;
