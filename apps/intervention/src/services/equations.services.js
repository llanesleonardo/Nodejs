class EquationsServices {
  constructor() {}

  harrisbenedict(kg, cm, edad, sexo) {
    let stepfinal = 0;
    if (sexo === 1) {
      let step1 = 13.75 * kg;
      let step2 = 5.003 * cm;
      let step3 = 6.75 * edad;
      stepfinal = 66.5 + step1 + step2 - step3;
    } else {
      let step1 = 9.563 * kg;
      let step2 = 1.85 * cm;
      let step3 = 4.676 * edad;
      stepfinal = 655.1 + step1 + step2 - step3;
    }

    return stepfinal;
  }
}

module.exports = EquationsServices;
