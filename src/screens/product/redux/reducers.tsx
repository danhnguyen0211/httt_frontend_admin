import { handleActions } from "redux-actions";
import { setItemAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setItemAction.toString()]: (state, action) => ({
      ...state,
      dta: action.payload.data
    })
  },
  {
    data: {}
  }
);
