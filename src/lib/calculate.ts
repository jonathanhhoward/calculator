class CalculatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

let tokens: string[];

export function calculate(expressionString: string): string {
  tokens = parseTokens(expressionString);

  let result: string;

  try {
    result = setPrecision10(expression());
  } catch (e: unknown) {
    if (e instanceof CalculatorError) {
      result = e.message;
    } else {
      throw e;
    }
  }

  return result;
}

function parseTokens(tokenString: string): string[] {
  const mantissa = "-?\\d+(?:\\.\\d*)?";
  const exponent = "e[-+]\\d+";
  const number = `${mantissa}(?:${exponent})?`;
  const operator = "[+−×÷=]";
  const numberOrOperator = new RegExp(`${number}|${operator}`, "g");

  return tokenString.match(numberOrOperator) ?? [];
}

function setPrecision10(n: number): string {
  if (Number.isNaN(n)) return NaN.toString();

  if (n === 0) return "0";

  const absNumber = Math.abs(n);

  if (1e-6 <= absNumber && absNumber < 1) {
    const round9 = Math.round(n * 1e9) / 1e9;
    return round9.toString();
  }

  const precision10 = Number(n).toPrecision(10);

  return absNumber < 1e-6 || 1e10 <= absNumber
    ? Number(precision10).toExponential()
    : Number(precision10).toString();
}

/**
 * The following code is taken from:
 *
 *     Stroustrup, Bjarne. "Programming: Principles and Practice Using
 *     C++." 2nd ed., Addison-Wesley Professional, 2014.
 *
 * It was translated into Javascript, modified to use an Array<Token>
 * instead of a Token_stream, and removed unused features.
 */

function expression(): number {
  let left = term();
  let token = tokens.shift();

  while (true) {
    switch (token) {
      case "+":
        left += term();
        token = tokens.shift();
        break;
      case "−":
        left -= term();
        token = tokens.shift();
        break;
      case "=":
        return left;
      default:
        throw new CalculatorError("expression error");
    }
  }
}

function term(): number {
  let left = primary();
  let token = tokens.shift();

  while (true) {
    switch (token) {
      case "×":
        left *= primary();
        token = tokens.shift();
        break;
      case "÷":
        const d = primary();
        if (d === 0) {
          throw new CalculatorError("divide by zero");
        }
        left /= d;
        token = tokens.shift();
        break;
      default:
        if (token) tokens.unshift(token);
        return left;
    }
  }
}

function primary(): number {
  const token = tokens.shift();

  const result = Number(token);
  if (Number.isNaN(result)) {
    throw new CalculatorError("primary expected");
  }

  return result;
}
