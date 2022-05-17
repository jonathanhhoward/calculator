import { createAction, props } from "@ngrx/store";

export const testAction = createAction(
  "[App] Test Action",
  props<{ symbol: string }>()
);
