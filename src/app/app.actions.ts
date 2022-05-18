import { createAction, props } from "@ngrx/store";

export const testAction = createAction(
  "[app] test action",
  props<{ symbol: string }>()
);

export const clear = createAction("[app] clear");

export const deLete = createAction("[app] delete");
