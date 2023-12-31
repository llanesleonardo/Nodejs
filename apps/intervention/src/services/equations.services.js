class EquationsServices {
  constructor() {}

  async harrisbenedict(kg, cm, edad, sexo) {
    let stepfinal = 0;
    let exception = 0;
    if (edad >= 18) {
      if (sexo == 1) {
        let _step1 = 13.75 * kg;
        let _step2 = 5.003 * cm;
        let _step3 = 6.79 * edad;
        stepfinal = 66.5 + _step1 + _step2 - _step3;
      }

      if (sexo == 0) {
        let _step1 = 9.56 * kg;
        let _step2 = 1.85 * cm;
        let _step3 = 4.68 * edad;
        stepfinal = 655.1 + _step1 + _step2 - _step3;
      }
    } else {
      stepfinal = 0;
      exception = 1;
    }

    const finalObject = await this.createFinalObject(
      [stepfinal, exception],
      kg,
      cm,
      edad,
      sexo,
      'harrisbenedict',
      'No aplica la formula a personas menores de edad',
    );
    // return [stepfinal, exception];
    return finalObject;
  }

  async mifflinjoer(kg, cm, edad, sexo) {
    let stepfinal = 0;
    let exception;
    if (edad >= 18) {
      if (sexo == 1) {
        let _step1 = 9.99 * kg;
        let _step2 = 6.25 * cm;
        let _step3 = 4.92 * edad;
        stepfinal = _step1 + _step2 - _step3 + 5;
      }
      if (sexo == 0) {
        let _step1 = 9.99 * kg;
        let _step2 = 6.25 * cm;
        let _step3 = 4.92 * edad;
        stepfinal = _step1 + _step2 - _step3 - 161;
      }
    } else {
      stepfinal = 0;
      exception = 1;
    }

    const finalObject = await this.createFinalObject(
      [stepfinal, exception],
      kg,
      cm,
      edad,
      sexo,
      'mifflinjoer',
      'No aplica la formula a personas menores de edad',
    );
    // return [stepfinal, exception];
    return finalObject;
  }

  async faooms(kg, cm, edad, sexo) {
    let stepfinal = 0;
    let _varsArray = [];
    let _step2 = 0;
    _varsArray = await this.faoomsRangesElection(edad, sexo);
    let step1 = _varsArray[0] * kg;
    if (edad <= 3) {
      _step2 = step1 - _varsArray[1];
    } else {
      _step2 = step1 + _varsArray[1];
    }

    stepfinal = _step2;

    const finalObject = await this.createFinalObject(
      [stepfinal, 0],
      kg,
      cm,
      edad,
      sexo,
      'faooms',
      'No aplica la formula a personas menores de edad',
    );
    // return [stepfinal, 0];
    return finalObject;
  }

  async faoomsRangesElection(edad, sexo) {
    let _pesox = 0;
    let _factorx = 0;
    switch (true) {
      case edad <= 3: {
        if (sexo === 0) {
          _pesox = 61.0;
          _factorx = 51;
        } else {
          _pesox = 60.9;
          _factorx = 54;
        }
        break;
      }
      case edad > 3 && edad <= 10: {
        if (sexo === 0) {
          _pesox = 22.5;
          _factorx = 499;
        } else {
          _pesox = 22.7;
          _factorx = 495;
        }
        break;
      }
      case edad > 10 && edad <= 18: {
        if (sexo === 0) {
          _pesox = 12.2;
          _factorx = 746;
        } else {
          _pesox = 17.5;
          _factorx = 651;
        }
        break;
      }
      case edad > 18 && edad <= 30: {
        if (sexo === 0) {
          _pesox = 14.7;
          _factorx = 496;
        } else {
          _pesox = 15.3;
          _factorx = 679;
        }
        break;
      }
      case edad > 30 && edad <= 60: {
        if (sexo === 0) {
          _pesox = 8.7;
          _factorx = 829;
        } else {
          _pesox = 11.6;
          _factorx = 879;
        }
        break;
      }
      case edad > 60: {
        if (sexo === 0) {
          _pesox = 10.5;
          _factorx = 596;
        } else {
          _pesox = 13.5;
          _factorx = 487;
        }
        break;
      }
      default: {
        _pesox = 0;
        _factorx = 0;
        break;
      }
    }
    return [_pesox, _factorx];
  }

  async valencia(kg, cm, edad, sexo) {
    let stepfinal;
    let exception = 0;
    let _varsArray = [];
    if (edad < 18) {
      stepfinal = 0;
      exception = 1;
    } else {
      _varsArray = await this.valenciaRangesElection(edad, sexo);
      let _step1 = _varsArray[0] * kg;
      let _step2 = _step1 + _varsArray[1];
      stepfinal = _step2;
    }

    const finalObject = await this.createFinalObject(
      [stepfinal, exception],
      kg,
      cm,
      edad,
      sexo,
      'valencia',
      'No aplica la formula a personas menores de edad',
    );
    //return [stepfinal, exception];
    return finalObject;
  }

  async valenciaRangesElection(edad, sexo) {
    let _pesox = 0;
    let _factorx = 0;
    switch (true) {
      case edad >= 18 && edad <= 30:
        if (sexo === 0) {
          _pesox = 11.02;
          _factorx = 679;
        } else {
          _pesox = 13.37;
          _factorx = 747;
        }
        break;

      case edad > 30 && edad <= 60:
        if (sexo === 0) {
          _pesox = 10.92;
          _factorx = 677;
        } else {
          _pesox = 13.08;
          _factorx = 693;
        }
        break;

      case edad > 60:
        if (sexo === 0) {
          _pesox = 10.98;
          _factorx = 520;
        } else {
          _pesox = 14.21;
          _factorx = 429;
        }
        break;

      default:
        _pesox = 0;
        _factorx = 0;
        break;
    }

    return [_pesox, _factorx];
  }

  async schofield(kg, cm, edad, sexo) {
    let stepfinal;
    let exception = 0;
    let _varsArray = [];
    if (edad >= 3 && edad <= 18) {
      _varsArray = await this.schofieldRangesElection(edad, sexo, kg, cm);
      let _step1 = _varsArray[0] * kg;
      let _step2 = _varsArray[2] * cm;
      let _step3 = _step1 + _step2 + _varsArray[1];
      stepfinal = _step3;
    } else {
      stepfinal = 0;
      exception = 1;
    }

    const finalObject = await this.createFinalObject(
      [stepfinal, exception],
      kg,
      cm,
      edad,
      sexo,
      'schofield',
      'No aplica la formula a personas menores de edad',
    );
    //return [stepfinal, exception];
    return finalObject;
  }

  async schofieldRangesElection(edad, sexo, kg, cm) {
    let _pesox = 0;
    let _estaturax = 0;
    let _factorx = 0;
    switch (true) {
      case edad >= 3 && edad <= 10:
        if (sexo === 0) {
          _pesox = 16.97;
          _estaturax = 1.618;
          _factorx = 371.2;
        } else {
          _pesox = 19.6;
          _estaturax = 1.303;
          _factorx = 414.9;
        }
        break;

      case edad > 10 && edad <= 18:
        if (sexo === 0) {
          _pesox = 8.365;
          _estaturax = 4.65;
          _factorx = 200;
        } else {
          _pesox = 16.25;
          _estaturax = 1.372;
          _factorx = 515.5;
        }
        break;

      default:
        _pesox = 0;
        _factorx = 0;
        _estaturax = 0;
        break;
    }

    return [_pesox, _factorx, _estaturax];
  }

  async createFinalObject(
    resultsFormula,
    kg,
    cm,
    edad,
    sexo,
    nameformula,
    exception,
  ) {
    const finalObject = {
      name: `${nameformula}`,
      message: 'Equation found',
      type: `${nameformula}`,
      datos_iniciales: {
        peso: kg,
        estaturacm: cm,
        edad: edad,
        sexo: sexo,
      },
      results: {
        data: resultsFormula[0],
        exception: resultsFormula[1] ? `${exception}` : 'No exceptions',
        bmr: `${resultsFormula[0]} kcal/day`,
      },
    };

    return finalObject;
  }
}

module.exports = EquationsServices;
