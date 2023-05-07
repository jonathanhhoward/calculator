import { FloatingPoint } from "app/models/floating-point";
import { Operator } from "app/models/types";

export interface State {
  expression: string;
  input: FloatingPoint | Operator | Error;
}
