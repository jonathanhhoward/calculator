import { createAction, props } from "@ngrx/store";

export interface Payload {
  symbol: string;
}

export const getResult = createAction("[app] get result");

export const clearClick = createAction("[app] clear click");

export const deleteClick = createAction("[app] delete click");

export const digitClick = createAction("[app] digit click", props<Payload>());

export const operatorClick = createAction(
  "[app] operator clicked",
  props<Payload>()
);

export const equalsClick = createAction("[app] equals click");
