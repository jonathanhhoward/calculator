import { createAction, props } from "@ngrx/store";

interface Payload {
  symbol: string;
}

export const testAction = createAction("[app] test action", props<Payload>());

export const clear = createAction("[app] clear");

export const deLete = createAction("[app] delete");

export const digitInput = createAction("[app] digit input", props<Payload>());

export const digitZeroInput = createAction(
  "[app] digit zero input",
  props<Payload>()
);

export const digitOperator = createAction(
  "[app] digit operator",
  props<Payload>()
);

export const digitNegative = createAction(
  "[app] digit negative",
  props<Payload>()
);

export const digitResult = createAction("[app] digit result", props<Payload>());

export const operatorInput = createAction(
  "[app] operator input",
  props<Payload>()
);

export const operatorOperator = createAction(
  "[app] operator operator",
  props<Payload>()
);

export const operatorNegateOperator = createAction(
  "[app] operator negate operator",
  props<Payload>()
);

export const operatorNegative = createAction(
  "[app] operator negative",
  props<Payload>()
);

export const operatorResult = createAction(
  "[app] operator result",
  props<Payload>()
);
