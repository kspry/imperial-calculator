// https://mathjs.org/docs/expressions/parsing.html
// https://wmdb-public-facing.s3-us-west-2.amazonaws.com/inches/demo.html

/* global Inches */
import { evaluate } from 'mathjs';

class CalculatorService {
  constructor(options) {
    this.options = Object.assign(
      {
        // fraction accuracy of the formatted strings returned by the .str() method
        inc: 32,
        // max length of a dimension that can be output by the .str() method without forcing inch values to feet values
        max_inches: 1200
      },
      options || {}
    );
  }

  calculate(expr) {
    let newExpr = expr.toString();

    // replace traditional operator symbols
    newExpr = newExpr.replace(/÷/g, `/`);
    newExpr = newExpr.replace(/×/g, `*`);

    // convert feet values to inches
    let feetPattern = /((?:\d+'))/g;
    let matches = [...expr.matchAll(feetPattern)];
    for (var match of matches) {
      let inches = new Inches(
        match[0],
        this.options.inc,
        this.options.max_inches
      ).str();
      // replace original feet values in expr with inches
      newExpr = newExpr.replace(match[0], inches);
    }

    // console.log(newExpr);

    // insert addition operator between space-separated numbers
    let spaceSeparatedNumbersPattern = /((\d+)"\s(\d+))/g;
    newExpr = newExpr.replace(spaceSeparatedNumbersPattern, '$2+$3');

    // console.log(newExpr);

    let mixedNumberPattern = /((\d+)\s(\d+)\/(\d+))/g;
    newExpr = newExpr.replace(mixedNumberPattern, '($2+$3/$4)');

    // console.log(newExpr);

    let fractionPattern = /(\d+)\/(\d+)/g;
    newExpr = newExpr.replace(fractionPattern, '($1/$2)');

    // console.log(newExpr);

    // remove double quotes to evaluate expression
    newExpr = newExpr.replace(/"/g, '');

    // console.log(newExpr);

    let result = evaluate(newExpr);

    let inches = new Inches(result, this.options.inc, this.options.max_inches);

    // console.log({
    //   expr,
    //   newExpr,
    //   result,
    //   inches: inches.str()
    // });

    return inches;
  }
}

export default CalculatorService;
