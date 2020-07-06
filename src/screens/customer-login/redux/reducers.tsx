import { handleActions } from "redux-actions";
import { setAccountInfoCustomerAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setAccountInfoCustomerAction.toString()]: (state, action) => ({
      ...state,
      customerInfo: action.payload.data
    })
  },
  {
    customerInfo: null
  }
);
