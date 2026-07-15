import { FloatingPoint } from "../models/floating-point";
import { Operator } from "../models/types";

export interface State {
  expression: string;
  input: FloatingPoint | Operator | Error;
}
